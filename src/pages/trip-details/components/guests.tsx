import {CircleDashed, UserCog} from "lucide-react";
import {Button} from "../../../components/button.tsx";

export function Guests(){
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      {/*GUESTS LIST*/}
      <div className="space-y-5">

        {/*GUEST*/}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Jessica White</span>
            <a href="#" className="block text-sm text-zinc-400 truncate">
              jessica.white44@gmail.com
            </a>
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
        </div>

      </div>

      {/*BUTTON*/}
      <Button variant="secondary" size="full">
        <UserCog className="size-5"/>
        Gerenciar convidados
      </Button>
    </div>
  )
}