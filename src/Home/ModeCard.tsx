import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import common from '../Common'

interface Props {
    label: string;
    image?: string;
    onClick?: (event: any) => void;
}

const useStyles = makeStyles({
        root: {},
        card: {
            padding: '0 0 0 0',
            display: 'block',
            width: '290px',
            height: '290px',
            margin: '0 60px 0 60px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.6)',
            '&:hover': {
                opacity: 0.85,
                boxShadow: '3px 7px 8px 3px rgba(0, 0, 0, 0.7)',
            }
        },
        card_img: {
            width: '100%',
            borderRadius: '10px',
        },
        label: {
            font: common.font_bold,
            fontWeight: 'bold',
            fontSize: '18px',
        }

    }
)


ModeCard.defaultProps = {
    label: '',
    onClick: () => {
    }
}

export default function ModeCard(props: Props) {
    const classes = useStyles(props)
    const {image, label, onClick, ...others} = props

    return (
        <div className={classes.root} {...others}>
            <Button className={classes.card} onClick={onClick}>
                {image ? (<img src={image} alt={label} className={classes.card_img}/>) : ('')}
            </Button>
            <p className={classes.label}> {label} </p>
        </div>
    )
}
