import {useTheme} from "@emotion/react";
import * as React from "react";
import {Button, Typography} from "@mui/material";
import {amountOfDaysInMonth, currentDay, currentMonth, currentMonthName, currentYear} from "../utils";
import IconButton from "./buttons/IconButton";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const addEmptyDaysTo = (days, amount) => {
    for (let i = 0; i < amount; i++) {
        days.unshift(null);
    }
}

export default function Calendar({dateSelectedChanged}) {
    const theme = useTheme();
    const [daySelected, setDaySelected] = React.useState(currentDay());
    const [monthSelected, setMonthSelected] = React.useState(currentMonth());
    const [yearSelected, setYearSelected] = React.useState(currentYear());
    const style = styles(theme);

    // Arrays with numbers one to 31
    const _amountOfDaysInMonth = amountOfDaysInMonth(monthSelected, yearSelected);
    const days = Array.from(Array(_amountOfDaysInMonth).keys()).map(i => i + 1);
    addEmptyDaysTo(days, new Date(currentYear(), currentMonth(), 1).getDay());

    const onDaySelected = (day) => {
        setDaySelected(day);
        dateSelectedChanged(day, monthSelected, yearSelected);
    }

    const renderDayCell = (day) => {
        let dayStyle = style.dayContainer;
        if (day === daySelected) {
            dayStyle = {...dayStyle, backgroundColor: theme.palette.secondary.main}
        }
        if (!day) {
            return (
                <div style={style.emptyDayContainer}></div>
            )
        }
        return (
            <Button style={dayStyle} onClick={() => onDaySelected(day)}>
                <Typography style={{color: 'white'}}>{day}</Typography>
            </Button>
        )
    }

    const goBackMonth = async () => {
        if (monthSelected === 0) {
            setMonthSelected(11);
            setYearSelected(yearSelected - 1);
        } else {
            setMonthSelected(monthSelected - 1);
        }
    }

    const goForwardMonth = async () => {
        if (monthSelected === 11) {
            setMonthSelected(0);
            setYearSelected(yearSelected + 1);
        } else {
            setMonthSelected(monthSelected + 1);
        }
    }

    const getMonthSelectedName = () => {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return months[monthSelected];
    }

    return (
        <div style={style.mainContainer}>
            <div>
                <div style={style.calendarHeader}>
                    <IconButton icon={<ArrowBackIosIcon/>} onClick={goBackMonth}/>
                    <h3>{getMonthSelectedName()} {yearSelected}</h3>
                    <IconButton icon={<ArrowForwardIosIcon/>} onClick={goForwardMonth}/>
                </div>
                <div style={style.calendarDays}>
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(day => {
                        return (
                            <Typography style={{textAlign: 'center'}}>{day}</Typography>
                        )
                    })}
                </div>
                <div style={style.calendarDays}>
                    {days.map(day => {
                        return (
                            renderDayCell(day)
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

const styles = (theme) => {
    return {
        mainContainer: {
            backgroundColor: theme.palette.background.white,
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '400px',
            minHeight: '300px',
        },
        calendarHeader: {
            display: 'flex',
            marginBottom: '1rem',
            justifyContent: 'space-between',
        },
        calendarDays: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '10px'
        },
        dayContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            width: '50px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.white,
            fontWeight: '700'
        },
        emptyDayContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            width: '50px',
        }
    }
}
