import { Button } from '@/components/ui/button'
import { getDateWithCustomTime } from '@/lib/date-functions'
import { PopoverClose } from '@radix-ui/react-popover'
import { ptBR } from 'date-fns/locale'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { Calendar } from './ui/calendar'

interface DateTabProps {
  popoverDate: Date
  onChangeDate: (newDate: Date) => void
}

export default function DateTab({ popoverDate, onChangeDate }: DateTabProps) {
  const [date, setDate] = useState(popoverDate)
  const { register, handleSubmit, setValue } = useForm()

  function applyDate(data: any) {
    const dateString = data.date + ' ' + data.time
    const dateMoment = moment(dateString, 'DD/MM/YYYY HH:mm:ss.SSS')
    const newDate = dateMoment.toDate()
    setDate(newDate)

    // Fazer a requisição aqui
    const ISODateFrom = dateMoment.toISOString()
    console.log(ISODateFrom)
  }

  useEffect(() => {
    onChangeDate(date)
    setValue('date', moment(date).format('DD/MM/YYYY'))
    setValue('time', moment(date).format('HH:mm:ss.SSS'))
    // eslint-disable-next-line
  }, [date])

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        id="date-form"
        onSubmit={handleSubmit(applyDate)}
        className="flex flex-col gap-3"
      >
        <InputMask
          mask="99/99/9999"
          placeholder="dd/mm/aaaa"
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          {...register('date')}
          onBlur={(e) => setDate(moment(e.target.value, 'DD/MM/YYYY').toDate())}
        />

        <Calendar
          mode="single"
          initialFocus
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          locale={ptBR}
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
          <Button form="date-form" type="submit">
            Aplicar
          </Button>
        </PopoverClose>
      </div>
    </div>
  )
}
