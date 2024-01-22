'use client'

import DatePicker from '@/components/DatePicker'
import { RequestStatus } from '@/components/ExecutionsTab'

const data = [
  '29-12-2023 12:20:58.886 - 29-12-2023 12:20:58.886',
  '01-01-2024 12:20:58.886 - 02-01-2024 12:20:58.886',
  '02-01-2024 12:20:58.886 - 03-01-2024 12:20:58.886',
  '04-01-2024 12:20:58.886 - 05-01-2024 12:20:58.886',
  '05-01-2024 12:20:58.886 - 06-01-2024 12:20:58.886',
]

const snapshots = data.map((snapshot, index) => ({
  id: index + 1,
  period: snapshot,
}))

const executions = data.map((snapshot, index) => {
  const random = Math.random()
  let status = RequestStatus.CANCELED

  if (random >= 0.3 && random < 0.7) {
    status = RequestStatus.PENDING
  } else if (random >= 0.7) {
    status = RequestStatus.COMPLETED
  }

  return {
    id: index + 1,
    period: snapshot,
    status,
  }
})

export default function Page() {
  return (
    <DatePicker
      selectionMode="date"
      snapshots={snapshots}
      executions={executions}
    />
  )
}
