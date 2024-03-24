import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ProjectFinished from "../../components/ProjectFinished";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import {useState} from "react";

export default function FinishedView({publishProject}) {
    const theme = useTheme();
    // Form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [futureLink, setFutureLink] = useState('');

    const style = styles(theme);

    const publishBtn = () => {
        return (
            <ValidateActionTextDialog buttonLabel="Publicar" actionLabel={"publicar proyecto"}
                                      acceptBtnLabel={"publicar"} onAccept={publishProject}/>
        );
    }

    const textField = (label, value, onChange, maxLenght, isMultiline = false, rows = 1) => {
        return (
            <TextField required label={label}
                       multiline={isMultiline} rows={rows}
                       fullWidth
                       inputProps={{maxLength: maxLenght}}
                       onChange={(event) => onChange(event.target.value)}
                       value={value}/>
        );
    }

    return (
        <>
            <div style={style.contentContainer}>
                <div style={style.headerContainer}>
                    <Typography variant="h5">
                        Felicitaciones por terminar tu proyecto!
                    </Typography>
                    {publishBtn()}
                </div>
                <Typography variant="body1">
                    Te pedimos que completes un poco más de información para poder mostrar tu proyecto en la galería.
                    De esta manera podremos mostrar tu trabajo a futuros estudiantes e interesados. Podés ver ejemplos
                    siguiendo el link <a target='_blank' href={'http://localhost:3000/projects'}>Todos los proyectos</a>
                </Typography>
                <div style={{display: 'flex', flexDirection: 'row', gap: '15px', width: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px', flex: 1}}>
                        {textField('Título del proyecto', title, setTitle, 50)}
                        {textField('Link al trabajo', link, setLink, 50)}
                        {textField('Link al trabajo futuro', futureLink, setFutureLink, 50)}
                    </div>
                    <div style={{flex: 1}}>
                        {textField('Descripción del proyecto', description, setDescription, 250, true, 4)}
                    </div>
                </div>
{/*                <Typography variant="h5">
                    Preview
                </Typography>
                <ProjectFinished title={title} description={description} workLink={link} futureWorkLink={futureLink}/>*/}
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
            gap: '1.5rem',
            height: '100%'
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '2rem'
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