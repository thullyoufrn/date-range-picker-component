import { Toggle } from "./ui/toggle";

export default function Snapshot({ pressed }: { pressed: boolean }) {
  return (
    <Toggle 
      className="font-normal" 
      variant="outline" 
      aria-label="Toggle italic"
      pressed={pressed}
    >
      29-12-2023 12:20:58.886 - 28-01-2024 12:20:58.886
    </Toggle>
  )
}
