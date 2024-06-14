import {useTheme} from "@emotion/react";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import HorizontalBarChart2 from "../components/charts/HorizontalBarChart2";
import DoughnutChart from "../components/charts/DoughnutChart";

export default function StatsScreen({app}) {
  const theme = useTheme();
  const [stats, setStats] = useState(undefined);

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
        <HorizontalBarChart2 name={"Promedio en espera de etapa de proyectos"} dataDict={stats.mean_time_diff} label={"Días"}/>
        <HorizontalBarChart2 name={"Tags más populares"} dataDict={stats.top_tags}/>
        <DoughnutChart name={"Cantidad de proyectos por estado"} dataDict={stats.projects_by_status}/>
        <HorizontalBarChart2 name={"Ideas más comentadas"} dataDict={stats.most_commented_ideas}/>
      </section>s
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