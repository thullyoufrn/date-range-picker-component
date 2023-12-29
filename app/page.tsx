"use client"

import Period from "@/components/Period";
import Snapshots from "@/components/Snapshots";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DatePicker() {
  return (
    <div className="p-5 bg-white rounded">
      <Tabs defaultValue="periodo" className='flex flex-col gap-5 w-[600px]'>
        <TabsList>
          <TabsTrigger value="periodo" className='flex-1' >Período</TabsTrigger>
          <TabsTrigger value="snapshots" className='flex-1' >Snapshots</TabsTrigger>
          <TabsTrigger value="processamento" className='flex-1' >Processamento</TabsTrigger>
        </TabsList>

        <TabsContent value="periodo">
          <Period />
        </TabsContent>

        <TabsContent value="snapshots">
          <Snapshots />
        </TabsContent>

        <TabsContent value="processamento">
          Processamento
        </TabsContent>
      </Tabs>
    </div>
  )
}
