import { PopoverClose } from '@radix-ui/react-popover'
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
  const [executionPressed, setExecutionPressed] = useState(null)

  function onPressExecution(id: number) {
    if (id === executionPressed) {
      setExecutionPressed(null)
    } else {
      setExecutionPressed(id)
    }
  }

  function applyExecution() {
    const executionChoosed = executions.find((execution) => {
      return execution.id === executionPressed
    })

    console.log(executionChoosed)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {executions.map((execution, index) => {
          return (
            <Snapshot
              key={index}
              snapshot={execution}
              snapshotPressed={executionPressed}
              onPressedChange={onPressExecution}
            />
          )
        })}
      </div>

      <div className="mt-3 flex gap-2 self-end">
        <PopoverClose>
          <Button variant="outline">Cancelar</Button>
        </PopoverClose>

        <PopoverClose>
          <Button disabled={!executionPressed} onClick={applyExecution}>
            Aplicar
          </Button>
        </PopoverClose>
      </div>
    </div>
  )
}
