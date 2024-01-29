import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

export default function BinnacleView() {
    const theme = useTheme();
    const style = styles(theme);

    const binnacle = () => {
        const binnacleEntries = [
            {text: "Se creó el proyecto", date: "12/10/2021"},
            {text: "Juntada", date: "12/11/2021"},
        ]
        return binnacleEntries.map(binnacle => {
            return (
                <div style={style.binnacleEntryContainer}>
                    <Typography variant="body1">
                        {binnacle.text}
                    </Typography>
                    <Typography variant="body1">
                        {binnacle.date}
                    </Typography>
                </div>
            )
        });
    }

    return (
        <>
            <div style={style.contentContainer}>
                <Typography variant="h5">
                    Bitácora
                </Typography>
                <div style={style.binnacleContainer}>
                    {binnacle()}
                </div>
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
            height: '250px'
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