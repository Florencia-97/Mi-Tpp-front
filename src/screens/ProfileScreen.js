import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";


export default function ProfileScreen() {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
                <Typography>Tu perfil</Typography>
        </>
    );
}

const styles = (theme) => {
    return {
        ideasBarContainer: {
            backgroundColor: theme.palette.background.white,
        },
    }
}