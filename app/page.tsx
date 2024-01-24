'use client'

import DatePicker from '@/components/DatePicker'
import { convertDatesToSnapshotFormat } from '@/lib/date-functions'

const dateExecutions = [
  {
    id: 1,
    startDate: '2024-01-24T00:00:00.000Z',
    finalDate: null,
    status: 'Canceled',
  },
  {
    id: 2,
    startDate: '2024-01-25T00:00:00.000Z',
    finalDate: null,
    status: 'Pending',
  },
  {
    id: 3,
    startDate: '2024-01-26T00:00:00.000Z',
    finalDate: null,
    status: 'Canceled',
  },
  {
    id: 4,
    startDate: '2024-01-27T00:00:00.000Z',
    finalDate: null,
    status: 'Completed',
  },
  {
    id: 5,
    startDate: '2024-01-28T00:00:00.000Z',
    finalDate: null,
    status: 'Pending',
  },
  {
    id: 6,
    startDate: '2024-01-29T00:00:00.000Z',
    finalDate: null,
    status: 'Completed',
  },
  {
    id: 7,
    startDate: '2024-01-30T00:00:00.000Z',
    finalDate: null,
    status: 'Canceled',
  },
  {
    id: 8,
    startDate: '2024-01-31T00:00:00.000Z',
    finalDate: null,
    status: 'Pending',
  },
  {
    id: 9,
    startDate: '2024-02-01T00:00:00.000Z',
    finalDate: null,
    status: 'Completed',
  },
  {
    id: 10,
    startDate: '2024-02-02T00:00:00.000Z',
    finalDate: null,
    status: 'Canceled',
  },
]
const dateSnapshots = dateExecutions.map(({ status, ...rest }) => rest)

const periodExecutions = [
  {
    id: 1,
    startDate: '2024-01-24T00:00:00.000Z',
    finalDate: '2024-01-26T12:00:00.000Z',
    status: 'Canceled',
  },
  {
    id: 2,
    startDate: '2024-01-25T00:00:00.000Z',
    finalDate: '2024-01-27T12:00:00.000Z',
    status: 'Pending',
  },
  {
    id: 3,
    startDate: '2024-01-26T00:00:00.000Z',
    finalDate: '2024-01-28T18:30:00.000Z',
    status: 'Canceled',
  },
  {
    id: 4,
    startDate: '2024-01-27T00:00:00.000Z',
    finalDate: '2024-02-01T18:30:00.000Z',
    status: 'Completed',
  },
  {
    id: 5,
    startDate: '2024-01-28T00:00:00.000Z',
    finalDate: '2024-02-02T08:45:00.000Z',
    status: 'Pending',
  },
  {
    id: 6,
    startDate: '2024-01-29T00:00:00.000Z',
    finalDate: '2024-02-03T08:45:00.000Z',
    status: 'Completed',
  },
  {
    id: 7,
    startDate: '2024-01-30T00:00:00.000Z',
    finalDate: '2024-02-04T14:20:00.000Z',
    status: 'Canceled',
  },
  {
    id: 8,
    startDate: '2024-01-31T00:00:00.000Z',
    finalDate: '2024-02-05T14:20:00.000Z',
    status: 'Pending',
  },
  {
    id: 9,
    startDate: '2024-02-01T00:00:00.000Z',
    finalDate: '2024-02-06T18:30:00.000Z',
    status: 'Completed',
  },
  {
    id: 10,
    startDate: '2024-02-02T00:00:00.000Z',
    finalDate: '2024-02-07T20:10:00.000Z',
    status: 'Canceled',
  },
]
const periodSnapshots = periodExecutions.map(({ status, ...rest }) => rest)

const snapshotsFormatted = convertDatesToSnapshotFormat(periodSnapshots)
const executionsFormatted = convertDatesToSnapshotFormat(periodExecutions)

export default function Page() {
  return (
    <DatePicker
      selectionMode="period"
      snapshots={snapshotsFormatted}
      executions={executionsFormatted}
    />
  )
}
