import {TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import {useState} from "react";
import FillButton from "../../components/buttons/FillButton";
import RenderChips from "../../components/RenderChips";

export default function PendingOfRevisionView({
                                                app,
                                                project,
                                                isStudent,
                                                approveProject,
                                                declineProject,
                                                onlyLecture = false
                                              }) {
  const theme = useTheme();
  const [supervisor, setSupervisor] = useState(project.supervisor);
  const style = styles(theme);
  const currentUserEmail = app.currentUser().email();

  const studentView = () => {
    return (
      <div style={style.contentContainer}>
        <Typography variant="h6">
          Tu proyecto está en revisión!
        </Typography>
        <Typography variant="body1">
          Cuando el proyecto sea aprobado, se te notificará por mail y podrás verlo en la sección de
          desarrollo.
        </Typography>
      </div>
    )
  }

  const approveBtn = () => {
    return (
      <ValidateActionTextDialog buttonLabel="avanzar a desarrollo"
                                actionLabel={"querés aprobar esta propuesta de trabajo profesional"}
                                acceptBtnLabel={"avanzar"} onAccept={() => approveProject()}/>
    );
  }

  const denyBtn = () => {
    return (
      <ValidateActionTextDialog buttonLabel="rechazar esta propuesta"
                                fillButton={false}
                                actionLabel={"querés rechazar esta propuesta de trabajo profesional"}
                                acceptBtnLabel={"rechazar"} onAccept={() => declineProject()}/>
    );
  }

  const addSupervisor = async () => {
    await app.apiClient().addSupervisorToProject(project.id, supervisor);
    // TODO: Add alert?
  }

  const renderAddSupervisor = () => {
    if (onlyLecture) {
      return (
        <Typography variant="body1">
          Supervisor: {project.supervisor}
        </Typography>
      )
    }
    return (
      <div key={"add-supervisor"} style={style.teacherContentContainer}>
        <Typography variant="body1">
          Podés sumar el mail del supervisor de este proyecto. El mismo podrá ver y avanzar el proyecto.
        </Typography>
        <div style={style.supervisorContainer}>
          <TextField value={supervisor}
                     onChange={(e) => {
                       setSupervisor(e.target.value)
                     }}
                     label="Sumar supervisor"
                     fullWidth/>
          <FillButton label="Guardar" onClick={addSupervisor}/>
        </div>
      </div>
    )
  }

  const renderReadField = (label, value) => {
    return (
      <div style={style.readFieldContainer}>
        <Typography variant="h7">{label}</Typography>
        <Typography variant="body1">
          {value}
        </Typography>
      </div>
    )
  }
  const teacherView = () => {
    return (
      <>
        {currentUserEmail !== project.supervisor ? renderAddSupervisor() : null}
        <div style={style.teacherContentContainer}>
          {renderReadField("Titulo", project.title)}
          {renderReadField("Descripcion", project.description)}
          {renderReadField("Link", <a href={project.link} target={'_blank'}>project.link</a>)}
          {renderReadField("Alumnos", project.students)}
          <div style={style.tagsContainer}>
            <Typography variant="h7">Tags</Typography>
            <RenderChips tags={project.tags}/>
          </div>
          {!onlyLecture && approveBtn()}
          {!onlyLecture && denyBtn()}
        </div>
      </>
    )
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
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      height: '100%'
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
    teacherContentContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '2rem',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      height: '100%'
    },
    supervisorContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '15px',
      alignItems: 'space-between'
    },
    readFieldContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '18px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }
}