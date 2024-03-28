import {Avatar, TextField, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";
import {useEffect, useState} from "react";
import AddStudentToProjectModal from "./AddStudentToProjectModal";

export default function PendingOfProposalView({app, presentProposal}) {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [tags, setTags] = useState('');

  const [possibleStudents, setPossibleStudents] = useState([]);

  useEffect(() => {
    app.apiClient().getStudentsWithoutProjects().then((response) => {
      setPossibleStudents(response.students());
    });
  }, []);

  useEffect(() => {
    app.apiClient().getTeachersToSelect().then((response) => {
      setPossibleStudents(response.students());
    });
  }, []);

  const style = styles(theme);
  const currentUser = app.currentUser();

  const presentBtn = () => {
    const _students = [...students, {email:currentUser.email()}];
    const onAccept = async () => {
      const project = {
        title: title,
        description: description,
        tags: 'hola,chau',
        students: _students.map(s => s.email).join(','),
        professors: teachers.map(t => t.email).join(','),
        link: link
      }
      await app.apiClient().createProject(project);
      presentProposal();
    }

    return (
      <ValidateActionTextDialog buttonLabel="Lista para presentar" actionLabel={"presentar"}
                                acceptBtnLabel={"presentar"} onAccept={onAccept}/>
    );
  }

  const onAddStudent = (student) => {
    setStudents([...students, student]);
  }

  const renderPerson = (person) => {
    const name = person.username.split(' ')[0].substring(0, 5);
    return (
      <div style={style.personContainer}>
        <Avatar alt="Remy Sharp" src={person.picture}/>
        <Typography style={{fontSize: "12px"}}>
          {name}
        </Typography>
      </div>
    );
  }

  const renderStudents = () => {

    return (
      <div style={style.personsContainer}>
        {renderPerson({picture: currentUser.picture(), username: currentUser.name()})}
        {students.map((student) => renderPerson(student))}
        <div style={style.personContainer}>
          <AddStudentToProjectModal options={possibleStudents} onAdd={onAddStudent}/>
        </div>
      </div>
    );
  }

  const onAddTeacher = (teacher) => {
    setTeachers([...teachers, teacher]);
  }

  const renderTeachers = () => {
    return (
      <div style={style.personsContainer}>
        {teachers.map((student) => renderPerson(student))}
        <div style={style.personContainer}>
          <AddStudentToProjectModal options={possibleStudents} onAdd={onAddTeacher} type={'Tutor/Co-Tutor'}/>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={style.contentContainer}>
        <div style={style.headerContainer}>
          <Typography variant="h5">
            Pendiente de propuesta
          </Typography>
          {presentBtn()}
        </div>
        <TextField id="project-title" label="Titulo" variant="outlined" onChange={
          (e) => setTitle(e.target.value)}
        />
        <TextField id="description" label="Breve descripción" multiline rows={3} variant="outlined" onChange={
          (e) => setDescription(e.target.value)}
        />
        <TextField id="drive-link" label="Link Drive" variant="outlined" onChange={
          (e) => setLink(e.target.value)}
        />
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{flex: 1}}>
            <Typography variant="h6">
              Alumnos
            </Typography>
            {renderStudents()}
          </div>
          <div style={{flex: 1}}>
            <Typography variant="h6">
              Tutor/co-tutor
            </Typography>
            {renderTeachers()}
          </div>
        </div>
      </div>
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
      height: "fit-content",
      gap: '15px'
    },
    headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: "1rem 0"
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
    personsContainer: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    personContainer: {
      borderRadius: "5px",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "140px",
      width: "120px",
      backgroundColor: "#dddddd",
      display: "flex",
      gap: "5px",
    }
  }
}