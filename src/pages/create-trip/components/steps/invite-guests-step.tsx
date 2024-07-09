import {ArrowRight, UserRoundPlus} from "lucide-react";
import {Button} from "../../../../components/button.tsx";

interface InviteGuestsStepProps {
  openGuestsModal: ()=>void
  emailsToInvite: string[]
  openConfirmTripModal: ()=>void
}

export function InviteGuestsStep({openGuestsModal, openConfirmTripModal, emailsToInvite}:InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
        <UserRoundPlus className="size-5 text-zinc-400"/>
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-100 flex-1 text-left">
                    {`${emailsToInvite.length} pessoa${emailsToInvite.length > 1 ? "s" : ""} convidada${emailsToInvite.length > 1 ? "s" : ""}`}
                  </span>
        ) : (
          <span className="text-lg text-zinc-400 flex-1 text-left">
                  Quem estará na viagem?
                </span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800"/>
      <Button onClick={openConfirmTripModal}>
        Confirmar Viagem
        <ArrowRight className="size-5"/>
      </Button>
    </div>
  )
}