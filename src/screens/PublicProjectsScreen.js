import React, {useEffect} from "react";
import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";
import ProjectFinished from "../components/ProjectFinished";

// TODO: Design 404

export default function PublicProjectsScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);

    const [projects, setProjects] = React.useState([]);

    useEffect(() => {
        app.apiClient().getPublicProjects().then((projects) => {
            setProjects(projects);
        });
    }, []);

    return (
        <main>
            <div style={style.header}>
                Fiuba
            </div>
            <Typography variant="body1">
                Explora todos los proyectos públicos de FIUBA.
            </Typography>
            <div style={style.projectsListContainer}>
                <ProjectFinished/>
                <ProjectFinished/>
                <ProjectFinished/>
                <ProjectFinished/>
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
        },
        projectsListContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            flexWrap: 'wrap',
            padding: '2rem'
        }
    }
}