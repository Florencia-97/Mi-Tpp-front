import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";


// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ValidateActionIconDialog from "./dialogs/ValidateActionIconDialog";
import ChangeIdeasOwnerModal from "../screens/ideas/ChangeIdeasOwnerModal";
import EditIdeaModal from "../screens/ideas/EditIdeaModal";


export default function IdeaItemList({app, idea, deleteIdea, publishIdea, changeOwnerOfIdea, onActionSucceded}) {
    const theme = useTheme();
    const style = styles(theme);

    const typeColors = {
        "published": '#AFE3C0',
        "draft": '#FF6AC2'
    }

    const typeTranslation = {
        "published": 'Publicada',
        "draft": 'Borrador'
    }

    return (
        <div style={{...style.ideaContainer, borderLeftColor: typeColors[idea.type]}}>
        <div style={style.ideaRightContainer}>
            <div>
                <Typography variant="h6" fontWeight='700'>
                    {idea.title}
                </Typography>
                <Typography variant="body2">
                    {idea.description}
                </Typography>
            </div>
            <div style={{backgroundColor: typeColors[idea.type], ...style.ideaState}}>
                <Typography fontSize="12px">
                    {typeTranslation[idea.type]}
                </Typography>
            </div>
        </div>
        <div style={style.iconsContainer}>
            {idea.type === "draft" ?
            <>
                <ValidateActionIconDialog
                    icon={<CheckCircleIcon sx={{ color:'#ffgfff'}}/>}
                    acceptBtnLabel="Publicar"
                    actionLabel="publicar esta idea"
                    onAccept={async () => {
                        publishIdea(idea);
                    }}
                />
                <ChangeIdeasOwnerModal app={app} changeOwnerOfIdea={changeOwnerOfIdea}/>
                <EditIdeaModal app={app} idea={idea} onEdit={onActionSucceded}/>
            </>
                :
            <></>
            }
            <ValidateActionIconDialog
                icon={<DeleteIcon sx={{ color:'#ffgfff'}}/>}
                acceptBtnLabel="Eliminar"
                actionLabel="eliminar esta idea"
                onAccept={deleteIdea}
            />
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