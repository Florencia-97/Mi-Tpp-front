import {Button, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import ValidateActionTextDialog from "../../components/dialogs/ValidateActionTextDialog";

export default function PendingOfRevisionView({app, isStudent, approveProject}) {
    const theme = useTheme();
    const style = styles(theme);

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
            <ValidateActionTextDialog buttonLabel="Aprobar" actionLabel={"aprobar"}
                                      acceptBtnLabel={"aprobar"} onAccept={() => approveProject()}/>
        );
    }

    const teacherView = () => {
        return (
            <div style={style.teacherContentContainer}>
                {approveBtn()}
            </div>
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
        }
    }
}