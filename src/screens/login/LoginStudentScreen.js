import React from "react";
import {useTheme} from "@emotion/react";
import {Button, Typography} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";


export default function LoginStudentScreen({app}) {
    const theme = useTheme();
    const navigation = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const appUser = await app.apiClient().loginUser(codeResponse.access_token);
            appUser.setRole('STUDENT');
            await app.loginUser(appUser, codeResponse.access_token);
            navigation('/home');
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const register = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const appUser = await app.apiClient().registerUser(codeResponse.access_token);
            await app.loginUser(appUser, codeResponse.access_token);
            navigation('/home');
        },
        onError: (error) => console.log('Register Failed:', error)
    });

    const style = styles(theme);

    return (
        <main>
            <section style={style.mainContainer}>
                <div style={style.leftContainer}>

                </div>
                <div style={style.rightContainer}>
                    <Typography variant="h4"> Mi TPP </Typography>
                    <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
                        <Button style={{color: 'white', backgroundColor: theme.palette.primary.main, width: '100%'}}
                                variant={'outlined'} onClick={() => login()}>
                            Ingresá con Google
                        </Button>
                        <Button style={{color: theme.palette.primary.main, width: '100%'}} variant={'outlined'}
                                onClick={() => register()}>
                            registrate
                        </Button>
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
        },
        rightContainer: {
            backgroundColor: theme.palette.background.default,
            flex: 1,
            gap: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
}