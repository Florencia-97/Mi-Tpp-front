import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

export default function PendingOfApprovalView() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
            <div style={style.contentContainer}>
                <Typography variant="h6">
                    El proyecto está pendiente de revisión!
                </Typography>
                <Typography variant="body1">
                    Ya falta poco.
                </Typography>
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
        }
    }
}