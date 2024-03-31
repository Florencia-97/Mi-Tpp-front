import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";


// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from "./buttons/IconButton";


export default function ProjectItemList({project, goToProject}) {
  const theme = useTheme();
  const style = styles(theme);

  const typeColors = { //TODO: Change remaining colors
    "WAITING_FOR_APPROVE": '#ffe380',
    "IN_DEVELOPMENT": '#AFE3C0',
    "PENDING_OF_PRESENTATION": '#FF6AC2',
    "GRADED": '#ff9f7e',
    "PUBLISHED": '#FF6AC2'
  }

  const typeTranslation = {
    'WAITING_FOR_APPROVE': 'En espera de aprobación',
    'IN_DEVELOPMENT': 'En desarrollo',
    'PENDING_OF_PRESENTATION': 'Pendiente de presentación',
    'GRADED': 'Pendiente de nota',
    'PUBLISHED': 'Publicado',
  }

  return (
    <div style={{...style.projectContainer, borderLeftColor: typeColors[project.status]}}>
      <div style={style.ideaRightContainer}>
        <div>
          <Typography variant="h6" fontWeight='700'>
            {project.title}
          </Typography>
          <Typography variant="body2">
            {project.description}
          </Typography>
        </div>
        <div style={{backgroundColor: typeColors[project.status], ...style.ideaState}}>
          <Typography fontSize="12px">
            {typeTranslation[project.status]}
          </Typography>
        </div>
      </div>
      <div style={style.iconsContainer}>
        <IconButton icon={<VisibilityIcon/>} onClick={
          () => goToProject(project.id)
        } sx={{color: '#ffgfff'}}/>
      </div>
    </div>
  )
}

const styles = (theme) => {
  return {
    projectContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '2rem',
      gap: '15px',
      borderLeft: '1rem solid',
      borderRadius: '5px',
    },
    ideaRightContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '15px'
    },
    iconsContainer: {
      width: '5%',
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    ideaState: {
      padding: '0.5rem 0.8rem',
      borderRadius: '5px',
      width: 'fit-content'
    }
  }
}