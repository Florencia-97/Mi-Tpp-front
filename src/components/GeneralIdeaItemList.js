import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";


// Icons
import SeeIdeaModal from "../screens/ideas/SeeIdeaModal";


export default function GeneralIdeaItemList({idea, app }) {
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
                    {idea.name}
                </Typography>
                <Typography variant="body2">
                    {idea.shortDescription}
                </Typography>
            </div>
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <div style={{backgroundColor: typeColors[idea.type], ...style.ideaState}}>
                    <Typography fontSize="12px">
                        {typeTranslation[idea.type]}
                    </Typography>
                </div>
                <Typography fontSize="12px">
                    Dueño: Delfi Brea
                </Typography>
            </div>
        </div>
            <div style={style.iconsContainer}>
                <SeeIdeaModal idea={idea.id} app={app}/>
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