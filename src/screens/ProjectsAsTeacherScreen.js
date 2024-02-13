import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import {observer} from "mobx-react";
import {useEffect} from "react";


function ProjectsAsTeacherScreen({app}) {
    const theme = useTheme();

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        //const response = await app.apiClient().getTeacherProjects();
        return [];
    }


    const style = styles(theme);


    return (
        <>
            <div style={style.ideasBarContainer}>
                <Typography variant="h5">
                    Tus proyectos
                </Typography>
            </div>
            <div style={style.ideasContainer}>
                hola
            </div>
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
        ideasContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '15px'
        }
    }
}

export default observer(ProjectsAsTeacherScreen);