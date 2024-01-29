import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

export default function NoProjectView() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <section style={style.noProjectContainer}>
            <Typography variant='h4'>
                No tenés un proyecto todavía!
            </Typography>
            <Typography variant='body1'>
                Para crearlo debes primero crear una idea.
            </Typography>
        </section>
    )
}

const styles = (theme) => {
    return {
        noProjectContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
        },
    }
}