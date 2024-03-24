import {Alert, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import CreateIdeaModal from "./CreateIdeaModal";
import IdeaItemList from "../../components/IdeaItemList";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";


function IdeasScreen({app}) {
    const theme = useTheme();
    const [ideas, setIdeas] = useState([]);
    const [alert, setAlert] = useState({message: '', type: ''});

    useEffect(() => {
        getIdeas();
    }, []);

    const getIdeas = async () => {
        const response = await app.apiClient().getIdeas();
        setIdeas(response.ideas());
    }

    const createIdea = async (idea) => {
        const response = await app.apiClient().createIdea(idea);
        if (response.hasError()) {
            setAlert({message: response.error(), type: 'No se pudo crear la idea. Intentar nuevamente más adelante.'});
        } else {
            showSuccessAlert("Se ha creado la idea correctamente.")
            await getIdeas();
        }
    }

    const style = styles(theme);

    const showSuccessAlert = (message) => {
        setAlert({message: message, type: 'success'});
    }

    const onActionSucceded = (message) => {
        getIdeas();
        showSuccessAlert(message);
    }

    const deleteIdea = async (idea) => {
        const response = await app.apiClient().deleteIdea(idea);
        if (response.hasError()) {
            setAlert({message: 'No se pudo eliminar la idea.', type: 'error'});
        } else {
            showSuccessAlert("Se ha eliminado la idea correctamente.");
            await getIdeas();
        }
    }

    const publishIdea = async (idea) => {
        const response = await app.apiClient().publishIdea(idea);
        if (response.hasError()) {
            setAlert({message: 'No se pudo publicar la idea.', type: 'error'});
        } else {
            showSuccessAlert("Se ha publicado la idea correctamente.");
            await getIdeas();
        }
    }

    const renderedIdeas = ideas.map(idea => {
        return <IdeaItemList idea={idea}
                             app={app}
                             onActionSucceded={onActionSucceded}
                             deleteIdea={() => deleteIdea(idea)}
                             publishIdea={(idea) => publishIdea(idea)}/>
    });

    return (
        <>
            <div style={style.ideasBarContainer}>
                <Typography variant="h5">Tus ideas</Typography>
                <CreateIdeaModal createIdea={createIdea}/>
            </div>
            <div style={style.ideasContainer}>
                {alert.message !== '' ?
                    <Alert severity={alert.type} variant="outlined">
                        {alert.message}
                    </Alert> :
                    <></>
                }
                {renderedIdeas}
            </div>
        </>
    );
}

const styles = (theme) => {
    return {
        ideasBarContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '1rem',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        ideasContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '15px'
        }
    }
}

export default observer(IdeasScreen);