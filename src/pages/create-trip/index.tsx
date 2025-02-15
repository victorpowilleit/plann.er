import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {InviteGuestsModal} from "./components/invite-guests-modal.tsx";
import {ConfirmTripModal} from "./components/confirm-trip-modal.tsx";
import {DestinationAndDateStep} from "./components/steps/destination-and-date-step.tsx";
import {InviteGuestsStep} from "./components/steps/invite-guests-step.tsx";
import {DateRange} from "react-day-picker";
import {dbCreateTrip} from "../../db/functions/CRUD.ts";

export function CreateTripPage() {

  const navigate = useNavigate();

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [destination, setDestination] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>(undefined);

  function openGuestInput() {
    setIsGuestInputOpen(true);
  }

  function closeGuestInput() {
    setIsGuestInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email')?.toString()
    if (!email || emailsToInvite.includes(email)) {
      return
    }
    setEmailsToInvite(prevState => [...prevState, email])
    e.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    setEmailsToInvite(prevState => prevState.filter(email => email !== emailToRemove))
  }

  async function createTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(ownerName.length >0 && ownerEmail.length > 0 && destination.length >0 && ownerEmail.length > 0 && eventStartAndEndDates) {
      const tripId = await dbCreateTrip({
        ownerName,
        ownerEmail,
        invited: [{name: ownerName, email: ownerEmail, isConfirmed: true},...emailsToInvite.map(mail=>{return{ name:'...', email:mail, isConfirmed: false }})],
        destination,
        eventStartAndEndDates
      })
      if(tripId){
        navigate(`/trips/${tripId}`)
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er"/>
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">

          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            closeGuestInput={closeGuestInput}
            openGuestInput={openGuestInput}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal}
                              openGuestsModal={openGuestsModal}/>
          )}

        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda<br/>
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a
            className="text-zinc-300 underline" href="#">políticas de privacidade</a>.</p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal emailsToInvite={emailsToInvite} addNewEmailToInvite={addNewEmailToInvite}
                           removeEmailFromInvites={removeEmailFromInvites} closeGuestsModal={closeGuestsModal}/>
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}

    </div>
  )
}