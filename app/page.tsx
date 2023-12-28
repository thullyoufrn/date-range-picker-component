"use client"

import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import moment from "moment/moment"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from 'date-fns';

export default function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 5),
  })
  const [timeInicial, setTimeInicial] = useState('')
  const [timeFinal, setTimeFinal] = useState('')
  const [initialHours, setInitialHours] = useState<number>()
  const [initialMinutes, setInitialMinutes] = useState<number>()
  const [initialSeconds, setInitialSeconds] = useState<number>()
  const [initialMilliseconds, setInitialMilliseconds] = useState<number>()
  const [finalHours, setFinalHours] = useState<number>()
  const [finalMinutes, setFinalMinutes] = useState<number>()
  const [finalSeconds, setFinalSeconds] = useState<number>()
  const [finalMilliseconds, setFinalMilliseconds] = useState<number>()

  type addType = "hour" | "minute" | "second" | "millisecond"

  function addTime(initialValue: any, valueToAdd: number, typeToAdd: addType) {
    const startTime = moment(initialValue, 'HH:mm:ss.SSS');
    const newTime = startTime.add(valueToAdd, typeToAdd);
    return newTime
  }

  function calculateTime(
    hours: number, 
    minutes: number, 
    seconds: number, 
    milliseconds: number
  ) {
    let initialTime = moment('00:00:00', 'HH:mm:ss');

    initialTime = addTime(initialTime, hours, 'hour')
    initialTime = addTime(initialTime, minutes, 'minute')
    initialTime = addTime(initialTime, seconds, 'second')
    initialTime = addTime(initialTime, milliseconds, 'millisecond')

    return initialTime.format('HH:mm:ss.SSS')
  }

  function handleSelect() {
    const initialTime = calculateTime(
      initialHours, 
      initialMinutes, 
      initialSeconds, 
      initialMilliseconds
    )

    const finalTime = calculateTime(
      finalHours, 
      finalMinutes, 
      finalSeconds, 
      finalMilliseconds
    )

    const teste = {
      from: moment(date.from).add(initialTime).toDate(),
      to: moment(date.to).add(finalTime).toDate()
    }

    console.log(teste)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-2">
      <Calendar
        initialFocus
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="bg-white rounded flex justify-center items-center w-full"
      />

      <div className="flex gap-3">
        <div className="flex gap-2">
          <Input 
            type="number"
            onChange={(e) => setInitialHours(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="h"
          />
          <Input 
            type="number"
            onChange={(e) => setInitialMinutes(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="m"
          />
          <Input 
            type="number"
            onChange={(e) => setInitialSeconds(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="s"
          />
          <Input 
            type="number"
            onChange={(e) => setInitialMilliseconds(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="ms"
          />
        </div>

        <div className="w-px bg-gray-400" />

        <div className="flex gap-2">
          <Input 
            type="number"
            onChange={(e) => setFinalHours(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="h"
            
          />
          <Input 
            type="number"
            onChange={(e) => setFinalMinutes(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="m"
          />
          <Input 
            type="number"
            onChange={(e) => setFinalSeconds(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="s"
          />
          <Input 
            type="number"
            onChange={(e) => setFinalMilliseconds(Number(e.target.value))}
            className="w-16 text-center"
            placeholder="ms"
          />
        </div>
      </div>

      <Button className="w-full" onClick={handleSelect}>
        Selecionar
      </Button>
    </div>
  )
}
