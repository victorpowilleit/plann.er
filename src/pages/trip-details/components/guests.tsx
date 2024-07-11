import {UserCog} from "lucide-react";
import {Button} from "../../../components/button.tsx";
import {DocDataType} from "../../../db/functions/CRUD.ts";
import {Guest} from "./guest.tsx";

export function Guests({tripData}:{tripData:DocDataType}){
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>

      {/*GUESTS LIST*/}
      <div className="space-y-5">

        {/*GUEST*/}
        {tripData?.invited.map((guest: { name: string; email: string; isConfirmed: boolean; }, i:number) => <Guest key={guest.email} name={guest.name||`Convidado ${i}`} email={guest.email} isConfirmed={guest.isConfirmed}/>)}

      </div>

      {/*BUTTON*/}
      <Button variant="secondary" size="full">
        <UserCog className="size-5"/>
        Gerenciar convidados
      </Button>
    </div>
  )
}