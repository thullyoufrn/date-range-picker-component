import moment from 'moment'
import * as ReactDayPicker from 'react-day-picker'

// Função para obter o período de hoje
export function getTodayPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().startOf('day').toDate()
  const to = now.clone().endOf('day').toDate()
  return { from, to }
}

// Função para obter o período de ontem
function getYesterdayPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().subtract(1, 'day').startOf('day').toDate()
  const to = now.clone().subtract(1, 'day').endOf('day').toDate()
  return { from, to }
}

// Função para obter o período dos últimos 7 dias
function getLast7DaysPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().subtract(6, 'days').startOf('day').toDate()
  const to = now.toDate()
  return { from, to }
}

// Função para obter o período dos últimos 30 dias
function getLast30DaysPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(29, 'days').startOf('day').toDate()
  const to = today.toDate()
  return { from, to }
}

// Função para obter o período deste mês
function getThisMonthPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().startOf('month').toDate()
  const to = today.toDate()
  return { from, to }
}

// Função para obter o período do último mês
function getLastMonthPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(1, 'month').startOf('month').toDate()
  const to = today.clone().subtract(1, 'month').endOf('month').toDate()
  return { from, to }
}

// Função para obter o período deste ano
function getThisYearPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().startOf('year').toDate()
  const to = today.toDate()
  return { from, to }
}

// Função para obter o período do último ano
function getLastYearPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(1, 'year').startOf('year').toDate()
  const to = today.clone().subtract(1, 'year').endOf('year').toDate()
  return { from, to }
}

export function getDateWithCustomTime(date: Date, customTime: string): Date {
  const momentDate = moment(date)

  const momentWithTime = momentDate.set({
    hour: moment(customTime, 'HH:mm:ss.SSS').hour(),
    minute: moment(customTime, 'HH:mm:ss.SSS').minute(),
    second: moment(customTime, 'HH:mm:ss.SSS').second(),
    millisecond: moment(customTime, 'HH:mm:ss.SSS').millisecond(),
  })

  const resultDate = momentWithTime.toDate()

  return resultDate
}

// Função para formatar uma data para o modelo utilizado no popover
export function formatDate(date: Date): string {
  const formattedDate = moment(date).format('DD/MM/YYYY HH:mm:ss.SSS')
  return formattedDate
}

// Função para formatar um período para o modelo utilizado no popover
export function formatPeriod(period) {
  const dateFrom = moment(period?.from).format('DD/MM/YYYY')
  const timeFrom = moment(period?.from).format('HH:mm:ss.SSS')
  const dateTo = moment(period?.to).format('DD/MM/YYYY')
  const timeTo = moment(period?.to).format('HH:mm:ss.SSS')

  const dateTimeFormat = 'DD/MM/YYYY HH:mm:ss.SSS'

  const startDateString = dateFrom + ' ' + timeFrom
  const endDateString = dateTo + ' ' + timeTo

  const startDateMoment = moment(startDateString, dateTimeFormat)
  const endDateMoment = moment(endDateString, dateTimeFormat)

  const dateRangeString =
    startDateMoment.format('DD-MM-YYYY HH:mm:ss.SSS') +
    ' - ' +
    endDateMoment.format('DD-MM-YYYY HH:mm:ss.SSS')

  return dateRangeString
}

export const shortcutPeriods = [
  {
    id: 1,
    label: 'Hoje',
    generatePeriod: getTodayPeriod,
  },
  {
    id: 2,
    label: 'Ontem',
    generatePeriod: getYesterdayPeriod,
  },
  {
    id: 3,
    label: 'Últimos 7 dias',
    generatePeriod: getLast7DaysPeriod,
  },
  {
    id: 4,
    label: 'Últimos 30 dias',
    generatePeriod: getLast30DaysPeriod,
  },
  {
    id: 5,
    label: 'Este mês',
    generatePeriod: getThisMonthPeriod,
  },
  {
    id: 6,
    label: 'Último mês',
    generatePeriod: getLastMonthPeriod,
  },
  {
    id: 7,
    label: 'Este ano',
    generatePeriod: getThisYearPeriod,
  },
  {
    id: 8,
    label: 'Último ano',
    generatePeriod: getLastYearPeriod,
  },
]
