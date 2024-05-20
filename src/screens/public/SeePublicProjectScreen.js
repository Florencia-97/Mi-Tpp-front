import React, {useEffect} from "react";
import {useTheme} from "@emotion/react";
import {useParams} from "react-router-dom";
import {Box, Chip, Typography} from "@mui/material";
import OutlineButton from "../../components/buttons/OutlineButton";


export default function SeePublicProjectScreen({app}) {
  const theme = useTheme();
  let {id} = useParams();
  const style = styles(theme);

  const [project, setProject] = React.useState(undefined);

  useEffect(() => {
    app.apiClient().getPublishedProject(id).then((response) => {
      setProject(response.project());
    });
  }, [id]);

  const renderTags = (tags) => {
    return tags.map((tag) => {
      return (
        <Chip
          style={{width: 'fit-content'}}
          label={tag}
        />
      )
    });
  }

  const renderProject = () => {
    const students = project.students.join(', ');
    const professors = project.professors.join(', ');
    return (
      <div style={style.mainContainer}>
        <h1>{project.title}</h1>
        <Box sx={{display:'flex', gap:'10px'}}>
          {renderTags(project.tags)}
        </Box>
        <Typography variant="body1">
          {project.description}
        </Typography>
        <Typography variant="body1">
          <b>Alumnos:</b> {students} <br/>
          <b>Profesores:</b> {professors}
        </Typography>
      </div>
    )
  }

  const returnButton = () => {
    return (
      <OutlineButton onClick={() => window.history.back()}
                     label={"Volver"}/>
    )
  }

  return (
    <main>
      <div style={style.header}>
        Faculta de Ingeniería de la Universidad de Buenos Aires
      </div>
      <section style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {project && renderProject()}
        <div>
          {returnButton()}
        </div>
      </section>
    </main>
  )
}

const styles = (theme) => {
  return {
    header: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '4rem',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      fontSize: '1.5rem',
      padding: '0 2rem',
      marginBottom: '2rem'
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      background: 'rgb(226 226 226)',
      padding: '2rem',
      borderRadius: '5px',
    },
    projectsListContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      flexWrap: 'wrap',
    }
  }
}