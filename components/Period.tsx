import { Button } from "@/components/ui/button"
import { DateRange, preSelectedPeriods } from "@/lib/date-functions"
import { ArrowRight } from "lucide-react"
import moment from "moment/moment"
import { useState } from "react"
import { useForm } from "react-hook-form"
import InputMask from 'react-input-mask'

export default function Period({
  onChangePeriod 
}: { onChangePeriod: (newPeriod: DateRange) => void }) {
  const [ preSelectedPeriod, setPreSelectedPeriod ] = useState<number | null>(null)
  const { register, handleSubmit, setValue } = useForm()

  function handleClickPreSelectedPeriod(
    id: number, 
    action: () => DateRange
  ) {
    const period = action()

    setValue('dateFrom', moment(period.from).format("DD/MM/YYYY"))
    setValue('dateTo', moment(period.to).format("DD/MM/YYYY"))
    setValue('timeFrom', moment(period.from).format('HH:mm:ss.SSS'))
    setValue('timeTo', moment(period.to).format('HH:mm:ss.SSS'))
    
    setPreSelectedPeriod(id)
  }

  function handleApply(data: any) {
    const startDateString = data.dateFrom + " " + data.timeFrom;
    const endDateString = data.dateTo + " " + data.timeTo; 

    const startDateMoment = moment(startDateString, "DD/MM/YYYY HH:mm:ss.SSS");
    const endDateMoment = moment(endDateString, "DD/MM/YYYY HH:mm:ss.SSS");
    const startDate = startDateMoment.toDate()
    const endDate = startDateMoment.toDate()

    // Update PopoverTrigger
    const newPopoverPeriod = { from: startDate, to: endDate }
    onChangePeriod(newPopoverPeriod)

    // Data for the HTTP request (ISOString)
    const requestDateFrom = startDateMoment.toISOString()
    const requestDateTo = endDateMoment.toISOString()
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-5">
        {/* Pre-selected times */}
        <div className="flex flex-col">
          {preSelectedPeriods.map(({ id, label, action }) => {
            return (
              <Button 
                key={id} 
                variant={id === preSelectedPeriod ? "secondary" : "ghost"}
                className="flex font-normal justify-start"
                onClick={() => handleClickPreSelectedPeriod(id, action)}  
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
              {...register('dateFrom')}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('dateTo')}
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
              {...register('timeFrom')}
            />
            <ArrowRight className="text-slate-400 w-10" />
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="text-center outline-none flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('timeTo')}
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
