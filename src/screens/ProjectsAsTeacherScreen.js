import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import ProjectItemList from "../components/ProjectItemList";
import {useNavigate} from "react-router-dom";

function ProjectsAsTeacherScreen({app}) {
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
    const response = await app.apiClient().getTeacherProjects(errorHandler);
    if (!response.hasError()) {
      setProjects(response.projects());
    }
  }

  return (
    <>
      <div style={style.barContainer}>
        <Typography variant="h5">
          Tus proyectos
        </Typography>
      </div>
      <div style={style.projectListContainer}>
        {projects.map(
          project => {
            return (
              <div style={style.projectContainer}>
                <ProjectItemList project={project} goToProject={
                  (id) => {
                    navigate('/see_project/' + id)
                  }
                }/>
              </div>
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
    },
    projectContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '1rem',
    }
  }
}

export default observer(ProjectsAsTeacherScreen);