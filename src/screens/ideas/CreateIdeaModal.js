import {Chip, FormGroup, TextField} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import BaseTextButtonDialog from "../../components/dialogs/BaseTextButtonDialog";

export default function CreateIdeaModal({createIdea}) {
    const theme = useTheme();
    const style = styles(theme);

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
        <BaseTextButtonDialog title={"Nueva idea"} buttonLabel="Crear idea">
            <FormGroup style={style.newIdeaFormContainer}>
                <TextField 
                    label="Título"
                    id="idea-title"/>
                <TextField 
                    label="Idea"
                    multiline
                    rows={5}
                    id="idea-body"/>
                {labelsCreated()}
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width:'fit-content'}} label="Crear" onClick={createIdea}/>
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