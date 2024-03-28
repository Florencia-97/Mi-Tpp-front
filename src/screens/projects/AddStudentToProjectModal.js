import {FormGroup, MenuItem, Select} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import AddIcon from '@mui/icons-material/Add';
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import {useState} from "react";

export default function AddStudentToProjectModal({options, onAdd, type='Estudiante'}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const style = styles(theme);

  const _onAdd = async () => {
    const person = options.find(option => option.email === email);
    onAdd(person);
    setOpen(false);
  }

  return (
    <BaseIconButtonDialog title={"Sumar " + type} open={open} setOpen={setOpen}
                          icon={<AddIcon sx={{color: '#ffgfff'}}/>}>
      <FormGroup style={style.newIdeaFormContainer}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        >
          {options.map((option, index) => {
            return <MenuItem key={option.email} value={option.email}>{option.email}</MenuItem>
          })}
        </Select>
      </FormGroup>
      <div style={style.buttonsContainer}>
        <FillButton styles={{width: 'fit-content'}} label="Agregar" onClick={_onAdd}/>
      </div>
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