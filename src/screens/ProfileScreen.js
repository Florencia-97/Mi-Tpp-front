import {useTheme} from "@emotion/react";
import {Avatar, Button, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";


export default function ProfileScreen({app}) {
    const theme = useTheme();
    const [user, setUser] = useState(undefined);
    const [career, setCareer] = useState('');

    useEffect(
        () => {
            app.apiClient().getUserProfile(app.currentUser().email()).then(response => {
                const user = response.user();
                setUser(user);
                setCareer(user.career);
            })
        }, []
    )

    const style = styles(theme);

    if (!user) {
        return (
            <div>Cargando...</div>
        )
    }

    const updateProfile = async () => {
        const response = await app.apiClient().updateUserProfile(user.email, career);
        setUser(response.user());
    }

    return (
        <>
            <div style={style.mainContainer}>
                <div style={style.profileContainer}>
                    <Button variant="contained" color="primary" style={style.updateBtn} onClick={updateProfile}>
                        Actualizar
                    </Button>
                    <div style={style.leftContainer}>
                        <Avatar alt="Remy Sharp" src={user.picture} style={{width: '150px', height: '150px'}}/>
                        <Typography variant="body1">
                            {user.email}
                        </Typography>
                    </div>
                    <div style={style.rightContainer}>
                        <TextField fullWidth label="Nombre" value={user.username}/>
                        <TextField fullWidth label="Apellido" value={user.username}/>
                        <TextField fullWidth label="Carrera" value={career} onChange={
                            (event) => {
                                setCareer(event.target.value);
                            }
                        }/>
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
            flex: 1
        },
        rightContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            flex: 1
        },
        updateBtn: {
            position: 'absolute',
            top: '2rem',
            right: '2rem'
        }
    }
}