import {useTheme} from "@emotion/react";
import ArticleIcon from "@mui/icons-material/Article";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HardwareIcon from "@mui/icons-material/Hardware";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import SchoolIcon from "@mui/icons-material/School";
import {Avatar, Typography} from "@mui/material";

import '../../styles/ProjectBar.css';

export default function StepsProjectState({currentStep}) {
  const theme = useTheme();
  const style = styles(theme);

  const steps = [
    {name: 'Pend. de propuesta', icon: ArticleIcon},
    {name: 'En revisión', icon: PendingActionsIcon},
    {name: 'En desarrollo', icon: HardwareIcon},
    {name: 'Pend. de Presentación', icon: AlarmOnIcon},
    {name: 'Finalizada', icon: SchoolIcon},
  ]

  // pendiente de propuesta -> completa la info del proyecto. botón a listo pendiente de revisión (link drive, tutor, compañeros)
  // pendiente de revisión -> el tutor revisa y aprueba o rechaza. si rechaza, vuelve a pendiente de propuesta. si aprueba, pasa a en desarrollo. Si rechaza deja comentario
  // en desarollo -> se va completando la bitacora tanto como se quiera. botón a pendiente de aprobación
  // pendiente de aprobación -> seria mas poner la nota y el comentario del tutor. Solo el tutor
  // finalizada -> no se puede hacer nada. Permitir avisar que se va publicar.

  const newAvatar = (step, index) => {
    const backgroundColor = index < currentStep ? '#ccffcc' : index === currentStep ? '#80b1db' : 'lightgray';
    const iconColor = index < currentStep ? '#5b775b' : index === currentStep ? '#ffffff' : '#282f33';
    return (
      <div className={"step-container"}>
        <Avatar
          style={{border: '5px solid ' + backgroundColor}}
          sx={{bgcolor: backgroundColor}} className={"avatar-style"}>
          <step.icon sx={{color: iconColor}} className={"icon-style"}/>
        </Avatar>
        <Typography style={{textAlign: 'center'}}>
          {step.name}
        </Typography>
      </div>
    );
  }

  return (
    <div className={"state-bar-container"}>
      {steps.map((step, index) => {
        return newAvatar(step, index)
      })}
    </div>
  )
}

const styles = (theme) => {
  return {
    stepContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      width: '180px',
    },
  }
}