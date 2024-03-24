import {Avatar, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import {deepOrange} from "@mui/material/colors";
import {useState} from "react";

export default function PendingOfProposalView({app, presentProposal}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [students, setStudents] = useState('');
    const [professors, setProfessors] = useState('');
    const [tags, setTags] = useState('');

    const theme = useTheme();
    const style = styles(theme);

    const presentBtn = () => {
        const project = {
            title: title,
            description: 'description',
            tags: '',
            students: 'flor@gmail.com, nnn@gmail.com',
            professors: 'pablo@gmail.com',
            link: 'link'
        }

        const onAccept = () => {
            const project = {
                title: title,
                description: description,
                tags: tags,
                students: students,
                professors: professors,
                link: link
            }
            app.apiClient().createProject(project).then((response) => {
                presentProposal();
            })
        }

        return (
            <ValidateActionTextDialog buttonLabel="Lista para presentar" actionLabel={"presentar"}
                                      acceptBtnLabel={"presentar"} onAccept={onAccept}/>
        );
    }

    const renderStudents = () => {
        return (
            <div style={style.personsContainer}>
                <div style={style.personContainer}>
                    <Avatar sx={{bgcolor: deepOrange[500], width: 50, height: 50, fontSize: 20}}>
                        FR
                    </Avatar>
                    <Typography style={{fontSize: "12px"}}>
                        Flor
                    </Typography>
                </div>
                <div style={style.personContainer}>
                    <Avatar sx={{bgcolor: deepOrange[500], width: 50, height: 50, fontSize: 20}}>
                        PC
                    </Avatar>
                    <Typography style={{fontSize: "12px"}}>
                        Brai
                    </Typography>
                </div>
                <div style={style.personContainer}>
                    <Avatar sx={{bgcolor: 'grey', width: 50, height: 50, fontSize: 20}}>
                        +
                    </Avatar>
                    <Typography style={{fontSize: "12px"}}>
                        Sumar
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <>
            <div style={style.contentContainer}>
                <div style={style.headerContainer}>
                    <Typography variant="h5">
                        Pendiente de propuesta
                    </Typography>
                    {presentBtn()}
                </div>
                <TextField id="drive-link" label="Titulo" variant="outlined"/>
                <TextField id="description" label="Breve descripción" multiline rows={3} variant="outlined"/>
                <TextField id="drive-link" label="Link Drive" variant="outlined"/>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{flex: 1}}>
                        <Typography variant="h6">
                            Alumnos
                        </Typography>
                        {renderStudents()}
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant="h6">
                            Tutor/co-tutor
                        </Typography>
                        {renderStudents()}
                    </div>
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
            height: "fit-content",
            gap: '15px'
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: "1rem 0"
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
        personsContainer: {
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '1rem',
            paddingBottom: '1rem',
        },
        personContainer: {
            borderRadius: "5px",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "140px",
            width: "120px",
            backgroundColor: "#dddddd",
            display: "flex",
            gap: "5px",
        }
    }
}