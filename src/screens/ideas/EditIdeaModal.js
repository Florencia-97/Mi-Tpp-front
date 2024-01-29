import {Chip, FormGroup, TextField} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import EditIcon from "@mui/icons-material/Edit";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import {useState} from "react";

export default function EditIdeaModal({app, idea, onEdit}) {
    const theme = useTheme();
    const style = styles(theme);

    const [loading, setLoading] = useState(false);

    const editIdea = async () => {
        setLoading(true);
        //await app.apiClient().editIdea(idea);
        setLoading(false);
        onEdit("Se edito correctamente!");
    }

    if (loading) {
        return (
            <div>loading</div>
        );
    }

    const labelsCreated = () => {
        return (
            <div>
                <Chip
                    label={"Inteligencia artificial"}
                    onDelete={() => console.log('asdf')}
                />
                <Chip
                    label={"ORM"}
                    onDelete={() => console.log('asdf')}
                />
            </div>
        );
    }

    return (
        <BaseIconButtonDialog title={"Editar idea"} icon={<EditIcon sx={{color: '#ffgfff'}}/>}>
            <FormGroup style={style.newIdeaFormContainer}>
                {idea.title}
                <TextField
                    label="Idea"
                    value={idea.shortDescription}
                    multiline
                    rows={5}
                    id="idea-body"/>
                {labelsCreated()}
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label="Crear" onClick={editIdea}/>
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