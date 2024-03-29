import {useTheme} from "@emotion/react";
import {useEffect, useState} from "react";
import {Alert, Typography} from "@mui/material";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";


export default function TeacherListScreen({app}) {
  const theme = useTheme();
  const [teacherUsers, setTeacherUsers] = useState([]);
  const [alert, setAlert] = useState({message: '', type: ''});

  useEffect(() => {
    getTeacherUsers();
  }, []);

  const style = styles(theme);

  const getTeacherUsers = async () => {
    const response = await app.apiClient().getTeacherUsers();
    setTeacherUsers(response.users());
  }

  const showSuccessAlert = (message) => {
    setAlert({message: message, type: 'success'});
  }

  const showErrorAlert = (message) => {
    setAlert({message: message, type: 'error'});
  }

  const eliminateUserBtn = (userEmail) => {
    const onConfirm = async () => {
      const response = await app.apiClient().removeTeacherUser(userEmail);
      if (response.hasError()) {
        showErrorAlert('No se pudo eliminar al usuario. Intentar nuevamente más adelante.');
      } else {
        showSuccessAlert("Se ha eliminado el usuario correctamente con mail " + userEmail);
        await getTeacherUsers();
      }
    }
    return (
      <ValidateActionTextDialog buttonLabel="Eliminar" actionLabel={"eliminar al usuario " + userEmail}
                                acceptBtnLabel={"eliminar"} onAccept={onConfirm}/>
    );
  }

  const approveUserBtn = (userEmail) => {
    const onConfirm = async () => {
      const response = await app.apiClient().approveTeacherUser(userEmail);
      if (response.hasError()) {
        showErrorAlert('No se pudo agregar al usuario. Intentar nuevamente más adelante.');
      } else {
        showSuccessAlert("El profesor " + userEmail + " puede ahora operar correctamente.");
        getTeacherUsers();
      }
    }
    return (
      <ValidateActionTextDialog buttonLabel="Habilitar" actionLabel={"habilitar al usuario " + userEmail}
                                acceptBtnLabel={"habilitar"} onAccept={onConfirm}/>
    );
  }
  return (
    <>
      <Typography variant="h4" fontWeight='700'>
        Profesores
      </Typography>
      {alert.message !== '' ?
        <Alert severity={alert.type} variant="outlined">
          {alert.message}
        </Alert> :
        <></>
      }
      <section style={style.listContainer}>
        {
          teacherUsers.map((teacherUser) => {
            const borderColor = teacherUser.canOperate ? theme.palette.green.main : theme.palette.grey.main;
            return (
              <div key={teacherUser.email} style={{...style.listElementContainer, borderLeftColor: borderColor}}>
                <p>{teacherUser.email}</p>
                <div>
                  {teacherUser.canOperate ? eliminateUserBtn(teacherUser.email) : approveUserBtn(teacherUser.email)}
                </div>
              </div>
            );
          })
        }
      </section>
    </>
  )
}

const styles = (theme) => {
  return {
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      width: '100%'
    },
    listElementContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: '15px',
      background: '#e3e3e3',
      padding: '18px',
      borderLeftWidth: '10px',
      borderLeftStyle: 'solid',
    },
    addContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    buttonContainer: {
      height: '100%',
    }
  }
}