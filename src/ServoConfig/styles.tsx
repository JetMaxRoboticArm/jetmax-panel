import common_styles from '../Common'

const styles = {
    button: common_styles.button,
    panel: {
        display: "flex",
        margin: "8px 10px 0 10px",
        marginTop: "10px",
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
        flexDirection: "column" as const,
        flexWrap: "nowrap" as const,
        textAlign: "center" as const,
        alignItems: "center" as const
    },
}

export default styles