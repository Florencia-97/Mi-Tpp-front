import {FormGroup, MenuItem, Select} from "@mui/material";
import {useTheme} from "@emotion/react";
import FillButton from "../../components/buttons/FillButton";
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import OutlineButton from "../../components/buttons/OutlineButton";
import {useEffect, useState} from "react";

export default function ChangeIdeasOwnerModal({app, changeOwnerOfIdea}) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [possibleStudents, setPossibleStudents] = useState([]);

  useEffect(() => {
    if (open) {
      app.apiClient().getStudentsWithoutProjects().then((response) => {
        setPossibleStudents(response.users());
      });
    }
  }, [open]);

  const style = styles(theme);

  const _changeOwner = async () => {
    await changeOwnerOfIdea(email);
    setOpen(false);
  }

  return (
    <BaseIconButtonDialog title={"Cambiar dueño"} open={open} setOpen={setOpen}
                          icon={<ManageAccountsIcon sx={{color: '#ffgfff'}}/>}>
      <FormGroup style={style.newIdeaFormContainer}>
        <Select
          labelId="select-student-label"
          id="demo-simple-select"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        >
          {possibleStudents.map((option) => {
            return <MenuItem key={option.email} value={option.email}>{option.email}</MenuItem>
          })}
        </Select>
        <div style={style.buttonsContainer}>
          <FillButton styles={{width: 'fit-content'}} label="Cambiar" onClick={_changeOwner}/>
          <OutlineButton styles={{width: 'fit-content'}} label="Cancelar" onClick={() => setOpen(false)}/>
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
      color: 'black'
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
    }
  }
}