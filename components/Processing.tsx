import { useState } from "react";
import Snapshot from "./Snapshot";
import { Button } from "./ui/button";

export enum RequestStatus {
  CANCELED = 'Canceled',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
}

const snapshots = [
  "29-12-2023 12:20:58.886 - 29-12-2023 12:20:58.886",
  "01-01-2024 12:20:58.886 - 02-01-2024 12:20:58.886",
  "02-01-2024 12:20:58.886 - 03-01-2024 12:20:58.886",
  "04-01-2024 12:20:58.886 - 05-01-2024 12:20:58.886",
  "05-01-2024 12:20:58.886 - 06-01-2024 12:20:58.886",
];

const snapshotObjects = snapshots.map((snapshot, index) => {
  const random = Math.random()
  let status = RequestStatus.CANCELED

  if (random >= 0.3 && random < 0.7) {
    status = RequestStatus.PENDING
  } else if (random >= 0.7) {
    status = RequestStatus.COMPLETED
  }

  return (
    {
      id: index + 1,
      period: snapshot,
      status
    }
  )
})

export default function Snapshots() {
  const [ snapshotPressed, setSnapshotPressed ] = useState(null)

  function onPressSnapshot(id: number) {
    if (id === snapshotPressed) {
      setSnapshotPressed(null)
    } else {
      setSnapshotPressed(id)
    }
  }

  function handleApply() {
    const snapshotChoosed = (snapshotObjects.find((snapshot) => {
      return snapshot.id === snapshotPressed
    }))

    console.log(snapshotChoosed)
  }

  return (
    <div className="gap-5 flex flex-col">
      <div className="flex flex-col gap-2">
        {snapshotObjects.map((snapshot, index) => {
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

      <div className='self-end flex mt-3 gap-2'>
        <Button variant='secondary'>
          Cancelar
        </Button>

        <Button disabled={!snapshotPressed}  onClick={handleApply} >
          Aplicar
        </Button>
      </div>
    </div>
  )
}
