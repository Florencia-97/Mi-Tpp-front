import {useTheme} from "@emotion/react";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";


export default function StatsScreen({app}) {
    const theme = useTheme();
    const style = styles(theme);

    return (
        <>
            <div style={style.mainContainer}>
                <section style={style.chartsContainer}>
                    <HorizontalBarChart name={"Ideas más comentadas"}/>
                    <HorizontalBarChart name={"Promedio estados"}/>
                    <HorizontalBarChart name={"Tags más populares"}/>
                    <HorizontalBarChart name={"Cantidad por estado"}/>
                </section>
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
        chartsContainer: {
            display: 'flex',
            flexDirection: 'row',
            wrap: 'wrap',
        }
    }
}