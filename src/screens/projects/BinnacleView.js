import {FormGroup, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import BaseIconButtonDialog from "../../components/dialogs/BaseIconButtonDialog";
import FillButton from "../../components/buttons/FillButton";
import Calendar from "../../components/Calendar";
import {useState} from "react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";

const binnacleEntries = [
    {text: "Se creó el proyecto", date: "1/2/2024"},
    {text: "Juntada", date: "12/2/2024"},
    {text: "Prueba 1", date: "13/2/2024"},
    {
        text: "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual",
        date: "12/2/2024"
    },
    {text: "Prueba 3", date: "14/2/2024"},
]

export default function BinnacleView({app, finishProject}) {
    const theme = useTheme();
    const [binnacleEntriesSelected, setBinnacleEntriesSelected] = useState(binnacleEntries);
    const [newBinnacleEntry, setNewBinnacleEntry] = useState('');
    const [dateSelected, setDateSelected] = useState('');
    const style = styles(theme);

    const finishBtn = () => {
        return (
            <ValidateActionTextDialog buttonLabel="Finalizar" actionLabel={"finalizar de desarrollar este proyecto"}
                                      acceptBtnLabel={"finalizar"} onAccept={() => finishProject()}/>
        );
    }

    const deleteIdeaModal = () => {
        return (
            <BaseIconButtonDialog title={"Eliminar comentario"}
                                  iconStyle={{position: 'absolute', top: '1rem', right: '1rem', width: '50px'}}
                                  icon={<DeleteIcon sx={{color: '#ffgfff'}}/>}>
                <FormGroup style={style.newIdeaFormContainer}>
                    Estas seguro que deseas eliminar esta bitacora?
                    <div style={style.buttonsContainer}>
                        <FillButton styles={{width: 'fit-content'}} label="Eliminar" onClick={() => {}}/>
                    </div>
                </FormGroup>
            </BaseIconButtonDialog>
        );
    }

    const addNewBinnacle = () => {
        const newBinnacleEntryCreated = {
            text: newBinnacleEntry,
            date: dateSelected // to string?
        }
        app.apiClient().addBinnacleEntry(newBinnacleEntryCreated);
    }

    const binnacle = () => {
        return binnacleEntriesSelected.map(binnacle => {
            return (
                <div style={style.binnacleEntryContainer}>
                    {deleteIdeaModal()}
                    <Typography variant="body1">
                        {binnacle.text}
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

    const dateSelectedChanged = (day) => {
        // for now is day
        setBinnacleEntriesSelected(binnacleEntries.filter(
            binnacle => binnacle.date.split("/")[0] === day.toString())
        );
    }

    return (
        <>
            <div style={style.mainContainer}>
                <div style={style.topBarContainer}>
                    <Typography variant="h5">
                        Bitácora
                    </Typography>
                    {finishBtn()}
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
                                           setNewBinnacleEntry(event.target.value)
                                       }}
                                       value={newBinnacleEntry}/>
                            <FillButton label={"+"} styles={{width: 'fit-content'}} onClick={
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