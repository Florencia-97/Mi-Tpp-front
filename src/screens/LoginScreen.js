import React from "react";
import {useTheme} from "@emotion/react";
import {Button, Typography} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import User from "../app/User";


export default function LoginScreen({app}) {
    const theme = useTheme();
    const navigation = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const appUser = await getUserProfile(codeResponse.access_token);
            console.log(appUser);
            //await app.apiClient().loginUser(appUser);
            await app.loginUser(appUser, codeResponse.access_token);
            navigation('/home');
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const register = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            const appUser = await getUserProfile(codeResponse.access_token);
            //await app.apiClient().registerUser(appUser);
            await app.loginUser(appUser, codeResponse.access_token);
            navigation('/home');
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const getUserProfile = async (accessToken) => {
        const response = await axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            });
        if (response.status !== 200) {
            throw new Error(`Error retrieving user profile: ${response.status}`);
        }
        const user = new User({
            email: response.data.email,
            name: response.data.name,
            picture: response.data.picture,
        });
        return user;
    }

    const style = styles(theme);

    return (
        <main>
            <section style={style.mainContainer}>
                <div style={style.leftContainer}>

                </div>
                <div style={style.rightContainer}>
                    <Typography variant="h4"> Mi TPP </Typography>
                    <Button variant={'outlined'} onClick={() => login()}>
                        Sign in with Google 🚀
                    </Button>
                    <Button onClick={() => register()}>
                        registrate
                    </Button>
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
            flex: 1,
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