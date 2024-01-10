import moment from 'moment';

export interface DateRange {
  from: Date | null,
  to: Date | null,
}

// Função para obter o período de hoje
export function getTodayPeriod(): DateRange {
  const now = moment();
  const from = now.clone().startOf('day').toDate();
  const to = now.clone().endOf('day').toDate();
  return { from, to };
}

// Função para obter o período de ontem
function getYesterdayPeriod(): DateRange {
  const now = moment();
  const from = now.clone().subtract(1, 'day').startOf('day').toDate();
  const to = now.clone().subtract(1, 'day').endOf('day').toDate();
  return { from, to };
}

// Função para obter o período dos últimos 7 dias
function getLast7DaysPeriod(): DateRange {
  const now = moment();
  const from = now.clone().subtract(6, 'days').startOf('day').toDate();
  const to = now.toDate();
  return { from, to };
}

// Função para obter o período dos últimos 30 dias
function getLast30DaysPeriod(): DateRange {
  const today = moment();
  const from = today.clone().subtract(29, 'days').startOf('day').toDate();
  const to = today.toDate();
  return { from, to };
}

// Função para obter o período deste mês
function getThisMonthPeriod(): DateRange {
  const today = moment();
  const from = today.clone().startOf('month').toDate();
  const to = today.toDate();
  return { from, to };
}

// Função para obter o período do último mês
function getLastMonthPeriod(): DateRange {
  const today = moment();
  const from = today.clone().subtract(1, 'month').startOf('month').toDate();
  const to = today.clone().subtract(1, 'month').endOf('month').toDate();
  return { from, to };
}

// Função para obter o período deste ano
function getThisYearPeriod(): DateRange {
  const today = moment();
  const from = today.clone().startOf('year').toDate();
  const to = today.toDate();
  return { from, to };
}

// Função para obter o período do último ano
function getLastYearPeriod(): DateRange {
  const today = moment();
  const from = today.clone().subtract(1, 'year').startOf('year').toDate();
  const to = today.clone().subtract(1, 'year').endOf('year').toDate();
  return { from, to };
}

/* Função para formatar um date range para  
o modelo utilizado nos snapshots e popover */
export function formatPeriodToSnapshot(
  dateFrom: string,
  timeFrom: string,
  dateTo: string,
  timeTo: string,
) {
  const dateTimeFormat = "DD/MM/YYYY HH:mm:ss.SSS"

  const startDateString = dateFrom + " " + timeFrom;
  const endDateString = dateTo + " " + timeTo;

  const startDateMoment = moment(startDateString, dateTimeFormat);
  const endDateMoment = moment(endDateString, dateTimeFormat);
  
  const dateRangeString =
    startDateMoment.format("DD-MM-YYYY HH:mm:ss.SSS")
    + " - "
    + endDateMoment.format("DD-MM-YYYY HH:mm:ss.SSS");

  return dateRangeString
}

export const preSelectedPeriods = [
  {
    id: 1,
    label: "Hoje",
    action: getTodayPeriod,
  },
  {
    id: 2,
    label: "Ontem",
    action: getYesterdayPeriod,
  },
  {
    id: 3,
    label: "Últimos 7 dias",
    action: getLast7DaysPeriod,
  },
  {
    id: 4,
    label: "Últimos 30 dias",
    action: getLast30DaysPeriod,
  },
  {
    id: 5,
    label: "Este mês",
    action: getThisMonthPeriod,
  },
  {
    id: 6,
    label: "Último mês",
    action: getLastMonthPeriod,
  },
  {
    id: 7,
    label: "Este ano",
    action: getThisYearPeriod,
  },
  {
    id: 8,
    label: "Último ano",
    action: getLastYearPeriod,
  }
]
