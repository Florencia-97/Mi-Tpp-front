import {Alert, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import {useState} from "react";
import FillButton from "../../components/buttons/FillButton";
import ProjectFinished from "../../components/ProjectFinished";

export default function FinishedView({publishProject, updateProjectToPublish, isStudent, project}) {
  const theme = useTheme();
  // Form
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [linkToProject, setLinkToProject] = useState(project.link_to_project);
  const [linkToFutureWork, setLinkToFutureWork] = useState(project.link_to_future_work);
  // Alert
  const [alert, setAlert] = useState({message: '', type: ''});

  const style = styles(theme);

  const publishBtn = () => {
    const _publishProject = async () => {
      await publishProject();
    }
    return (
      <ValidateActionTextDialog buttonLabel="Publicar" actionLabel={"querés publicar el proyecto"}
                                acceptBtnLabel={"publicar"} onAccept={_publishProject}/>
    );
  }

  const showSuccessAlert = (message) => {
    setAlert({message: message, type: 'success'});
  }

  const showErrorAlert = (message) => {
    setAlert({message: message, type: 'error'});
  }

  const saveBtn = () => {
    const _updateProject = async () => {
      await updateProjectToPublish(title, description, linkToProject, linkToFutureWork);
      showSuccessAlert('Información guardada correctamente!');
    }
    return (
      <FillButton label="Guardar"
                  disabled={title === '' || description === '' || linkToProject === '' || linkToFutureWork === ''}
                  onClick={_updateProject}/>
    );
  }

  const textField = (label, value, onChange, maxLenght, isMultiline = false, rows = 1) => {
    return (
      <TextField required
                 label={label}
                 key={label}
                 multiline={isMultiline} rows={rows}
                 fullWidth
                 inputProps={{maxLength: maxLenght}}
                 onChange={(event) => onChange(event.target.value)}
                 value={value}/>
    );
  }

  const textFieldDisabled = (label, field, isMultiline = false, rows = 1) => {
    return (
      <TextField required label={label}
                 multiline={isMultiline} rows={rows}
                 fullWidth
                 disabled={true}
                 value={project[field]}/>
    );
  }

  const readProjectInfo = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', gap: '15px', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', flex: 1}}>
          {textFieldDisabled('Título del proyecto', 'title')}
          {textFieldDisabled('Link al trabajo', 'link_to_project')}
          {textFieldDisabled('Link al trabajo futuro', 'link_to_future_work')}
        </div>
        <div style={{flex: 1}}>
          {textFieldDisabled('Descripción del proyecto', 'description', true, 4)}
        </div>
      </div>
    );
  }

  const editProjectInfo = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', gap: '15px', width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px', flex: 1}}>
          {textField('Título del proyecto', title, setTitle, 50)}
          {textField('Link al trabajo', linkToProject, setLinkToProject, 50)}
          {textField('Link al trabajo futuro', linkToFutureWork, setLinkToFutureWork, 50)}
        </div>
        <div style={{flex: 1}}>
          {textField('Descripción del proyecto', description, setDescription, 250, true, 4)}
        </div>
      </div>
    );
  }

  const studentView = () => {
    return (
      <>
        <div style={style.contentContainer}>
          <div style={style.headerContainer}>
            <Typography variant="h5">
              Felicitaciones por terminar tu proyecto!
            </Typography>
            {project.status === 'GRADED' && saveBtn()}
          </div>
          {alert.message !== '' ?
            <Alert severity={alert.type} variant="outlined" onClose={() => setAlert({message: '', type: ''})}>
              {alert.message}
            </Alert> :
            <></>
          }
          <div style={style.gradeContainer}>
            <Typography variant="h6">
              Nota del profesor:
            </Typography>
            {project.grade_comment}
          </div>
          {
            project.status === 'PUBLISHED' ?
              <Typography variant="body1">
                El proyecto ya ha sido publicado.
              </Typography> :
              <Typography variant="body1">
                Te pedimos que completes un poco más de información para poder mostrar tu proyecto en la galería.
                De esta manera podremos mostrar tu trabajo a futuros estudiantes e interesados. Podés ver ejemplos
                siguiendo el link <a target='_blank' href={'http://localhost:3000/projects'}>Todos los proyectos</a>
              </Typography>
          }
          <Typography variant="body1">
            Cuando el profesor lo revise, podrás verlo en proyectos terminados.
          </Typography>
          {project.status === 'PUBLISHED' ? readProjectInfo(): editProjectInfo()}
          <Typography variant="h5">
            Preview
          </Typography>
          <ProjectFinished title={title}
                           description={description}
                           workLink={linkToProject}
                           futureWorkLink={linkToFutureWork}/>
        </div>
      </>
    );
  }

  const teacherView = () => {
    return (
      <>
        <div style={style.contentContainer}>
          <div style={style.headerContainer}>
            <Typography variant="h5">
              El trabajo ha terminado!
            </Typography>
            {project.status === 'GRADED' && publishBtn()}
          </div>
          {
            project.status === 'PUBLISHED' ?
              <Typography variant="body1">
                El proyecto ya ha sido publicado.
              </Typography> :
              <Typography variant="body1">
                Cuando creas que la info está completa, podrás publicar el proyecto. El mismo se podra ver
                en el sitio público de FIUBA de trabajos profesionales.
              </Typography>
          }
          {readProjectInfo()}
        </div>
      </>
    );
  }


  return (
    <>
      {isStudent ? studentView() : teacherView()}
    </>
  );

}

const styles = (theme) => {
  return {
    contentContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '2rem',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      height: '100%'
    },
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    noProjectContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    },
    binnacleContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    binnacleEntryContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
      backgroundColor: 'yellow',
      padding: '1rem',
      borderRadius: '5px',
      width: 'fit-content'
    },
    gradeContainer: {
      background: '#d5d5d5',
      padding: '20px 25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }
  }
}