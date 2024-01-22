import ExecutionsTab from '@/components/ExecutionsTab'
import { formatPeriod } from '@/lib/date-functions'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import * as ReactDayPicker from 'react-day-picker'
import PeriodTab from './PeriodTab'
import { ISnapshot } from './Snapshot'
import SnapshotsTab from './SnapshotsTab'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface PeriodModePickerProps {
  snapshots: ISnapshot[]
  executions: ISnapshot[]
}

export default function PeriodModePicker({
  snapshots,
  executions,
}: PeriodModePickerProps) {
  const [popoverPeriod, setPopoverPeriod] = useState<ReactDayPicker.DateRange>({
    from: moment(new Date()).startOf('day').toDate(),
    to: moment(new Date()).endOf('day').toDate(),
  })

  const formattedPeriod = formatPeriod(popoverPeriod)
  const hasSnapshots = snapshots.length > 0
  const hasExecutions = executions.length > 0

  function changePeriod(newPeriod: ReactDayPicker.DateRange) {
    setPopoverPeriod(newPeriod)
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'min-w-[300px] justify-start bg-primaria-700 text-left font-normal text-white hover:border-primaria-900 hover:bg-primaria-900 hover:text-white',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            <span>{formattedPeriod}</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <div className="rounded bg-white p-5">
            {!hasSnapshots && !hasExecutions ? (
              <PeriodTab
                popoverPeriod={popoverPeriod}
                onChangePeriod={changePeriod}
              />
            ) : (
              <Tabs
                defaultValue="periodo"
                className="flex min-w-[760px] flex-col gap-5"
              >
                <TabsList>
                  <TabsTrigger value="periodo" className="flex-1">
                    Período
                  </TabsTrigger>

                  {hasSnapshots && (
                    <TabsTrigger value="snapshots" className="flex-1">
                      SnapshotsTab
                    </TabsTrigger>
                  )}

                  {hasExecutions && (
                    <TabsTrigger value="processamento" className="flex-1">
                      Processamento
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="periodo">
                  <PeriodTab
                    popoverPeriod={popoverPeriod}
                    onChangePeriod={changePeriod}
                  />
                </TabsContent>

                <TabsContent value="snapshots">
                  <SnapshotsTab snapshots={snapshots} />
                </TabsContent>

                <TabsContent value="processamento">
                  <ExecutionsTab executions={executions} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
