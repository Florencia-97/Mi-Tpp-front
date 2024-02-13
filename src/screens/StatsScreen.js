import {useTheme} from "@emotion/react";


export default function StatsScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
            <div style={style.mainContainer}>
                tbd
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
        }
    }
}