import {CheckCircle2, CircleDashed} from "lucide-react";

export function Guest({name, email, isConfirmed}: { name: string, email: string, isConfirmed: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1.5">
        <span className="block font-medium text-zinc-100">{name}</span>
        <a href="#" className="block text-sm text-zinc-400 truncate">
          {email}
        </a>
      </div>
      {isConfirmed ?
        <CheckCircle2 className="text-lime-400 size-5 shrink-0"/> :
        <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
      }
    </div>
  )
}