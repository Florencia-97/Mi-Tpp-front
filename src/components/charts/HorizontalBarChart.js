import {BarChart} from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: 'cantidad',
    },
  ],
  width: 800,
  height: 400,
};



export default function HorizontalBarChart({name, data}) {
  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <BarChart
      dataset={data}
      yAxis={[{scaleType: 'band', dataKey: 'name'}]}
      series={[{dataKey: 'count', label: name}]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}