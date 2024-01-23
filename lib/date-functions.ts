import moment from 'moment'
import * as ReactDayPicker from 'react-day-picker'

/**
 * Obtém o período correspondente ao dia atual, do início ao fim do dia.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
export function getTodayPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().startOf('day').toDate()
  const to = now.clone().endOf('day').toDate()
  return { from, to }
}

/**
 * Obtém o período correspondente ao dia anterior, do início ao fim do dia.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getYesterdayPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().subtract(1, 'day').startOf('day').toDate()
  const to = now.clone().subtract(1, 'day').endOf('day').toDate()
  return { from, to }
}

/**
 * Obtém o período dos últimos 7 dias, do início ao fim do dia atual.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getLast7DaysPeriod(): ReactDayPicker.DateRange {
  const now = moment()
  const from = now.clone().subtract(6, 'days').startOf('day').toDate()
  const to = now.toDate()
  return { from, to }
}

/**
 * Obtém o período dos últimos 30 dias, do início ao fim do dia atual.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getLast30DaysPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(29, 'days').startOf('day').toDate()
  const to = today.toDate()
  return { from, to }
}

/**
 * Obtém o período correspondente ao mês atual, do início ao fim do mês.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getThisMonthPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().startOf('month').toDate()
  const to = today.toDate()
  return { from, to }
}

/**
 * Obtém o período correspondente ao mês anterior, do início ao fim do mês anterior.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getLastMonthPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(1, 'month').startOf('month').toDate()
  const to = today.clone().subtract(1, 'month').endOf('month').toDate()
  return { from, to }
}

/**
 * Obtém o período correspondente ao ano atual, do início ao fim do ano.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getThisYearPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().startOf('year').toDate()
  const to = today.toDate()
  return { from, to }
}

/**
 * Obtém o período correspondente ao ano anterior, do início ao fim do ano anterior.
 * @returns {ReactDayPicker.DateRange} Objeto com as propriedades 'from' e 'to'.
 */
function getLastYearPeriod(): ReactDayPicker.DateRange {
  const today = moment()
  const from = today.clone().subtract(1, 'year').startOf('year').toDate()
  const to = today.clone().subtract(1, 'year').endOf('year').toDate()
  return { from, to }
}

/**
 * Define o horário personalizado para uma data específica.
 * @param {Date} date - A data a ser ajustada.
 * @param {string} customTime - O horário no formato 'HH:mm:ss.SSS'.
 * @returns {Date} A data resultante com o horário personalizado.
 */
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

/**
 * Formata uma data para o modelo 'DD/MM/YYYY HH:mm:ss.SSS'.
 * @param {Date} date - A data a ser formatada.
 * @returns {string} A data formatada.
 */
export function formatDate(date: Date): string {
  const formattedDate = moment(date).format('DD/MM/YYYY HH:mm:ss.SSS')
  return formattedDate
}

/**
 * Formata um período para o modelo 'DD-MM-YYYY HH:mm:ss.SSS - DD-MM-YYYY HH:mm:ss.SSS'.
 * @param {ReactDayPicker.DateRange} period - O período a ser formatado.
 * @returns {string} O período formatado.
 */
export function formatPeriod(period: ReactDayPicker.DateRange): string {
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
    startDateMoment.format('DD/MM/YYYY HH:mm:ss.SSS') +
    ' - ' +
    endDateMoment.format('DD/MM/YYYY HH:mm:ss.SSS')

  return dateRangeString
}

/**
 * Lista de atalhos de períodos pré-definidos.
 */
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
