import React, {useEffect} from "react";
import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";
import ProjectFinished from "../components/ProjectFinished";


export default function PublicProjectsScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);

    const [projects, setProjects] = React.useState([]);

    useEffect(() => {
        app.apiClient().getPublishedProjects().then((response) => {
            setProjects(response.projects());
        });
    }, []);

    return (
        <main>
            <div style={style.header}>
                Fiuba
            </div>
            <div style={style.mainContainer}>
                <Typography variant="body1">
                    Explora todos los proyectos públicos de FIUBA.
                </Typography>
                <div style={style.projectsListContainer}>
                    {projects.map((project) => {
                        return (
                            <ProjectFinished
                                key={project.id}
                                title={project.title}
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
        }
    }
}