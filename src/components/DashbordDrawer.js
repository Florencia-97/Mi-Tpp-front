import { useTheme } from '@mui/material/styles';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PublicIcon from '@mui/icons-material/Public';
import IconButton from './buttons/IconButton';
import ValidateActionIconDialog from './dialogs/ValidateActionIconDialog';


export default function DashboardDrawer({children, setActiveScreen, activeScreen}) {
  const theme = useTheme();
  const style = styles(theme);

  const iconDrawerButton = (icon, name) => {
    const onClick = () => {
      setActiveScreen(name);
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
      <div style={{marginTop:'auto'}}>
        <ValidateActionIconDialog
          icon={<LogoutIcon sx={{ color:'#ffffff'}}/>}
          acceptBtnLabel="Cerrar"
          actionLabel="cerrar sesión"
          onAccept={() => console.log('cosas')}
      />
      </div>
    );
  }


  return (
    <main style={style.mainContainer}>
      <div style={style.drawerContainer}>
        {iconDrawerButton(<LightbulbOutlinedIcon sx={{ color:'#ffffff'}}/>, "my_ideas")}
        {iconDrawerButton(<PublicIcon sx={{ color:'#ffffff'}}/>, "public_ideas")}
        {iconDrawerButton(<FolderOpenIcon sx={{ color:'#ffffff'}}/>, "project")}
        {iconDrawerButton(<PersonOutlineIcon sx={{ color:'#ffffff'}}/>, "profile")}
        {logOutBtn()}
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
    mainContainer: {
      height: '100vh',
      display: 'flex',
      backgroundColor: palette.background.default
    },
    drawerContainer: {
      height: '100%',
      width: '5rem',
      backgroundColor: palette.primary.main,
      display: 'flex',
      flexDirection: 'column',
      alignItems:'center',
      padding:'25px',
      gap: '25px'
    },
    sectionContainer: {
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '2rem',
      width: '100%',
      gap: '25px'
    }
  }
}