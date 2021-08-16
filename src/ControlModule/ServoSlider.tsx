import React from 'react';
import Input from '@material-ui/core/Input';
import StyledSlider from './StyledSlider'

type ServoSliderProps = {
    className?: any;
    step?: number;
    min?: number;
    max?: number;
    value?: number | string;
    label?: string;
    classes?: any;
    input?: boolean;
    onValueChange?: (newValue: number | number[]) => (void);
}

type ServoSliderState = {
    value: number | string | number[];
}
export default class ServoSlider extends React.Component<ServoSliderProps, ServoSliderState> {
    static defaultProps = {
        min: 0,
        max: 1000,
        step: 1,
        value: 500,
        input: true,
        label: 'Slider',
        classes: {}
    }

    constructor(props: ServoSliderProps) {
        super(props);
        this.state = {
            value: props.value || 0
        }
        this.handleBlur = this.handleBlur.bind(this)
        this.handleSliderChange = this.handleSliderChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleSliderChange(event: React.ChangeEvent<{}>, newValue: number | number[]) {
        // console.log(newValue)
        this.setState({value: newValue})
        if (this.props.onValueChange) {
            this.props.onValueChange(newValue)
        }
    }
    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value === '' ? '' : Number(event.target.value)})
        if (this.props.onValueChange) {
            this.props.onValueChange(Number(event.target.value))
        }
    }

    handleBlur(event: any) {
        if (this.state.value < this.props.min!) {
            this.setState({value: this.props.min!})
        } else if (this.state.value > this.props.max!) {
            this.setState({value: this.props.max!})
        }
    }

    input_f() {
        if (this.props.input) {
            return (
                <Input
                    value={this.state.value}
                    margin="dense"
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur}
                    inputProps={{
                        step: this.props.step,
                        min: this.props.min,
                        max: this.props.max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                    style={{display: "flex", lineHeight: '20px', width: '74px', height: '20px'}}
                />
            )
        }
    }

    render() {
        return (
            <div className="ServoSlider"
                 style={{display: "flex", width: '100%', padding: '0 15px 0 15px', alignItems: 'center'}}>
                <label className={this.props.classes.label || {}} style={{
                    display: 'flex',
                    lineHeight: '20px',
                    alignItems: 'center'
                }}>{(this.props.label || 'Slider')}</label>
                <StyledSlider
                    value={typeof this.state.value === 'number' ? this.state.value : 0}
                    min={this.props.min!}
                    max={this.props.max!}
                    step={this.props.step!}
                    onChange={this.handleSliderChange}
                    aria-labelledby="input-slider"
                    style={{margin: '0 24px 0 13px', flexGrow: 1, alignItems: 'center', lineHeight: '20px'}}
                />
                {this.input_f()}
            </div>
        )
    }
}