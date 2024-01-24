import ExecutionsTab from '@/components/ExecutionsTab'
import { formatDate } from '@/lib/date-functions'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import DateTab from './DateTab'
import { ISnapshot } from './Snapshot'
import SnapshotsTab from './SnapshotsTab'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface DateModePickerProps {
  snapshots: ISnapshot[]
  executions: ISnapshot[]
}

export default function DateModePicker({
  snapshots,
  executions,
}: DateModePickerProps) {
  const [popoverDate, setPopoverDate] = useState(
    moment(new Date()).startOf('day').toDate(),
  )

  const formattedDate = formatDate(popoverDate)
  const hasSnapshots = snapshots.length > 0
  const hasExecutions = executions.length > 0

  function changeDate(newDate: Date) {
    setPopoverDate(newDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="min-w-[300px] justify-start bg-primaria-700 text-left font-normal text-white hover:border-primaria-900 hover:bg-primaria-900 hover:text-white"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          <span>{formattedDate}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="rounded bg-white p-5">
          {!hasSnapshots && !hasExecutions ? (
            <DateTab popoverDate={popoverDate} onChangeDate={changeDate} />
          ) : (
            <Tabs
              defaultValue="data"
              className="flex min-w-[400px] flex-col gap-5"
            >
              <TabsList>
                <TabsTrigger value="data" className="flex-1">
                  Data
                </TabsTrigger>

                {hasSnapshots && (
                  <TabsTrigger value="snapshots" className="flex-1">
                    Snapshots
                  </TabsTrigger>
                )}

                {hasExecutions && (
                  <TabsTrigger value="processamento" className="flex-1">
                    Processamento
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="data">
                <DateTab popoverDate={popoverDate} onChangeDate={changeDate} />
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
  )
}
