import ROSLIB from "roslib";

interface ros_callback {
    (response: any): void;
}

interface JetMaxStatus {
    position: number[],
    serial_servos: number[],
    pwm_servos: number[],
    sucker: boolean,
}

class JetMax {
    url: string
    host_name: string
    status: JetMaxStatus
    ros_client: ROSLIB.Ros
    connection: boolean
    actionset_list: string[]

    protected go_home_srv: ROSLIB.Service
    protected get_actionset_list_srv: ROSLIB.Service
    protected remove_actionset_srv: ROSLIB.Service
    protected save_actionset_srv: ROSLIB.Service
    protected read_actionset_srv: ROSLIB.Service
    protected set_position_relatively_publisher: ROSLIB.Topic
    protected set_position_ws_publisher: ROSLIB.Topic
    protected set_sucker_publisher: ROSLIB.Topic
    protected set_pwm_servo1_publisher: ROSLIB.Topic
    protected set_pwm_servo2_publisher: ROSLIB.Topic
    protected set_serial_servo1_ws_publisher: ROSLIB.Topic
    protected set_serial_servo2_ws_publisher: ROSLIB.Topic
    protected set_serial_servo3_ws_publisher: ROSLIB.Topic
    protected status_listener: ROSLIB.Topic
    protected run_online_action: ROSLIB.ActionClient
    protected run_online_cancel: ROSLIB.Topic


    constructor() {
        this.ros_client = new ROSLIB.Ros({})
        this.connection = false
        this.actionset_list = []
        this.status = {
            position: [0, 0, 0],
            serial_servos: [500, 500, 500],
            pwm_servos: [90, 90],
            sucker: false,
        }
        this.url = ""
        this.host_name = ""
        this.go_home_srv = new ROSLIB.Service({
            ros: this.ros_client,
            name: '/jetmax/go_home',
            serviceType: '/std_srvs/Empty'
        })
        this.get_actionset_list_srv = new ROSLIB.Service({
            ros: this.ros_client,
            name: '/jetmax/actionset/get_actionset_list',
            serviceType: '/jetmax_control/ActionSetList'
        })
        this.remove_actionset_srv = new ROSLIB.Service({
            ros: this.ros_client,
            name: '/jetmax/actionset/remove_actionset',
            serviceType: '/jetmax_control/ActionSetFileOp'
        })
        this.save_actionset_srv = new ROSLIB.Service({
            ros: this.ros_client,
            name: '/jetmax/actionset/save_actionset',
            serviceType: '/jetmax_control/ActionSetFileOp'
        })
        this.read_actionset_srv = new ROSLIB.Service({
            ros: this.ros_client,
            name: '/jetmax/actionset/read_actionset',
            serviceType: '/jetmax_control/ActionSetFileOp'
        })
        this.set_position_relatively_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/relative_command',
            messageType: 'jetmax/SetJetMax'
        })
        this.set_position_ws_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/speed_command',
            messageType: 'jetmax/SetJetMax'
        })
        this.set_sucker_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/end_effector/sucker/command',
            messageType: 'std_msgs/Bool'
        })
        this.set_pwm_servo1_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/end_effector/servo1/command',
            messageType: 'jetmax/SetServo'
        })
        this.set_pwm_servo2_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/end_effector/servo2/command',
            messageType: 'jetmax/SetServo'
        })
        this.set_serial_servo1_ws_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/servo1/speed_command',
            messageType: 'jetmax/SetServo'
        })
        this.set_serial_servo2_ws_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/servo2/speed_command',
            messageType: 'jetmax/SetServo'
        })
        this.set_serial_servo3_ws_publisher = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/servo3/speed_command',
            messageType: 'jetmax/SetServo'
        })
        this.status_listener = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/status',
            messageType: 'jetmax_control/JetMax',
        })
        this.status_listener.subscribe((msg: any) => {
            let {x, y, z, servo1, servo2, servo3, pwm1, pwm2, sucker} = msg
            this.status = {
                position: [x, y, z],
                serial_servos: [servo1, servo2, servo3],
                pwm_servos: [pwm1, pwm2],
                sucker: sucker
            }
        })
        this.run_online_action = new ROSLIB.ActionClient({
            ros: this.ros_client,
            serverName: '/jetmax/actionset_online',
            actionName: 'jetmax/ActionSetRaw',
            timeout: 10
        })
        this.run_online_cancel = new ROSLIB.Topic({
            ros: this.ros_client,
            name: '/jetmax/actionset_online/cancel',
            messageType: 'actionlib_msgs/GoalID',
        })
    }

    set_url(url: string) {
        this.url = url
        this.host_name = url.replace(/\/+/g, '').split(':')[1]
    }

    go_home(callback: ros_callback) {
        this.go_home_srv.callService(new ROSLIB.ServiceRequest(), callback)
    }

    get_actionset_list(callback: ros_callback) {
        this.get_actionset_list_srv.callService(new ROSLIB.ServiceRequest(), (msg: any) => {
            this.actionset_list = msg.action_sets
            callback(this.actionset_list)
        })
    }

    remove_actionset(file_name: string, callback: ros_callback) {
        this.remove_actionset_srv.callService(new ROSLIB.ServiceRequest({
            file_name: file_name,
            data: ''
        }), (msg: any) => {
            this.get_actionset_list((msg1: any) => {
                callback(msg1)
            })
        })
    }

    save_actionset(file_name: string, data: string, callback: ros_callback) {
        this.save_actionset_srv.callService(new ROSLIB.ServiceRequest({
            file_name: file_name,
            data: data
        }), (msg: any) => {
            this.get_actionset_list((msg1: any) => {
                callback(msg1)
            })
        })
    }

    read_actionset(file_name: string, callback: ros_callback) {
        this.read_actionset_srv.callService(new ROSLIB.ServiceRequest({
            file_name: file_name,
            data: ''
        }), callback)
    }

    set_position_relatively(axis: string, value: number, duration: number = 0.05) {
        let msg = new ROSLIB.Message({
            x: axis === 'x' ? value : 0,
            y: axis === 'y' ? value : 0,
            z: axis === 'z' ? value : 0,
            duration: duration,
        })
        this.set_position_relatively_publisher.publish(msg)
    }

    set_position_with_speed(position: number[], speed: number = 0.05) {
        let msg = new ROSLIB.Message({
            x: position[0],
            y: position[1],
            z: position[2],
            duration: speed,
        })
        this.set_position_ws_publisher.publish(msg)
    }

    set_sucker(new_state: boolean) {
        let msg = new ROSLIB.Message({
            data: new_state,
        })
        this.set_sucker_publisher.publish(msg)
    }

    set_pwm_servo(servo_id: number, angle: number, duration: number) {
        let msg = new ROSLIB.Message({
            data: angle,
            duration: duration
        })
        switch (servo_id) {
            case 1: {
                this.set_pwm_servo1_publisher.publish(msg)
                break;
            }
            case 2: {
                this.set_pwm_servo2_publisher.publish(msg)
                break;
            }
            default: {
                break;
            }

        }
    }

    set_serial_servo_with_speed(servo_id: number, angle: number | number[], speed: number) {
        let msg = new ROSLIB.ServiceRequest({
            data: angle,
            duration: speed,
        })
        switch (servo_id) {
            case 1: {
                this.set_serial_servo1_ws_publisher.publish(msg)
                break;
            }
            case 2: {
                console.log("CC")
                this.set_serial_servo2_ws_publisher.publish(msg)
                break;
            }
            case 3: {
                this.set_serial_servo3_ws_publisher.publish(msg)
                break;
            }
        }
    }


    run_actionset_online(data: string, repeat: number) {
        let goal = new ROSLIB.Goal({
            actionClient: this.run_online_action,
            goalMessage: new ROSLIB.Message({
                data: data,
                repeat: repeat,
            })
        })
        goal.send()
    }

    stop_actionset_online() {
        let msg = new ROSLIB.Message({})
        this.run_online_cancel.publish(msg)
    }
}

const jetmax = new JetMax()
export default jetmax
