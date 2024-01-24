import clsx from 'clsx'
import { Check, Clock, X } from 'lucide-react'
import { RequestStatus } from './ExecutionsTab'
import { Toggle } from './ui/toggle'

export interface ISnapshot {
  id: number
  startDate: string
  finalDate: string | null
  status?: string
}

interface SnapshotProps {
  snapshot: ISnapshot
  snapshotPressed: number
  onPressedChange: (id: number) => void
}

export default function Snapshot({
  snapshot,
  snapshotPressed,
  onPressedChange,
}: SnapshotProps) {
  let snapshotContent = snapshot.startDate

  if (snapshot.finalDate) {
    snapshotContent += ` - ${snapshot.finalDate}`
  }

  function handlePressedChange() {
    onPressedChange(snapshot.id)
  }

  return (
    <div className="flex items-center gap-5">
      <Toggle
        className="flex-1 font-normal"
        variant="outline"
        pressed={snapshot.id === snapshotPressed}
        onPressedChange={handlePressedChange}
      >
        {snapshotContent}
      </Toggle>

      <X
        className={clsx({
          'text-red-500': snapshot.status === RequestStatus.CANCELED,
          hidden: !(snapshot.status === RequestStatus.CANCELED),
        })}
      />

      <Clock
        className={clsx({
          'text-yellow-500': snapshot.status === RequestStatus.PENDING,
          hidden: !(snapshot.status === RequestStatus.PENDING),
        })}
      />

      <Check
        className={clsx({
          'text-emerald-500': snapshot.status === RequestStatus.COMPLETED,
          hidden: !(snapshot.status === RequestStatus.COMPLETED),
        })}
      />
    </div>
  )
}
