import {useTheme} from "@emotion/react";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";


export default function StatsScreen({app}) {
  const theme = useTheme();
  const [stats, setStats] = useState({});

  useEffect(
    () => {
      app.apiClient().getStats().then((response) => {
        setStats(response.stats());
      }).catch((error) => {
        console.log(error)
      })
    }, []);

  const style = styles(theme);

  if (!stats) {
    return (
      <div>Cargando...</div>
    )
  }

  return (
    <>
      <div style={style.barContainer}>
        <Typography variant="h5" style={{flex: 1}}>
          Estadísticas
        </Typography>
      </div>
      <section style={style.mainContainer}>
        <HorizontalBarChart key={'1-chart'} name={"Ideas más comentadas"} data={stats.most_commented_ideas}/>
        <HorizontalBarChart name={"Promedio estados"} data={stats.mean_time_diff}/>
        <HorizontalBarChart name={"Tags más populares"} data={stats.top_tags}/>
        <HorizontalBarChart name={"Cantidad por estado"} data={stats.projects_by_status}/>
      </section>
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
    },
    chartsContainer: {
      display: 'flex',
      flexDirection: 'row',
      wrap: 'wrap',
    },
    barContainer: {
      backgroundColor: theme.palette.background.white,
      width: '100%',
      padding: '1rem',
      borderRadius: '5px',
      alignItems: 'center',
    }
  }
}