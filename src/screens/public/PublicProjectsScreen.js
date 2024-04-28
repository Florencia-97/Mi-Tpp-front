import React, {useEffect} from "react";
import {useTheme} from "@emotion/react";
import {TextField, Typography} from "@mui/material";
import ProjectFinished from "../../components/ProjectFinished";
import {useNavigate} from "react-router-dom";
import FillButton from "../../components/buttons/FillButton";


export default function PublicProjectsScreen({app}) {
  const theme = useTheme();
  const [projects, setProjects] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const navigator = useNavigate();

  const style = styles(theme);

  useEffect(() => {
    getProjects()
  }, []);

  const getProjects = () => {
    app.apiClient().getPublishedProjects(search).then((response) => {
      setProjects(response.project());
    });
  }

  const searchBarContainer = () => {
    return (
      <div style={style.searchBarContainer}>
        <TextField
          style={{background: 'white'}}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Buscar proyecto"/>
        <FillButton onClick={getProjects}
                    label={"Buscar"}/>
      </div>
    )
  }

  return (
    <main>
      <div style={style.header}>
        Faculta de Ingeniería de la Universidad de Buenos Aires
      </div>
      <div style={style.mainContainer}>
        <Typography variant="h6">
          Explora todos los proyectos públicos de FIUBA.
        </Typography>
        {searchBarContainer()}
        <div style={style.projectsListContainer}>
          {projects.map((project) => {
            return (
              <ProjectFinished
                key={project.id}
                title={project.title}
                onClick={() => navigator('/see-public-project/' + project.id)}
                description={project.description}
                workLink={project.link_to_project}
                futureWorkLink={project.link_to_future_work}
              />
            );
          })}
        </div>
      </div>
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
      padding: '0 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    projectsListContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      flexWrap: 'wrap',
    },
    searchBarContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '2rem',
      padding: '1rem',
      borderRadius: '5px',
      background: 'rgb(226 226 226)',
    }
  }
}