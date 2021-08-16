const button_hover = {
    borderColor: '#DC3713',
    backgroundColor: '#E7611F',
}

const font_family_bold = "SourceHanSansSC-bold, sans-serif"
const font_family_regular = "SourceHanSansSC-regular sans-serif"

const styles = {
    font_bold: font_family_bold,
    font_regular: font_family_regular,
    button_hover: button_hover,
    control_panel: {
        display: 'flex',
        flexShrink: 0,
        flexDirection: 'column' as const,
        width: '494px',
        lineHeight: '20px',
        margin: '8px 10px 0 10px',
        borderRadius: '9px',
        backgroundColor: 'rgba(218, 218, 218, 100)',
        textAlign: 'center' as const,
        alignItems: 'center',
    },

    button: {
        color: 'rgba(245, 246, 248, 100)',
        backgroundColor: 'rgba(255, 165, 0, 100)',
        borderColor: '#EF8B15',
        '&:disabled':{
            backgroundColor: 'rgba(245, 155, 0, 100)',
        },
        lineHeight: '20px',
        borderRadius: '5px',
        width: '87px',
        height: '33px',
        textTransform: 'none' as const,
        textAlign: "center" as const,
        fontSize: '16px',
        fontWeight: 'bold' as const,
        fontFamily: font_family_bold,
        '&:hover': button_hover,
    },

    title: {
        display: 'flex',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        width: "150px",
        height: "30px",
        margin: "4px auto",
        color: "rgba(0, 0, 0, 1)",
        flexShrink: 0,
        fontSize: "20px",
        fontWeight: "bold" as const,
        textAlign: "center" as const,
        fontFamily: font_family_bold,
    }
}


export default styles;