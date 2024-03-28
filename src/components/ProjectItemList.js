import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";


// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "./buttons/IconButton";


export default function ProjectItemList({project, goToProject}) {
    const theme = useTheme();
    const style = styles(theme);

    const typeColors = {
        "published": '#AFE3C0',
        "draft": '#FF6AC2'
    }

    const typeTranslation = {
        "WAITING_FOR_APPROVED": 'En espera de ser aprobada',
        "draft": 'Borrador'
    }

    return (
        <div style={{...style.ideaContainer, borderLeftColor: typeColors[project.status]}}>
        <div style={style.ideaRightContainer}>
            <div>
                <Typography variant="h6" fontWeight='700'>
                    {project.name}
                </Typography>
                <Typography variant="body2">
                    {project.description}
                </Typography>
            </div>
            <div style={{backgroundColor: typeColors[project.status], ...style.ideaState}}>
                <Typography fontSize="12px">
                    {typeTranslation[project.status]}
                </Typography>
            </div>
        </div>
        <div style={style.iconsContainer}>
            <IconButton icon={<VisibilityIcon/>} onClick={
                () => goToProject(project.id)
            } sx={{ color:'#ffgfff'}}/>
        </div>
    </div>
    )
}

const styles = (theme) => {
    return {
        ideaContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '2rem',
            gap: '15px',
            borderLeft: '1rem solid',
            borderRadius: '5px',
        },
        ideaRightContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '15px'
        },
        iconsContainer: {
            width:'5%',
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        ideaState: {
            padding: '0.5rem 0.8rem', 
            borderRadius: '5px', 
            width: 'fit-content'
        }
    }
}