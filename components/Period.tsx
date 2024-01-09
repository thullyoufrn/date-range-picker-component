import { Button } from "@/components/ui/button"
import { preSelectedPeriods } from "@/lib/date-functions"
import { ArrowRight } from "lucide-react"
import moment from "moment/moment"
import { useState } from "react"
import { useForm } from "react-hook-form"
import InputMask from 'react-input-mask'

export interface DateRange {
  from: Date | null
  to: Date | null
}

interface TimeRange {
  from: string | null
  to: string | null
}

export default function Period() {
  const [preSelectedPeriod, setPreSelectedPeriod] = useState<number | null>(null)

  const { register, handleSubmit, setValue } = useForm()

  function handleApply(data: any) { 
    // const initialDateInMilliseconds = date.from.getTime()
    // const finalDateInMilliseconds = date.to.getTime()
    // const initialTimeInMilliseconds = moment.duration(time.from).asMilliseconds()
    // const finalTimeInMilliseconds = moment.duration(time.to).asMilliseconds()

    // const initialDateAndTime = moment(initialDateInMilliseconds)
    //   .add(initialTimeInMilliseconds)
    //   .toDate()
    //   .toISOString()

    // const finalDateAndTime = moment(finalDateInMilliseconds)
    //   .add(finalTimeInMilliseconds)
    //   .toDate()
    //   .toISOString()

    // const period = {
    //   from: initialDateAndTime,
    //   to: finalDateAndTime,
    // }

    console.log(data)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-5">
        {/* Pre-selected times */}
        <div className="flex flex-col">
          {preSelectedPeriods.map(({ id, label, action }) => {
            function handleClickButton() {
              const period = action()
              setPreSelectedPeriod(id)
              setValue('date-from', moment(period.from).format("DD/MM/YYYY"))
              setValue('date-to', moment(period.to).format("DD/MM/YYYY"))
              setValue('time-from', moment(period.from).format('HH:mm:ss.SSS'))
              setValue('time-to', moment(period.to).format('HH:mm:ss.SSS'))
            }

            return (
              <Button 
                key={id} 
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
        <div className="w-px bg-slate-200" />

        <form
          id="date-range-form"
          onSubmit={handleSubmit(handleApply)} 
          className="flex flex-col gap-3"
        >
          {/* Date inputs */}
          <div className="flex w-full gap-3 justify-center items-center">
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('date-from')}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('date-to')}
            />
          </div>

          {/* Calendar Skeleton */}
          <div className="flex h-full gap-10">
            <div className="flex-1 h-full bg-slate-100 rounded" />
            <div className="flex-1 h-full bg-slate-100 rounded" />
          </div>
          
          {/* Time inputs */}
          <div className="flex w-full gap-3 justify-center items-center">
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('time-from')}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('time-to')}
            />
          </div>
        </form>
      </div>

      {/* Buttons */}
      <div className='self-end flex mt-3 gap-2'>
        <Button variant='secondary'>
          Cancelar
        </Button>

        <Button form="date-range-form" type="submit">
          Aplicar
        </Button>
      </div>
    </div>
  )
}
