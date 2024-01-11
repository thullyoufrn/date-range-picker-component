'use client'

import Period from '@/components/Period'
import Processing from '@/components/Processing'
import Snapshots from '@/components/Snapshots'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DateRange, formatPeriodToSnapshot } from '@/lib/date-functions'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'

export default function DatePicker() {
  const [period, setPeriod] = useState<DateRange>({
    from: new Date(2001, 5, 15),
    to: new Date(2001, 5, 16),
  })

  const dateFrom = moment(period.from).format('DD/MM/YYYY')
  const timeFrom = moment(period.from).format('HH:mm:ss.SSS')
  const dateTo = moment(period.to).format('DD/MM/YYYY')
  const timeTo = moment(period.from).format('HH:mm:ss.SSS')

  const formattedPeriod = formatPeriodToSnapshot(
    dateFrom,
    timeFrom,
    dateTo,
    timeTo,
  )

  function changeDatePickerPeriod(newPeriod: DateRange) {
    setPeriod(newPeriod)
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'min-w-[300px] justify-start text-left font-normal',
              !period && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            <span>{formattedPeriod}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="rounded bg-white p-5">
            <Tabs
              defaultValue="periodo"
              className="flex min-w-[760px] flex-col gap-5"
            >
              <TabsList>
                <TabsTrigger value="periodo" className="flex-1">
                  Período
                </TabsTrigger>
                <TabsTrigger value="processamento" className="flex-1">
                  Processamento
                </TabsTrigger>
                <TabsTrigger value="snapshots" className="flex-1">
                  Snapshots
                </TabsTrigger>
              </TabsList>

              <TabsContent value="periodo">
                <Period onChangePeriod={changeDatePickerPeriod} />
              </TabsContent>

              <TabsContent value="processamento">
                <Processing />
              </TabsContent>

              <TabsContent value="snapshots">
                <Snapshots />
              </TabsContent>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
