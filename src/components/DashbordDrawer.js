import {useTheme} from '@mui/material/styles';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PublicIcon from '@mui/icons-material/Public';
import IconButton from './buttons/IconButton';
import ValidateActionIconDialog from './dialogs/ValidateActionIconDialog';
import {Avatar, Button} from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

import '../styles/DashboardScreen.css';

export default function DashboardDrawer({app, children, setActiveScreen, activeScreen, user}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setActiveScreen(path);
  }, [location]);

  const style = styles(theme);

  const isStudent = user.isStudent();
  const isTeacher = user.isTeacher();

  const iconDrawerButton = (icon, name) => {
    const onClick = () => {
      setActiveScreen(name);
      if (name === "see_project") {
        navigate(name + '/0');
      } else {
        navigate(name);
      }
    }

    if (activeScreen === name) {
      return (
        <IconButton onClick={onClick} icon={icon} styles={{backgroundColor: 'violet'}}/>
      )
    }
    return (
      <IconButton onClick={onClick} icon={icon}/>
    )
  }

  const logOutBtn = () => {
    return (
      <div className={"log-out-btn"}>
        <ValidateActionIconDialog
          icon={<LogoutIcon sx={{color: '#ffffff'}}/>}
          acceptBtnLabel="Cerrar"
          actionLabel="cerrar sesión"
          onAccept={() => {
            app.logoutUser();
            navigate('/');
          }}
        />
      </div>
    );
  }

  const userIcon = () => {
    return (
      <Button onClick={() => {
        setActiveScreen("my-profile");
        navigate("my-profile");
      }}>
        <Avatar alt="Remy Sharp" src={app.currentUser().picture()}/>
      </Button>
    )
  }

  const studentDrawer = () => {
    return <>
      {userIcon()}
      {iconDrawerButton(<LightbulbOutlinedIcon sx={{color: '#ffffff'}}/>, "my_ideas")}
      {iconDrawerButton(<PublicIcon sx={{color: '#ffffff'}}/>, "public_ideas")}
      {iconDrawerButton(<FolderOpenIcon sx={{color: '#ffffff'}}/>, "see_project")}
      {logOutBtn()}
    </>
  }

  const teacherDrawer = () => {
    return <>
      {userIcon()}
      {iconDrawerButton(<PublicIcon sx={{color: '#ffffff'}}/>, "public_ideas")}
      {iconDrawerButton(<LightbulbOutlinedIcon sx={{color: '#ffffff'}}/>, "my_ideas")}
      {iconDrawerButton(<FolderOpenIcon sx={{color: '#ffffff'}}/>, "projects_list")}
      {iconDrawerButton(<SupervisedUserCircleIcon sx={{color: '#ffffff'}}/>, "projects_supervisor_list")}
      {iconDrawerButton(<BarChartIcon sx={{color: '#ffffff'}}/>, "stats")}
      {logOutBtn()}
    </>
  }
  const adminDrawer = () => {
    return <>
      {iconDrawerButton(<AdminPanelSettingsIcon sx={{color: '#ffffff'}}/>, "admins_list")}
      {iconDrawerButton(<SchoolIcon sx={{color: '#ffffff'}}/>, "teachers_list")}
      {iconDrawerButton(<BarChartIcon sx={{color: '#ffffff'}}/>, "stats")}
      {logOutBtn()}
    </>
  }


  return (
    <main className={"main-container"}>
      <div className={"drawer-container"}>
        {isStudent ? studentDrawer() : isTeacher ? teacherDrawer() : adminDrawer()}
      </div>
      <section style={style.sectionContainer}>
        {children}
      </section>
    </main>
  )
}

const styles = (theme) => {
  const palette = theme.palette;
  return {
    sectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '2rem',
      width: '100%',
      gap: '25px',
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }
}