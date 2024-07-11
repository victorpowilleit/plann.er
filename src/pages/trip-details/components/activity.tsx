import {CircleCheck} from "lucide-react";
import {format} from "date-fns";

export function Activity({title, occursAt}: { title:string, occursAt: Date}){
  return (
    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
      <CircleCheck className="size-5 text-lime-300"/>
      <span className="text-zinc-100">{title}</span>
      <span className="text-zinc-400 text-sm ml-auto">{format(occursAt, 'HH:mm')}</span>
    </div>
  )
}