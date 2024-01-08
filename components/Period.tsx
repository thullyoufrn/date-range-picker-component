import { Button } from "@/components/ui/button"
import { preSelectedPeriods } from "@/lib/date-functions"
import { addDays } from "date-fns"
import { ArrowRight } from "lucide-react"
import moment from "moment/moment"
import { useState } from "react"
import InputMask from 'react-input-mask'
import { Calendar } from "./ui/calendar"

export interface DateRange {
  from: Date | null
  to: Date | null
}

interface TimeRange {
  from: string | null
  to: string | null
}

export default function Period() {
  const [date, setDate] = useState<DateRange>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const [time, setTime] = useState<TimeRange>({
    from: "00:00:00.000",
    to: "00:00:00.000",
  })

  const [ preSelectedPeriod, setPreSelectedPeriod ] = useState<number | null>(1)

  function handleApply() { 
    const initialDateInMilliseconds = date.from.getTime()
    const finalDateInMilliseconds = date.to.getTime()
    const initialTimeInMilliseconds = moment.duration(time.from).asMilliseconds()
    const finalTimeInMilliseconds = moment.duration(time.to).asMilliseconds()

    const initialDateAndTime = moment(initialDateInMilliseconds)
      .add(initialTimeInMilliseconds)
      .toDate()
      .toISOString()

    const finalDateAndTime = moment(finalDateInMilliseconds)
      .add(finalTimeInMilliseconds)
      .toDate()
      .toISOString()

    const period = {
      from: initialDateAndTime,
      to: finalDateAndTime,
    }

    console.log(period)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-5">
        <div className="flex flex-col">
          {preSelectedPeriods.map(({ id, label, action }) => {
            function handleClickButton() {
              const period = action()
              setDate(period)
              setPreSelectedPeriod(id)
            }

            return (
              <Button 
                key={label} 
                variant={id === preSelectedPeriod ? "secondary" : "ghost"}
                className="flex font-normal justify-start"
                onClick={handleClickButton}  
              >
                {label}
              </Button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-300" />

        <div className="flex flex-col gap-1">
          <div className="flex w-full gap-3 justify-center items-center">
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              onChange={(e) => {
                const startDate = moment.utc(e.target.value, 'DD/MM/YYYY').toDate()
                setDate((state) => {
                  return { ...state, from: startDate }
                })
              }}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              onChange={(e) => {
                const endDate = moment.utc(e.target.value, 'DD/MM/YYYY').toDate()
                setDate((state) => {
                  return { ...state, to: endDate }
                })
              }}
            />
          </div>
          
          {/* <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          /> */}
          
          <div className="flex w-full gap-3 justify-center items-center">
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              onChange={(e) => {
                const startTime = e.target.value
                setTime((state) => {
                  return { ...state, from: startTime }
                })
              }}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              onChange={(e) => {
                const endTime = e.target.value
                setTime((state) => {
                  return { ...state, to: endTime }
                })
              }}
            />
          </div>
        </div>
      </div>

      <div className='self-end flex mt-3 gap-2'>
        <Button variant='secondary'>
          Cancelar
        </Button>

        <Button onClick={handleApply}>
          Aplicar
        </Button>
      </div>
    </div>
  )
}
