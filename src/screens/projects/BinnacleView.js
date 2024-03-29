import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';

import FillButton from "../../components/buttons/FillButton";
import Calendar from "../../components/Calendar";
import {useEffect, useState} from "react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import ValidateActionIconDialog from "../../components/dialogs/ValidateActionIconDialog";

function currentDay() {
  return new Date();
}

export default function BinnacleView({app, projectId, finishProject}) {
  const theme = useTheme();
  const [binnacleEntries, setBinnacleEntries] = useState([]);
  const [binnacleEntriesSelected, setBinnacleEntriesSelected] = useState([]);
  const [newBinnacleEntry, setNewBinnacleEntry] = useState('');
  const [dateSelected, setDateSelected] = useState(currentDay());

  const style = styles(theme);
  const isStudent = app.currentUser().isStudent();

  useEffect(() => {
    getBinnacleEntries();
  }, []);

  useEffect(() => {
    dateSelectedChanged(dateSelected.getDate(), dateSelected.getMonth(), dateSelected.getFullYear());
  }, [binnacleEntries]);

  const getBinnacleEntries = async () => {
    const response = await app.apiClient().getBinnacleEntries(projectId);
    const _binnacleEntries = response.binnacleEntries();
    await setBinnacleEntries(_binnacleEntries);
  }

  const finishBtn = () => {
    return (
      <ValidateActionTextDialog buttonLabel="Finalizar" actionLabel={"finalizar de desarrollar este proyecto"}
                                acceptBtnLabel={"finalizar"} onAccept={() => finishProject()}/>
    );
  }

  const deleteBinnacleModal = (binnacle) => {
    const onAccept = async () => {
      await app.apiClient().deleteBinnacleEntry(projectId, binnacle.id);
      await getBinnacleEntries();
    }
    return  (
      <div style={{position: 'absolute', top: '1rem', right: '1rem', width: '50px'}}>
        <ValidateActionIconDialog icon={<DeleteIcon/>}
                                  acceptBtnLabel={"eliminar"}
                                  onAccept={onAccept}
                                  actionLabel={"eliminar esta bitacora"}/>

      </div>
    )
  }

  const addNewBinnacle = async () => {
    await app.apiClient().addBinnacleEntry(projectId, newBinnacleEntry, dateSelected);
    await getBinnacleEntries();
  }

  const binnacle = () => {
    return binnacleEntriesSelected.map(binnacle => {
      return (
        <div style={style.binnacleEntryContainer}>
          {deleteBinnacleModal(binnacle)}
          <Typography variant="body1">
            {binnacle.comment}
          </Typography>
          <div style={style.dateRowContainer}>
            <CalendarMonthIcon/>
            <Typography variant="body1" style={{fontWeight: '700', color: theme.palette.text.black}}>
              {binnacle.date}
            </Typography>
          </div>
        </div>
      )
    });
  }

  const dateSelectedChanged = (day, month, year) => {
    setBinnacleEntriesSelected(binnacleEntries.filter(
      binnacle => binnacle.date.split("-")[2] === day.toString())
    );
    const date = new Date(year, month, day);
    setDateSelected(date);
  }

  return (
    <>
      <div style={style.mainContainer}>
        <div style={style.topBarContainer}>
          <Typography variant="h5">
            Bitácora
          </Typography>
          {!isStudent && finishBtn()}
        </div>
        <div style={style.contentContainer}>
          <div style={style.binnacleContainer}>
            {binnacle()}
          </div>
          <div style={style.calendarContainer}>
            <Calendar dateSelectedChanged={dateSelectedChanged}/>
            <div style={{display: 'flex', gap: '5px'}}>
              <TextField fullWidth label={"Nueva entrada"} multiline rows={3}
                         onChange={(event) => {
                           setNewBinnacleEntry(event.target.value);
                         }}
                         value={newBinnacleEntry}/>
              <FillButton
                label={"+"}
                disabled={newBinnacleEntry === ''}
                styles={{width: 'fit-content'}}
                onClick={
                  async () => {
                    await addNewBinnacle();
                    setNewBinnacleEntry('');
                  }
                }/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = (theme) => {
  return {
    mainContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '2rem',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      height: '100%'
    },
    topBarContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    contentContainer: {
      display: 'flex',
    },
    noProjectContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    },
    binnacleContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      overflowY: "scroll",
      width: '650px',
      padding: "1rem",
      height: "500px",
    },
    binnacleEntryContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      backgroundColor: '#ee82ee69',
      padding: '1rem 2rem',
      borderRadius: '0.8rem',
      width: '600px',
    },
    dateRowContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '0.8rem',
      alignItems: 'center',
      alignContent: 'center'
    },
    calendarContainer: {
      marginLeft: '3rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    }
  }
}