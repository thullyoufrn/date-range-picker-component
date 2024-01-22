import { Button } from '@/components/ui/button'
import { getDateWithCustomTime, shortcutPeriods } from '@/lib/date-functions'
import { PopoverClose } from '@radix-ui/react-popover'
import { ArrowRight } from 'lucide-react'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { Calendar } from './ui/calendar'

interface PeriodTabProps {
  popoverPeriod: DateRange
  onChangePeriod: (newPeriod: DateRange) => void
}

export default function PeriodTab({
  popoverPeriod,
  onChangePeriod,
}: PeriodTabProps) {
  const [period, setPeriod] = useState<DateRange>(popoverPeriod)
  const { register, handleSubmit, setValue } = useForm()

  function handleClickShortcutPeriod(generatePeriod: () => DateRange) {
    const shortcutPeriod = generatePeriod()
    setPeriod(shortcutPeriod)

    // Make the HTTP Request here
    const startDateMoment = moment(
      shortcutPeriod.from,
      'DD/MM/YYYY HH:mm:ss.SSS',
    )
    const endDateMoment = moment(shortcutPeriod.to, 'DD/MM/YYYY HH:mm:ss.SSS')
    const ISODateFrom = startDateMoment.toISOString()
    const ISODateTo = endDateMoment.toISOString()

    console.log(ISODateFrom)
    console.log(ISODateTo)
  }

  function applyPeriod(data: any) {
    // Tratamento dos valores dos inputs
    const startDateString = data.dateFrom + ' ' + data.timeFrom
    const endDateString = data.dateTo + ' ' + data.timeTo
    const startDateMoment = moment(startDateString, 'DD/MM/YYYY HH:mm:ss.SSS')
    const endDateMoment = moment(endDateString, 'DD/MM/YYYY HH:mm:ss.SSS')
    const startDate = startDateMoment.toDate()
    const endDate = endDateMoment.toDate()

    setPeriod({
      from: startDate,
      to: endDate,
    })

    // Make the HTTP Request here
    const ISODateFrom = startDateMoment.toISOString()
    const ISODateTo = endDateMoment.toISOString()

    console.log(ISODateFrom)
    console.log(ISODateTo)
  }

  useEffect(() => {
    onChangePeriod(period)
    setValue('dateFrom', moment(period?.from).format('DD/MM/YYYY'))
    setValue('dateTo', moment(period?.to).format('DD/MM/YYYY'))
    setValue('timeFrom', moment(period?.from).format('HH:mm:ss.SSS'))
    setValue('timeTo', moment(period?.to).format('HH:mm:ss.SSS'))
  }, [period])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-5">
        {/* Shortcut periods */}
        <div className="flex flex-col">
          {shortcutPeriods.map(({ id, label, generatePeriod }) => {
            return (
              <PopoverClose key={id}>
                <Button
                  variant="ghost"
                  onClick={() => handleClickShortcutPeriod(generatePeriod)}
                  className="flex w-full justify-start font-normal text-primaria-700 hover:bg-primaria-300/50 hover:text-primaria-700"
                >
                  {label}
                </Button>
              </PopoverClose>
            )
          })}
        </div>

        {/* Divider */}
        <div className="w-px bg-slate-200" />

        <form
          id="date-range-form"
          onSubmit={handleSubmit(applyPeriod)}
          className="flex flex-col gap-3"
        >
          {/* Date inputs */}
          <div className="flex w-full items-center justify-center gap-3">
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('dateFrom')}
              onBlur={(e) =>
                setPeriod({
                  from: moment(e.target.value, 'DD/MM/YYYY').toDate(),
                  to: period.to,
                })
              }
            />
            <ArrowRight className="w-10 text-slate-400" />
            <InputMask
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('dateTo')}
              onBlur={(e) =>
                setPeriod({
                  from: period.from,
                  to: moment(e.target.value, 'DD/MM/YYYY').toDate(),
                })
              }
            />
          </div>

          <Calendar
            mode="range"
            defaultMonth={period?.from}
            selected={period}
            onSelect={setPeriod}
            numberOfMonths={2}
          />

          {/* Time inputs */}
          <div className="flex w-full items-center justify-center gap-3">
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('timeFrom')}
              onBlur={(e) =>
                setPeriod({
                  from: getDateWithCustomTime(period.from, e.target.value),
                  to: period.to,
                })
              }
            />
            <ArrowRight className="w-10 text-slate-400" />
            <InputMask
              mask="99:99:99.999"
              placeholder="00:00:00.000"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
              {...register('timeTo')}
              onBlur={(e) =>
                setPeriod({
                  from: period.from,
                  to: getDateWithCustomTime(period.to, e.target.value),
                })
              }
            />
          </div>
        </form>
      </div>

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
