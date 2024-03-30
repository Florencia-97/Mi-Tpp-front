import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {useState} from "react";
import BaseTextButtonDialog from "../../components/dialogs/BaseTextButtonDialog";
import FillButton from "../../components/buttons/FillButton";
import OutlineButton from "../../components/buttons/OutlineButton";

export default function GradeProjectDialog({onGrade}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  const style = styles(theme);
  const _onAccept = () => {
    onGrade(comment);
    setOpen(false);
  }

  return (
    <BaseTextButtonDialog title={"Aprobar trabajo"} open={open}
                          setOpen={setOpen} buttonLabel={'Aprobar'}>
      <div style={style.bodyContainer}>
        <Typography>
          Estás por aprobar el trabajo del equipo. Dejá un comentario.
        </Typography>
        <TextField label="Comentario"
                   multiline
                    rows={4}
                   value={comment}
                   onChange={(e) => {setComment(e.target.value)}}/>
        <div style={style.buttonsContainer}>
          <FillButton styles={{width: 'fit-content'}}
                      disabled={!comment}
                      label={'Aprobar'}
                      onClick={_onAccept}/>
          <OutlineButton styles={{width: 'fit-content'}} label="Cancelar" onClick={() => setOpen(false)}/>
        </div>
      </div>
    </BaseTextButtonDialog>
  );
}

const styles = (theme) => {
  return {
    bodyContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
    }
  }
}