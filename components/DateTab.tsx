import { Button } from '@/components/ui/button'
import { PopoverClose } from '@radix-ui/react-popover'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { Calendar } from './ui/calendar'
import { getDateWithCustomTime } from '@/lib/date-functions'

interface DateTabProps {
  popoverDate: Date
  onChangeDate: (newDate: Date) => void
}

export default function DateTab({ popoverDate, onChangeDate }: DateTabProps) {
  const [date, setDate] = useState(popoverDate)
  const { register, handleSubmit, setValue } = useForm()

  function applyDate(data: any) {
    // Tratamento dos valores dos inputs
    const dateString = data.date + ' ' + data.time
    const dateMoment = moment(dateString, 'DD/MM/YYYY HH:mm:ss.SSS')
    const newDate = dateMoment.toDate()

    setDate(newDate)

    // Make the HTTP Request here
    const ISODateFrom = dateMoment.toISOString()
    console.log(ISODateFrom)
  }

  useEffect(() => {
    onChangeDate(date)
    setValue('date', moment(date).format('DD/MM/YYYY'))
    setValue('time', moment(date).format('HH:mm:ss.SSS'))
  }, [date])

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        id="date-range-form"
        onSubmit={handleSubmit(applyDate)}
        className="flex flex-col gap-3"
      >
        <InputMask
          mask="99/99/9999"
          placeholder="dd/mm/aaaa"
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          {...register('date')}
          onBlur={(e) => setDate(moment(e.target.value).toDate())}
        />

        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
        />

        <InputMask
          mask="99:99:99.999"
          placeholder="00:00:00.000"
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          {...register('time')}
          onBlur={(e) => setDate(getDateWithCustomTime(date, e.target.value))}
        />
      </form>

      {/* Buttons */}
      <div className="mt-3 flex gap-2 self-end">
        <PopoverClose>
          <Button variant="outline">Cancelar</Button>
        </PopoverClose>

        <PopoverClose>
          <Button form="date-range-form" type="submit">
            Aplicar
          </Button>
        </PopoverClose>
      </div>
    </div>
  )
}
