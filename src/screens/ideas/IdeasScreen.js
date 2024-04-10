import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import CreateIdeaModal from "./CreateIdeaModal";
import IdeaItemList from "../../components/IdeaItemList";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


function IdeasScreen({app}) {
  const theme = useTheme();
  const [ideas, setIdeas] = useState([]);

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
      toast.error('No se pudo crear la idea. Intentar nuevamente más adelante.')
    } else {
      toast.success('Se ha creado la idea correctamente')
      await getIdeas();
    }
  }

  const style = styles(theme);

  const deleteIdea = async (idea) => {
    try {
      await app.apiClient().deleteIdea(idea);
      toast.success('Se ha eliminado la idea correctamente')
      await getIdeas();
    } catch (e) {
      toast.error('No se pudo eliminar la idea. Intentar nuevamente más adelante.')
    }
  }

  const editIdea = async (idea, description, tags) => {
    try {
      await app.apiClient().editIdea(idea, description, tags);
      toast.success('Se ha editado la idea correctamente')
      await getIdeas();
    } catch (e) {
      toast.error('No se pudo editar la idea. Intentar nuevamente más adelante.')
    }
  }

  const publishIdea = async (idea) => {
    try {
      await app.apiClient().publishIdea(idea);
      toast.success('Se ha publicado la idea correctamente')
      await getIdeas();
    } catch (e) {
      toast.error('No se pudo publicar la idea. Intentar nuevamente más adelante.')
    }
  }

  const changeOwnerOfIdea = async (idea, newOwnersEmail) => {
    try {
      await app.apiClient().changeOwnersIdeas(idea, newOwnersEmail);
      toast.success('Se ha cambiado el dueño de la idea correctamente')
      await getIdeas();
    } catch (e) {
      toast.error('No se pudo cambiar el dueño de la idea. Intentar nuevamente más adelante.')
    }
  }

  const renderedIdeas = ideas.map(idea => {
    return <IdeaItemList idea={idea}
                         app={app}
                         editIdea={(description, tags) => editIdea(idea, description, tags)}
                         deleteIdea={() => deleteIdea(idea)}
                         changeOwnerOfIdea={(newOwnersEmail) => changeOwnerOfIdea(idea, newOwnersEmail)}
                         publishIdea={(idea) => publishIdea(idea)}/>
  });

  return (
    <>
      <div style={style.ideasBarContainer}>
        <Typography variant="h5">Tus ideas</Typography>
        <CreateIdeaModal createIdea={createIdea}/>
      </div>
      <div style={style.ideasContainer}>
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