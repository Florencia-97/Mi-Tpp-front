import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import BinnacleView from "./BinnacleView";
import NoProjectView from "./NoProjectView";
import PendingOfProposalView from "./PendingOfProposalView";
import PendingOfRevisionView from "./PendingOfRevisionView";
import PendingOfApprovalView from "./PendingOfApprovalView";
import FinishedView from "./FinishedView";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import StepsProjectState from "../../components/projects/StepsProjectState";


export default function ProjectsScreen({app}) {
  const theme = useTheme();
  const [hasStartedProject, setHasStartedProject] = useState(false); // false
  const [project, setProject] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  let {id} = useParams();
  const style = styles(theme);

  const isStudent = app.currentUser().isStudent();
  const stepsDic = {
    'INITIAL': 0,
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
    app.apiClient().getProjectInfoForTeacher(id).then((response) => {
      setHasStartedProject(true);
      const project = response.project();
      setProject(project);
      setCurrentStep(stepsDic[project.status]);
      setHasStartedProject(true);
    }).catch((_) => {
      setHasStartedProject(false);
    }).finally(
      () => setLoading(false)
    )
  }

  const getProjectForStudent = async () => {
    setLoading(true);
    app.apiClient().getProjectInfoForStudent().then((response) => {
      const project = response.project();
      if (project.status) {
        setProject(project);
        setCurrentStep(stepsDic[project.status]);
        setHasStartedProject(true);
      } else {
        setHasStartedProject(false);
        setCurrentStep(0);
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

  const declineProject = async (comment) => {
    await app.apiClient().declineProject(project.id, comment);
    navigator('/projects_list');
  }

  const updateProjectToPublish = (title, description, linkToProject, linkToFutureWork) => {
    app.apiClient().updateProjectToPublishProject(project.id, title, description, linkToProject, linkToFutureWork);
  }

  const updateProjectLink = async (link) => {
    app.apiClient().updateProjectLink(project.id, link);
  }

  const changeStep = (stepIndex) => {
    if (stepsDic[project.status] >= stepIndex && stepIndex != 3) {
      setCurrentStep(stepIndex);
    }
  }

  const onlyLecture = (stepIndex) => {
    return stepsDic[project.status] > stepIndex;
  }

  const renderProject = () => {
    return (
      <>
        <div style={style.ideasBarContainer}>
          <Typography variant="h5">
            {isStudent ? 'Tu proyecto' : 'Seguimiento de proyecto'}
          </Typography>
        </div>
        <StepsProjectState currentStep={currentStep}
                           projectStep={stepsDic[project.status]}
                           changeStep={changeStep}/>
        {currentStep === 0 ?
          <PendingOfProposalView app={app}
                                 project={project}
                                 onlyLecture={onlyLecture(currentStep)}
                                 onProposalPresented={updateProject}/>
          :
          currentStep === 1 ?
            <PendingOfRevisionView project={project}
                                   app={app}
                                   onlyLecture={onlyLecture(currentStep)}
                                   declineProject={declineProject}
                                   isStudent={isStudent}
                                   approveProject={async () => {
                                     await app.apiClient().approveProject(project.id);
                                     await updateProject();
                                   }}/>
            :
            currentStep === 2 ?
              <BinnacleView app={app} projectId={project.id}
                            onlyLecture={onlyLecture(currentStep)}
                            finishProject={async () => {
                              await app.apiClient().finishProject(project.id);
                              await updateProject();
                            }}/>
              :
              currentStep === 3 ?
                <PendingOfApprovalView project={project} updateProjectLink={updateProjectLink} isStudent={isStudent}
                                       gradeProject={
                                         async (comment) => {
                                           await app.apiClient().gradeProject(project.id, comment);
                                           await updateProject();
                                         }}/>
                : <FinishedView project={project} isStudent={isStudent}
                                updateProjectToPublish={updateProjectToPublish}
                                publishProject={publishProject}/>
        }
      </>
    )
  }

  if (loading) {
    // Todo: make nicer
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
    }
  }
}