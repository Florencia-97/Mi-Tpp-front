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
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


function StepsProjectState({currentStep}) {
    const theme = useTheme();
    const style = styles(theme);

    const steps = [
        {name: 'Pendiente de propuesta', icon: ArticleIcon},
        {name: 'En revisión', icon: PendingActionsIcon},
        {name: 'En desarrollo', icon: HardwareIcon},
        {name: 'Pendiente de Presentación', icon: AlarmOnIcon},
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
    const [hasStartedProject, setHasStartedProject] = useState(false); // false
    const [project, setProject] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();
    const style = styles(theme);

    const isStudent = app.currentUser().isStudent();
    const stepsDic = {
        'WAITING_FOR_APPROVE': 1,
        'IN_DEVELOPMENT': 2,
        'PENDING_OF_PRESENTATION': 3,
        'GRADED': 4,
        'PUBLISHED': 4,
    }

    useEffect(() => {
        updateProject();
    }, [id]);

    const updateProject = async () => {
        if (!isStudent) {
            getProjectForTeacher();
        } else {
            getProjectForStudent();
        }
    }

    const getProjectForTeacher = async () => {
        setLoading(true);
        app.apiClient().getProjectInfoFor().then((response) => {
            setHasStartedProject(true);
            const projects = response.projects();
            const projectSelected = projects.find((project) => project.id === id);
            setProject(projectSelected);
            setCurrentStep(stepsDic[projectSelected.status]);
        }).catch((e) => {
            setHasStartedProject(false);
        }).finally(
          () => setLoading(false)
        )
    }

    const getProjectForStudent = async () => {
        setLoading(true);
        app.apiClient().getProjectInfoFor().then((response) => {
            const project = response.project();
            if (project) {
                setProject(project);
                setCurrentStep(stepsDic[response.project().status]);
                setHasStartedProject(true);
            }
        }).catch((e) => {
            setHasStartedProject(false);
        }).finally(
          () => setLoading(false)
        )
    }

    const startProject = () => {
        setHasStartedProject(true);
        setCurrentStep(0);
    }

    const publishProject = async () => {
        await app.apiClient().publishProject(project.id);
        await updateProject();
    }

    const updateProjectToPublish = (title, description, linkToProject, linkToFutureWork) => {
        app.apiClient().updateProjectToPublishProject(project.id, title, description, linkToProject, linkToFutureWork);
    }

    const renderProject = () => {
        return (
            <>
                <div style={style.ideasBarContainer}>
                    <Typography variant="h5">
                        {isStudent ? 'Tu proyecto' : 'Seguimiento de proyecto'}
                    </Typography>
                </div>
                <StepsProjectState currentStep={currentStep}/>
                {currentStep === 0 ?
                    <PendingOfProposalView app={app} presentProposal={() => setCurrentStep((1))}/>
                    :
                    currentStep === 1 ?
                        <PendingOfRevisionView project={project} isStudent={isStudent}
                                               approveProject={() => {
                                                   app.apiClient().approveProject(project.id);
                                                   setCurrentStep(2);
                                               }}/>
                        :
                        currentStep === 2 ?
                            <BinnacleView app={app} projectId={project.id} finishProject={() => {
                                app.apiClient().finishProject(project.id);
                                setCurrentStep(3);
                            }}/>
                            :
                            currentStep === 3 ?
                                <PendingOfApprovalView project={project} isStudent={isStudent} gradeProject={
                                    (comment) => {
                                        app.apiClient().gradeProject(project.id, comment);
                                        setCurrentStep(4);
                                    }}/>
                                : <FinishedView project={project} isStudent={isStudent}
                                                updateProjectToPublish={updateProjectToPublish}
                                                publishProject={publishProject}/>
                }
            </>
        )
    }

    if (loading) {
        // Todo: make prettier
        return (
            <div>Loading</div>
        );
    }

    return (
        <>
            {hasStartedProject ?
                renderProject()
                :
                <NoProjectView startProject={startProject}/>
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