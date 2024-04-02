import {FormGroup, TextField} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import EditIcon from "@mui/icons-material/Edit";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import {useState} from "react";
import RenderChips from "../../components/RenderChips";

export default function EditIdeaModal({idea, editIdea}) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(idea.description);
  const [tags, setTags] = useState(idea.tags);
  const [newTag, setNewTag] = useState('');

  const style = styles(theme);

  const _editIdea = async () => {
    setLoading(true);
    await editIdea(description, tags.join(','));
    setLoading(false);
    setOpen(false);
  }

  const removeTagNamed = (tagName) => {
    return () => {
      setTags(tags.filter(tag => tag !== tagName));
    }
  }

  if (loading) {
    return (
      <div>loading</div>
    );
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
    <BaseIconButtonDialog title={"Editar idea"} open={open} setOpen={setOpen}
                          icon={<EditIcon sx={{color: '#ffgfff'}}/>}>
      <FormGroup style={style.newIdeaFormContainer}>
        {idea.title}
        <TextField
          label="Idea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={5}
          id="idea-body"/>
        {renderAddTag()}
        <RenderChips tags={tags} removeTagNamed={removeTagNamed}/>
        <div style={style.buttonsContainer}>
          <FillButton styles={{width: 'fit-content'}}
                      disabled={loading || !description}
                      label="Editar" onClick={_editIdea}/>
        </div>
      </FormGroup>
    </BaseIconButtonDialog>
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