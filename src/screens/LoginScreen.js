import React, {useEffect, useState} from "react";
import {useTheme} from "@emotion/react";
import {Typography} from "@mui/material";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import User from "../app/User";
import {useNavigate} from "react-router-dom";


export default function LoginScreen({app}) {
    const theme = useTheme();
    const [user, setUser] = useState([]);
    const navigation = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then(async (res) => {
                        const appUser = new User({
                            email: res.data.email,
                            name: res.data.name,
                            picture: res.data.picture,
                        });
                        await app.loginUser(appUser, user.access_token);
                        navigation('/home');
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    const style = styles(theme);


    return (
        <main>
            <section style={style.mainContainer}>
                <div style={style.leftContainer}>

                </div>
                <div style={style.rightContainer}>
                    <Typography variant="h3"> Mi TPP </Typography>
                    <button onClick={() => login()}>Sign in with Google 🚀</button>
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
}