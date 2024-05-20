import React, {useState} from "react";
import {useTheme} from "@emotion/react";
import {Alert, Button, Typography} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import User from "../../app/User";
import LogoFiuba from "../../assets/logo-fiuba.png";
import '../../styles/AccessScreen.css';


export default function AccessScreen({app, role}) {
  const theme = useTheme();
  const navigator = useNavigate();
  const [alert, setAlert] = useState({message: '', type: ''});
  const userLoginRole = role;

  const studentOrTeacherAccess = async (codeResponse) => {
    const response = await app.apiClient().accessUser(codeResponse.access_token, userLoginRole);
    const appUser = new User({
      email: response.email(),
      name: response.username(),
      picture: response.picture(),
      canOperate: response.canUserOperate(),
      role: userLoginRole
    })

    await app.loginUser(appUser, response.token());
    navigator('/public_ideas');
  }

  const adminAccess = async (codeResponse) => {
    const response = await app.apiClient().loginAdmin(codeResponse.access_token);

    const appUser = new User({
      email: response.email(),
      name: '',
      picture: '',
      canOperate: response.canUserOperate(),
      role: 'ADMIN'
    })

    await app.loginUser(appUser, response.token());
    navigator('/admins_list');
  }

  const access = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        if (role !== 'ADMIN') {
          await studentOrTeacherAccess(codeResponse);
        } else {
          await adminAccess(codeResponse);
        }
      } catch (error) {
        setAlert({message: 'Error al intentar acceder.', type: 'error'});
      }
    },
    onError: (error) => console.log('Register Failed:', error)
  });

  const style = styles(theme);

  return (
    <main className={"login-screen"}>
      <section className={"main-container"}>
        <div className={"left-container"}>
          <Typography variant="h3" style={{color: '#c7c7c7'}} fontWeight={'900'}>
            {userLoginRole === 'STUDENT' ? 'Alumnos' : userLoginRole === 'TEACHER' ? 'Profesores' : 'Administradores'}
          </Typography>
        </div>
        <div style={style.rightContainer}>
          <img src={LogoFiuba} alt="Logo Fiuba" style={style.imageContainer}/>
          <Typography variant="h4"> Mi Trabajo Profesional </Typography>
          {alert.message !== '' ?
            <Alert severity={alert.type} variant="outlined">
              {alert.message}
            </Alert> :
            <></>
          }
          <div>
            <Button style={{color: 'white', backgroundColor: theme.palette.primary.main, width: '100%'}}
                    variant={'outlined'} onClick={() => access()}>
              Accede con Google
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = (theme) => {
  return {
    leftContainer: {
      backgroundColor: theme.palette.primary.main,
      background: "linear-gradient(90deg, rgba(84,66,142,1) 21%, rgba(221,67,67,1) 80%, rgba(219,182,130,1) 100%)",
      flex: 2,
      display: 'flex',
      alignItems: 'flex-end',
      padding: '1rem',
    },
    rightContainer: {
      backgroundColor: theme.palette.background.default,
      flex: 1,
      gap: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: '200px',
      height: '200px',
      marginBottom: '1rem'
    }
  }
}