import DateModePicker from './DateModePicker'
import PeriodModePicker from './PeriodModePicker'
import { ISnapshot } from './Snapshot'

interface DatePickerProps {
  selectionMode: 'date' | 'period'
  snapshots?: ISnapshot[]
  executions?: ISnapshot[]
}

/**
 * Componente DatePicker utilizado para selecionar datas ou períodos.
 *
 * Este componente condicionalmente renderiza subcomponentes com base no modo de seleção especificado.
 * - Se o modo de seleção for 'date', o subcomponente DateModePicker será renderizado.
 * - Se o modo de seleção for 'period', o subcomponente PeriodModePicker será renderizado.
 * - Se for passado um array de snapshots, será renderizado uma aba Snapshots.
 * - Se for passado um array de execuções, será renderizado uma aba Execuções.
 *
 * @param {'date' | 'period'} selectionMode - O modo de seleção ('date' para datas, 'period' para períodos).
 * @param {ISnapshot[]} [snapshots=[]] - Um array opcional de snapshots para serem exibidos no componente de seleção.
 * @param {ISnapshot[]} [executions=[]] - Um array opcional de execuções para serem exibidas no componente de seleção.
 *
 * @example
 * // Exemplo de uso do DatePicker para seleção de datas:
 * <DatePicker selectionMode="date" snapshots={snapshots} executions={executions} />
 *
 * @example
 * // Exemplo de uso do DatePicker para seleção de períodos:
 * <DatePicker selectionMode="period" snapshots={snapshots} executions={executions} />
 *
 * @returns {JSX.Element} - O componente DatePicker renderizado com base no modo de seleção.
 */

export default function DatePicker({
  selectionMode,
  snapshots = [],
  executions = [],
}: DatePickerProps) {
  if (selectionMode === 'date') {
    return <DateModePicker snapshots={snapshots} executions={executions} />
  }

  if (selectionMode === 'period') {
    return <PeriodModePicker snapshots={snapshots} executions={executions} />
  }
}
