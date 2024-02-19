import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

function ProjectFinished() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <div style={style.projectFinishedContainer}>
            <img alt="image"
                 style={{width: '170px', height: '100%', borderRadius: '5px'}}
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9oqPFPYBx7G1Uyvz6oxU8dkd_01sZ_vRzcv9uDj5_f2Xe1-rmbf5dYWBaYVjygULIztY&usqp=CAU"></img>
            <div style={style.projectInfoContainer}>
                <Typography variant="h5">
                    IA en Twitter
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.
                </Typography>
                <Typography variant="body1">
                    Trabajo futuro: https://www.google.com
                </Typography>
            </div>
        </div>
    );
}

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
                <Typography variant="h5">
                    Preview
                </Typography>
                <ProjectFinished/>
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
        },
        projectFinishedContainer: {
            display: 'flex',
            gap: '15px',
            padding: '1rem',
            borderRadius: '5px',
            border: 'grey solid',
            borderWidth: '2px',
            width: '800px',
            height: "200px"
        },
        projectInfoContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }
    }
}