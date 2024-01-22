import { useState } from 'react'
import Snapshot, { ISnapshot } from './Snapshot'
import { Button } from './ui/button'

export enum RequestStatus {
  CANCELED = 'Canceled',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

export default function ExecutionsTab({
  executions,
}: {
  executions: ISnapshot[]
}) {
  const [snapshotPressed, setSnapshotPressed] = useState(null)

  function onPressSnapshot(id: number) {
    if (id === snapshotPressed) {
      setSnapshotPressed(null)
    } else {
      setSnapshotPressed(id)
    }
  }

  function handleApply() {
    const snapshotChoosed = executions.find((snapshot) => {
      return snapshot.id === snapshotPressed
    })

    console.log(snapshotChoosed)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {executions.map((snapshot, index) => {
          return (
            <Snapshot
              key={index}
              snapshot={snapshot}
              snapshotPressed={snapshotPressed}
              onPressedChange={onPressSnapshot}
            />
          )
        })}
      </div>

      <div className="mt-3 flex gap-2 self-end">
        <Button variant="secondary">Cancelar</Button>

        <Button disabled={!snapshotPressed} onClick={handleApply}>
          Aplicar
        </Button>
      </div>
    </div>
  )
}
