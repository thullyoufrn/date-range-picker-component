import DateModePicker from './DateModePicker'
import PeriodModePicker from './PeriodModePicker'
import { ISnapshot } from './Snapshot'

interface DatePickerProps {
  selectionMode: 'date' | 'period'
  snapshots?: ISnapshot[]
  executions?: ISnapshot[]
}

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
