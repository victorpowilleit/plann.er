import {Link2, Plus} from "lucide-react";
import {Button} from "../../../components/button.tsx";

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links Importantes</h2>

      {/*LINKS LIST*/}
      <div className="space-y-5">

        {/*LINK*/}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/1047000118946872637842870345
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>
        {/*LINK*/}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
            <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
              https://www.airbnb.com.br/rooms/1047000118946872637842870345
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0"/>
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5"/>
        Cadastrar novo link
      </Button>
    </div>
  )
}