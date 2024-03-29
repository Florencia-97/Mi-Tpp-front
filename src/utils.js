export function currentDay() {
  const date = new Date();
  return date.getDate();
}

export function currentMonth() {
  const date = new Date();
  return date.getMonth();
}

export function currentMonthName() {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return months[currentMonth()];
}

export function currentYear() {
  const date = new Date();
  return date.getFullYear();
}


export function amountOfDaysInMonth(monthNumber, year) {
  const date = new Date(year, monthNumber+1, 0);
  return date.getDate();
}
