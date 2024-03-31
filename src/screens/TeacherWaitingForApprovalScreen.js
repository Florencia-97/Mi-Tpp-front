import React from "react";
import {Typography} from "@mui/material";
import {useTheme} from "@emotion/react";
import OutlineButton from "../components/buttons/OutlineButton";


export default function TeacherWaitingForApprovalScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);
    return (
        <main style={style.mainContainer}>
            <div className="loader"></div>
            <div style={style.textContainer}>
                <Typography variant="h5" color={'white'}>
                    Esperando aprobación
                </Typography>
                <Typography variant="body1" color={'white'}>
                    Tu cuenta será revisada por un administrador y confirmada lo antes posible!
                </Typography>
                <OutlineButton onClick={() => app.logoutUser()} label={'Cerrar sesión'} styles={{color: 'white'}}/>
            </div>
        </main>
    )
}

const styles = (theme) => {
    return {
        mainContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            gap: '35px',
            backgroundColor: theme.palette.primary.main
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px'
        }
    }
}