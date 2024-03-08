import {FormGroup, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import OutlineButton from "../../components/buttons/OutlineButton";
import {useState} from "react";

export default function ChangeIdeasOwnerModal({onChangeInOwner, app}) {
    const theme = useTheme();
    const [selectedOwner, setSelectedOwner] = useState(0);
    const [open, setOpen] = useState(false);
    const style = styles(theme);

    const changeOwner = (idea) => {
        const response = app.apiClient().changeOwnersIdeas();
        onChangeInOwner("Se cambio el dueño correctamente!");
    }

    const posibleOwners = [
        {
            name: "Pablo Martinez"
        },
        {
            name: "Delfina Brea"
        },
        {
            name: "Bea Gonzales"
        }
    ]

    return (
        <BaseIconButtonDialog title={"Cambiar dueño"} open={open} setOpen={setOpen} icon={<ManageAccountsIcon sx={{color: '#ffgfff'}}/>}>
            <FormGroup style={style.newIdeaFormContainer}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOwner}
                    onChange={(event) => {
                        setSelectedOwner(event.target.value);
                    }}
                >
                    <MenuItem value={0}>{"Delfi Brea"}</MenuItem>
                    <MenuItem value={1}>{"Marta Ortega"}</MenuItem>
                </Select>
                <div style={style.buttonsContainer}>
                    <FillButton styles={{width: 'fit-content'}} label="Cambiar" onClick={changeOwner}/>
                    <OutlineButton styles={{width: 'fit-content'}} label="Cancelar"/>
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
            width: '100%',
            color:'black'
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
        }
    }
}