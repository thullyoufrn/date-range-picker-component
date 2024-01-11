import clsx from 'clsx'
import { Check, Clock, X } from 'lucide-react'
import { RequestStatus } from './Processing'
import { Toggle } from './ui/toggle'

type Snapshot = {
  id: number
  period: string
  status?: string
}

interface SnapshotProps {
  snapshot: Snapshot
  snapshotPressed: number
  onPressedChange: (id: number) => void
}

export default function Snapshot({
  snapshot,
  snapshotPressed,
  onPressedChange,
}: SnapshotProps) {
  function handlePressedChange() {
    onPressedChange(snapshot.id)
  }

  return (
    <div className="flex gap-5 items-center">
      <Toggle
        className="font-normal flex-1"
        variant="outline"
        pressed={snapshot.id === snapshotPressed}
        onPressedChange={handlePressedChange}
      >
        {snapshot.period}
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
