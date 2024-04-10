import {useTheme} from "@emotion/react";
import {Avatar, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import OutlineButton from "../components/buttons/OutlineButton";


export default function ProfileScreen({app}) {
  const theme = useTheme();
  const [user, setUser] = useState(undefined);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(
    () => {
      const email = location.state.email;
      app.apiClient().getUserProfile(email).then(response => {
        const user = response.user();
        setUser(user);
      })
    }, [location]
  )

  const style = styles(theme);

  if (!user) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <>
      <div style={style.mainContainer}>
        <div style={style.profileContainer}>
          <div style={style.topContainer}>
            <Avatar alt="Remy Sharp" src={user.picture} style={{width: '150px', height: '150px'}}/>
            <Typography variant="body1">
              {user.email}
            </Typography>
          </div>
          <TextField fullWidth label="Nombre y Apellido"
                     disabled
                     value={user.username}/>
          <TextField fullWidth label="Intereses"
                     disabled
                     rows={4}
                     multiline
                     value={user.description}/>
          <TextField fullWidth label="Carrera"
                     disabled
                     value={user.career}/>
          <OutlineButton styles={{width: 'fit-content', alignSelf: 'flex-end'}}
                         label="Volver"
                         onClick={() => {
                           navigation(-1)
                         }}/>
        </div>
      </div>
    </>
  );
}

const styles = (theme) => {
  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    profileContainer: {
      backgroundColor: theme.palette.background.white,
      width: '80%',
      padding: '2rem',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '25px',
      height: '80%'
    },
    topContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      flex: 1
    }
  }
}