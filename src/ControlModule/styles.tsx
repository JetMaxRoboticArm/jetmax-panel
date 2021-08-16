import common from '../Common';

const label = {
    height: "20px",
    fontSize: "14px",
    textAlign: "left" as const,
    color: "rgba(64, 64, 64, 100)",
    fontFamily: common.font_regular,
}

const styles = {
    panel: {
        display: "flex",
        margin: "12px 10px 0 10px",
        width: "494px",
        flexDirection: "column" as const,
        flexShrink: 0,
        lineHeight: "20px",
        borderRadius: "9px",
        backgroundColor: "rgba(218, 218, 218, 100)",
        textAlign: "center" as const,
        alignItems: "center" as const,
    },
    widget: {
        display: "flex",
        lineHeight: "20px",
        borderRadius: "5px",
        backgroundColor: "rgba(255, 255, 255, 100)",
        flexDirection: "row" as const,
        flexWrap: "nowrap" as const,
        textAlign: "center" as const,
        alignItems: "center" as const
    },

    labelSlot: {
        display: "flex",
        height: "24px",
        lineHeight: "20px",
        borderRadius: "22px",
        backgroundColor: "rgba(162, 162, 162, 100)",
        textAlign: "center" as const,
        alignItems: "center" as const,
        justifyContent: "center" as const,
        margin: "0 10px",
    },
    label: label,
    labelInSlot: {
        ...label,
        display: "inline-block",
        margin: "0 20px",
        lineHeight: "20px",
        color: "rgba(255, 255, 255, 100)",
        textAlign: "center" as const,
    },
    title: common.title,
    button: common.button,
}
export default styles;