import Snapshot from "./Snapshot";
import { Button } from "./ui/button";
import { Toggle } from "./ui/toggle";

const snapshots = [
  "29-12-2023 12:20:58.886 - 29-12-2023 12:20:58.886",
  "30-12-2023 12:20:58.886 - 31-12-2023 12:20:58.886",
  "31-12-2023 12:20:58.886 - 01-01-2023 12:20:58.886",
  "01-01-2024 12:20:58.886 - 02-01-2024 12:20:58.886",
  "02-01-2024 12:20:58.886 - 03-01-2024 12:20:58.886",
  "03-01-2024 12:20:58.886 - 04-01-2024 12:20:58.886",
  "04-01-2024 12:20:58.886 - 05-01-2024 12:20:58.886",
  "05-01-2024 12:20:58.886 - 06-01-2024 12:20:58.886",
]

export default function Snapshots() {
  return (
    <div className="gap-2 flex flex-col">
      {snapshots.map((snapshot) => {
        return (
          <Toggle 
            key={snapshot}
            className="font-normal" 
            variant="outline" 
            aria-label="Toggle italic"
          >
            {snapshot}
          </Toggle>
        )
      })}

      <div className='self-end flex mt-3 gap-2'>
        <Button variant='secondary'>
          Cancelar
        </Button>

        <Button>
          Aplicar
        </Button>
      </div>
    </div>
  )
}
