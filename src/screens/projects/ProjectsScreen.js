import {Avatar, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import BinnacleView from "./BinnacleView";
import NoProjectView from "./NoProjectView";
import PendingOfProposalView from "./PendingOfProposalView";
import PendingOfRevisionView from "./PendingOfRevisionView";

import SchoolIcon from '@mui/icons-material/School';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import HardwareIcon from '@mui/icons-material/Hardware';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ArticleIcon from '@mui/icons-material/Article';
import PendingOfApprovalView from "./PendingOfApprovalView";
import FinishedView from "./FinishedView";

const currentStepFixed = 2;

function StepsProjectState() {
    const theme = useTheme();
    const style = styles(theme);

    const steps = [
        {name: 'Pendiente de propuesta', icon: ArticleIcon},
        {name: 'Pendiente de revisión', icon: PendingActionsIcon},
        {name: 'En desarrollo', icon: HardwareIcon},
        {name: 'Pendiente de Aprobación', icon: AlarmOnIcon},
        {name: 'Finalizada', icon: SchoolIcon},
    ]

    // pendiente de propuesta -> completa la info del proyecto. botón a listo pendiente de revisión (link drive, tutor, compañeros)
    // pendiente de revisión -> el tutor revisa y aprueba o rechaza. si rechaza, vuelve a pendiente de propuesta. si aprueba, pasa a en desarrollo. Si rechaza deja comentario
    // en desarollo -> se va completando la bitacora tanto como se quiera. botón a pendiente de aprobación
    // pendiente de aprobación -> seria mas poner la nota y el comentario del tutor. Solo el tutor
    // finalizada -> no se puede hacer nada. Permitir avisar que se va publicar.

    const currentStep = currentStepFixed;

    const newAvatar = (step, index) => {
        const backgroundColor = index < currentStep ? '#ccffcc' : index === currentStep ? '#80b1db' : 'lightgray';
        const iconColor = index < currentStep ? '#5b775b' : index === currentStep ? '#ffffff' : '#282f33';
        return (
            <div style={{...style.stepContainer}}>
                <Avatar
                    style={{border: '5px solid ' + backgroundColor}}
                    sx={{bgcolor: backgroundColor, height: '100px', width: '100px'}}>
                    <step.icon sx={{color: iconColor, height: '40px', width: '40px'}}/>
                </Avatar>
                <Typography style={{textAlign: 'center'}}>
                    {step.name}
                </Typography>
            </div>
        );
    }

    return (
        <div style={style.stateBarContainer}>
            {steps.map((step, index) => {
                return newAvatar(step, index)
            })}
        </div>
    )
}


export default function ProjectsScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);

    const isStudent = app.currentUser().isStudent();


    const hasStartedProject = true;
    const currentStep = currentStepFixed;
    const project = () => {
        return (
            <>
                <div style={style.ideasBarContainer}>
                    <Typography variant="h5">
                        Tu proyecto
                    </Typography>
                </div>
                <StepsProjectState/>
                {currentStep === 0 ?
                    <PendingOfProposalView/>
                    :
                    currentStep === 1 ?
                        <PendingOfRevisionView app={app} isStudent={isStudent}/>
                        :
                        currentStep === 2 ?
                            <BinnacleView app={app}/>
                            :
                            currentStep === 3 ?
                                <PendingOfApprovalView isStudent={isStudent}/>
                                : <FinishedView/>
                }
            </>
        )
    }

    return (
        <>
            {hasStartedProject ?
                project()
                :
                <NoProjectView/>
            }
        </>
    );
}

const styles = (theme) => {
    return {
        ideasBarContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '1rem',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        contentContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '2rem',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            height: '250px'
        },
        stateBarContainer: {
            backgroundColor: theme.palette.background.white,
            width: '100%',
            padding: '1rem',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '250px'
        },
        stepContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
        },
    }
}