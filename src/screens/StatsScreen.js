import {useTheme} from "@emotion/react";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import {useEffect} from "react";
import {Typography} from "@mui/material";


export default function StatsScreen({app}) {
  const theme = useTheme();

  useEffect(
    () => {
      app.apiClient().getStats().then((response) => {
        console.log(response.stats());
      }).catch((error) => {
        console.log(error)
      })
    }, []
  )

  const style = styles(theme);

  return (
    <>
      <div style={style.barContainer}>
        <Typography variant="h5" style={{flex: 1}}>
          Estadísticas
        </Typography>
      </div>
      <section style={style.mainContainer}>
        {/*Poner la aclaración de los gráficos así queda más lindo ?*/}
        <HorizontalBarChart name={"Ideas más comentadas"}/>
        <HorizontalBarChart name={"Promedio estados"}/>
        <HorizontalBarChart name={"Tags más populares"}/>
        <HorizontalBarChart name={"Cantidad por estado"}/>
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