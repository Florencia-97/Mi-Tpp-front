import {BarChart} from "@mui/x-charts/BarChart";

const chartSetting = {
    xAxis: [
        {
            label: 'cantidad',
        },
    ],
    width: 500,
    height: 400,
};

const dataset = [
    {
        value: 54,
        name: 'Apr',
    },
    {
        value: 57,
        name: 'May',
    },
    {
        value: 60,
        name: 'June',
    },
    {
        value: 59,
        name: 'July',
    },
    {
        value: 61,
        name: 'Dec',
    },
];

const valueFormatter = (value) => `${value}mm`;

export default function HorizontalBarChart({name}) {
    return (
        <BarChart
            dataset={dataset}
            yAxis={[{scaleType: 'band', dataKey: 'name'}]}
            series={[{dataKey: 'value', label: name, valueFormatter}]}
            layout="horizontal"
            {...chartSetting}
        />
    );
}