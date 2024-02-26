import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";

export default function ProjectFinished({title, description, workLink, futureWorkLink}) {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <div style={style.projectFinishedContainer}>
            <div style={style.projectInfoContainer}>
                <Typography variant="h5">
                    {title}
                </Typography>
                <Typography variant="body1">
                    {description}
                </Typography>
                <Typography variant="body1">
                    Trabajo: <a href={workLink} target="_blank">{workLink}</a>
                </Typography>
                <Typography variant="body1">
                    Trabajo futuro: <a href={futureWorkLink} target="_blank">{futureWorkLink}</a>
                </Typography>
            </div>
        </div>
    );
}

const styles = (theme) => {
    return {
        projectFinishedContainer: {
            display: 'flex',
            gap: '15px',
            padding: '1rem',
            borderRadius: '5px',
            border: '#d3d3d3 solid',
            borderWidth: '2px',
            width: '1200px',
            height: "220px",
            borderLeft: "solid #ff9ef3 2rem"
        },
        projectInfoContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }
    }
}