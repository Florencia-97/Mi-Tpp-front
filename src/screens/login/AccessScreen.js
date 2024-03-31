import React from "react";
import {useTheme} from "@emotion/react";
import {Button, Typography} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import User from "../../app/User";


export default function AccessScreen({app}) {
    const theme = useTheme();
    const navigator = useNavigate();
    const [userLogin, setUserLogin] = React.useState('STUDENT');

    const roleOptions = ['STUDENT', 'TEACHER', 'ADMIN'];
    const otherRoleOptions = roleOptions.filter(role => role !== userLogin);

    const access = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const response = await app.apiClient().accessUser(codeResponse.access_token, userLogin);

            const appUser = new User({
                email: response.email(),
                name: response.username(),
                picture: response.picture(),
                canOperate: response.canUserOperate(),
                role: userLogin
            })
            await app.loginUser(appUser, response.token());
            navigator('/public_ideas');
        },
        onError: (error) => console.log('Register Failed:', error)
    });

    const style = styles(theme);

    return (
        <main>
            <section style={style.mainContainer}>
                <div style={style.leftContainer}>
                    <Typography variant="h3" style={{color: '#c7c7c7'}} fontWeight={'900'}>
                        {userLogin === 'STUDENT' ? 'Alumnos' : userLogin === 'TEACHER' ? 'Profesores' : 'Administradores'}
                    </Typography>
                </div>
                <div style={style.rightContainer}>
                    <Typography variant="h4"> Mi TPP </Typography>
                    <div>
                        <Button style={{color: 'white', backgroundColor: theme.palette.primary.main, width: '100%'}}
                                variant={'outlined'} onClick={() => access()}>
                            Accedé con Google
                        </Button>
                    </div>
                    <div style={style.optionsContainer}>
                        {otherRoleOptions.map(role => {
                            return <button onClick={() => setUserLogin(role)} style={style.roleButton}>
                                Soy {role === 'STUDENT' ? 'Alumno' : role === 'TEACHER' ? 'Profesor' : 'Administrador'}
                            </button>
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

const styles = (theme) => {
    return {
        mainContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height: '100vh',
        },
        leftContainer: {
            backgroundColor: theme.palette.primary.main,
            background: "linear-gradient(90deg, rgba(84,66,142,1) 21%, rgba(221,67,67,1) 80%, rgba(219,182,130,1) 100%)",
            flex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1rem',
        },
        rightContainer: {
            backgroundColor: theme.palette.background.default,
            flex: 1,
            gap: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        optionsContainer: {
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        roleButton: {
            background: 'none',
            border: 'none',
            color: 'blue',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}