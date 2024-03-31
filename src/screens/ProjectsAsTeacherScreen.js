import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import ProjectItemList from "../components/ProjectItemList";
import {useNavigate} from "react-router-dom";

function ProjectsAsRoleScreen({app, asSupervisor, key}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([])
  const style = styles(theme);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const errorHandler = (error) => {
      setProjects([]);
    }
    let response;
    if (asSupervisor) {
      response = await app.apiClient().getSupervisorProjects(errorHandler);
    } else {
      response = await app.apiClient().getTeacherProjects(errorHandler);
    }
    if (!response.hasError()) {
      const _projects = response.projects();
      if (_projects[0]) {
        setProjects(_projects);
      } else {
        setProjects([]);
      }
    }
  }

  return (
    <>
      <div style={style.barContainer} key={key}>
        <Typography variant="h5">
          Tus proyectos {asSupervisor ? "como supervisor" : "como tutor/ co-tutor"}
        </Typography>
      </div>
      <div style={style.projectListContainer}>
        {projects.map(
          project => {
            return (
              <ProjectItemList project={project} goToProject={
                (id) => {
                  navigate('/see_project/' + id)
                }
              }/>
            )
          }
        )}
      </div>
    </>
  );
}

const styles = (theme) => {
  return {
    barContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '1rem',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projectListContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: '15px'
    }
  }
}

export default observer(ProjectsAsRoleScreen);