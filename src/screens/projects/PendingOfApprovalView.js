import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useState} from "react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";

export default function PendingOfApprovalView({isStudent, gradeProject}) {
    const theme = useTheme();
    const style = styles(theme);

    const [linkToDrive, setLinkToDrive] = useState('https://google.com');

    const gradeBtn = () => {
        return (
            <ValidateActionTextDialog buttonLabel="Aprobar" actionLabel={"aprobar proyecto"}
                                      acceptBtnLabel={"aprobar"} onAccept={gradeProject}/>
        );
    }

    const studentView = () => {
        return (
            <div style={style.contentContainer}>
                <Typography variant="h6">
                    El proyecto está pendiente de revisión!
                </Typography>
                <Typography variant="body1">
                    Completá los siguientes campos para que podamos revisar tu proyecto.
                </Typography>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <TextField label="Link a carpeta" onChange={(link) => {
                        setLinkToDrive(link.target.value);
                    }} value={linkToDrive}/>
                    <TextField label="Presentacion" onChange={(link) => {
                        setLinkToDrive(link.target.value);
                    }} value={""}/>
                    <TextField label="Informe" onChange={(link) => {
                        setLinkToDrive(link.target.value);
                    }} value={""}/>
                    <TextField label="Github" onChange={(link) => {
                        setLinkToDrive(link.target.value);
                    }} value={""}/>
                </div>
            </div>
        )
    }

    const teacherView = () => {
        return (
            <div style={style.contentContainer}>
                {gradeBtn()}
                <Typography variant="h6">
                    El proyecto está pendiente de revisión!
                </Typography>
                <Typography variant="body1">
                    Drive al proyecto completado por el equipo.
                </Typography>
                <Typography>
                    Link: <a rel='noopener noreferrer' href={linkToDrive} target="_blank">{linkToDrive}</a>
                </Typography>
            </div>
        )
    }

    return (
        <>
            {isStudent ? studentView() : teacherView()}
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