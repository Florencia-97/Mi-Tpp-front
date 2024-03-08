import {Chip, FormGroup, TextField} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useState} from "react";
import FillButton from "../../components/buttons/FillButton";
import BaseTextButtonDialog from "../../components/dialogs/BaseTextButtonDialog";

export default function CreateIdeaModal({createIdea}) {
    const theme = useTheme();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState(["Ia", "Orm"]);
    const [open, setOpen] = useState(false);
    const style = styles(theme);

    const onIdeasCreated = async () => {
        const idea = {
            title: title,
            description: description,
            tags: tags.join(',')
        }
        await createIdea(idea);
        setOpen(false);
    }

    const removeTagNamed = (tagName) => {
        return () => {
            setTags(tags.filter(tag => tag !== tagName));
        }
    }

    const tagsCreated = () => {
        const chips = tags.map(tagName => {
            return <Chip
                label={tagName}
                onDelete={removeTagNamed(tagName)}
            />
        })
        return (
            <div>
                {chips}
            </div>
        );
    }

    const updateDescription = (e) => {
        const newDescription = e.target.value;
        if (newDescription.length > 250) {
            return;
        }
        setDescription(newDescription);
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
                {tagsCreated()}
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label="Crear" onClick={onIdeasCreated}/>
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