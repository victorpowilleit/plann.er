import {Calendar, MapPin, Settings2} from "lucide-react";
import {Button} from "../../../components/button.tsx";
import {DocDataType} from "../../../db/functions/CRUD.ts";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";


export function DestinationAndDateHeader({tripData}: { tripData: DocDataType | null }) {

  const from = tripData?.eventStartAndEndDates.from ? format(tripData.eventStartAndEndDates.from.toDate(), "d' de 'LLL", {locale: ptBR}) : null
  const to = tripData?.eventStartAndEndDates.to ? format(tripData.eventStartAndEndDates.to.toDate(), "d' de 'LLL", {locale: ptBR}) : null
  const displayedDate = from ? to ? `${from} a ${to}` : from : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">

      {/*PLACE*/}
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400"/>
        <span className="text-zinc-100">{tripData?.destination}</span>
      </div>

      {/*DATE + */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"/>

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5"/>
        </Button>
      </div>

    </div>
  )
}