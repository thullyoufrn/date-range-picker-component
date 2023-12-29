"use client"

import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import moment from "moment/moment"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DatePicker() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  })
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
    let time = moment(0, 'HH:mm:ss.SSS');

    time = addTime(time, hours, 'hour')
    time = addTime(time, minutes, 'minute')
    time = addTime(time, seconds, 'second')
    time = addTime(time, milliseconds, 'millisecond')

    return time.format('HH:mm:ss.SSS')
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

    const initialDateAndTime = moment(date.from).add(initialTime).format('DD-MM-YYYY HH:mm:ss.SSS')
    const finalDateAndTime = moment(date.to).add(finalTime).format('DD-MM-YYYY HH:mm:ss.SSS')

    console.log(initialDateAndTime, finalDateAndTime)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-3 px-4 bg-white rounded w-[700px]">
      <Tabs defaultValue="periodo" className='flex w-full flex-col justify-center'>
        <TabsList className='flex-1 mb-5'>
          <TabsTrigger value="periodo" className='flex-1' >Período</TabsTrigger>
          <TabsTrigger value="snapshots" className='flex-1' >Snapshots</TabsTrigger>
          <TabsTrigger value="processamento" className='flex-1' >Processamento</TabsTrigger>
        </TabsList>

        <TabsContent value="periodo" className='flex flex-col items-center gap-5'>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />

          <div className="flex gap-3 justify-center">
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

          <div className='self-end flex gap-2'>
            <Button variant='secondary'>
              Cancelar
            </Button>

            <Button onClick={handleSelect}>
              Aplicar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="snapshots">
          Change your password here.
        </TabsContent>

        <TabsContent value="processamento">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  )
}
