import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

export default function FinishedView() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
            <div style={style.contentContainer}>
                <Typography variant="h5">
                    Felicitaciones por terminar tu proyecto!
                </Typography>
                <Typography variant="body1">
                    Te pedimos que completes un poco más de información para poder mostrar tu proyecto en la galería.
                </Typography>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <TextField multiline={true} rows={4} label="Descripción del proyecto"/>
                    <TextField label="Link a Trabajo futuro"/>
                </div>
            </div>
        </>
    );
}

const styles = (theme) => {
    return {
        contentContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '2rem',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            height: '100%'
        },
        noProjectContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
        },
        binnacleContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        binnacleEntryContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            backgroundColor: 'yellow',
            padding: '1rem',
            borderRadius: '5px',
            width: 'fit-content'
        }
    }
}