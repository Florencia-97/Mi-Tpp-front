import {useTheme} from "@emotion/react";
import {Avatar, Button, FormGroup, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const possibleCareers = [
  'Ingeniería en Informática',
  'Lic. en Sistemas',
]

export default function ProfileScreen({app}) {
  const theme = useTheme();
  const [user, setUser] = useState(undefined);
  const [career, setCareer] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [maxProjects, setMaxProjects] = useState(5);

  const currentUser = app.currentUser();

  useEffect(
    () => {
      app.apiClient().getUserProfile(currentUser.email()).then(response => {
        const user = response.user();
        setUser(user);
        setCareer(user.career);
        setUsername(user.username);
        setDescription(user.description);
        setMaxProjects(user.projects_cap);
      })
    }, []
  )

  const style = styles(theme);

  if (!user) {
    return (
      <div>Cargando...</div>
    )
  }

  const updateProfile = async () => {
    const response = await app.apiClient().updateUserProfile(user.email, username, career, description, maxProjects);
    setUser(response.user());
    toast.success('Perfil actualizado correctamente')
  }

  const selectCareer = () => {
    return (
      <Select
        labelId="demo-simple-select-career-label"
        id="select-career-select"
        fullWidth={true}
        value={career}
        onChange={(event) => {
          setCareer(event.target.value);
        }}
      >
        {possibleCareers.map((c) => {
          return <MenuItem key={c} value={c}>{c}</MenuItem>
        })}
      </Select>
    )
  }

  const amountOfProjects = () => {
    return (
      <TextField fullWidth label="Máxima cantidad de proyectos"
                 onChange={(event) => {
                   setMaxProjects(event.target.value);
                 }}
                 type={'number'}
                 value={maxProjects}/>
    )
  }

  return (
    <>
      <div style={style.mainContainer}>
        <div style={style.profileContainer}>
          <Button variant="contained" color="primary" style={style.updateBtn} onClick={updateProfile}>
            Actualizar
          </Button>
          <div style={style.leftContainer}>
            <Avatar alt="Remy Sharp" src={user.picture} style={{width: '150px', height: '150px'}}/>
            <Typography variant="body1">
              {user.email}
            </Typography>
          </div>
          <FormGroup style={style.rightContainer}>
            <TextField fullWidth label="Nombre y Apellido"
                       onChange={(event) => {
                         setUsername(event.target.value)
                       }}
                       value={username}/>
            <TextField fullWidth label="Sobre vos"
                       multiline
                       rows={4}
                       onChange={(event) => {
                         setDescription(event.target.value)
                       }}
                       value={description}/>
            {currentUser.isStudent() && selectCareer()}
            {currentUser.isTeacher() && amountOfProjects()}
          </FormGroup>
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '25px',
      height: '80%',
      position: 'relative'
    },
    leftContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      flex: 1
    },
    rightContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      flex: 1
    },
    updateBtn: {
      position: 'absolute',
      top: '2rem',
      right: '2rem'
    }
  }
}