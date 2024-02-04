import {useTheme} from "@emotion/react";
import {Avatar, Button, TextField, Typography} from "@mui/material";


export default function ProfileScreen() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
            <div style={style.mainContainer}>
                <div style={style.profileContainer}>
                    <Button variant="contained" color="primary" style={style.updateBtn}>
                        Actualizar
                    </Button>
                    <div style={style.leftContainer}>
                        <Avatar alt="Remy Sharp" src="" style={{width: '150px', height: '150px'}}/>
                        <Typography variant="body1">
                            flrodriguez@fi.uba.ar
                        </Typography>
                    </div>
                    <div style={style.rightContainer}>
                        <TextField fullWidth label="Nombre"/>
                        <TextField fullWidth label="Apellido"/>
                        <TextField fullWidth label="Carrera"/>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = (theme) => {
    return {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        profileContainer: {
            backgroundColor: theme.palette.background.white,
            width: '80%',
            padding: '2rem',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px',
            height: '80%',
            position: 'relative'
        },
        leftContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            flex:1
        },
        rightContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            flex:1
        },
        updateBtn: {
            position: 'absolute',
            top: '2rem',
            right: '2rem'
        }
    }
}