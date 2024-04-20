import {Chip, FormGroup, TextField} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useState} from "react";
import FillButton from "../../components/buttons/FillButton";
import BaseTextButtonDialog from "../../components/dialogs/BaseTextButtonDialog";
import OutlineButton from "../../components/buttons/OutlineButton";
import RenderChips from "../../components/RenderChips";

export default function CreateIdeaModal({createIdea}) {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [open, setOpen] = useState(false);
  const style = styles(theme);

  const onIdeasCreated = async () => {
    const idea = {
      title: title,
      description: description,
      tags: tags.join(',')
    }
    await createIdea(idea);
    restartState();
    setOpen(false);
  }

  const restartState = () => {
    setTitle('');
    setDescription('');
    setTags([]);
    setNewTag('');
  }

  const removeTagNamed = (tagName) => {
    return () => {
      setTags(tags.filter(tag => tag !== tagName));
    }
  }

  const updateDescription = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length > 298) {
      return;
    }
    setDescription(newDescription);
  }

  const renderAddTag = () => {
    return (
      <TextField
        label="Añadir etiqueta"
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            setTags([...tags, newTag]);
            setNewTag('');
          }
        }}
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        id="tags-add-field"/>
    );
  }

  return (
    <BaseTextButtonDialog title={"Nueva idea"}
                          open={open}
                          setOpen={setOpen}
                          buttonLabel="Crear idea">
      <FormGroup style={style.newIdeaFormContainer}>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="idea-title"/>
        <TextField
          label="Idea"
          multiline
          rows={5}
          value={description}
          onChange={updateDescription}
          id="idea-body"/>
        {renderAddTag()}
        <RenderChips tags={tags} removeTagNamed={removeTagNamed}/>
        <div style={style.buttonsContainer}>
          <FillButton styles={{width: 'fit-content'}} label="Crear" onClick={onIdeasCreated}/>
          <OutlineButton styles={{width: 'fit-content'}} label="Cerrar" onClick={() => {
            restartState();
            setOpen(false);
          }}/>
        </div>
      </FormGroup>
    </BaseTextButtonDialog>
  );
}

const styles = (theme) => {
  return {
    newIdeaFormContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      width: '100%'
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
    }
  }
}