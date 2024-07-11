import {ArrowRight, Calendar, MapPin, Settings2, X} from "lucide-react";
import {Button} from "../../../../components/button.tsx";
import {useState} from "react";
import {DateRange, DayPicker} from "react-day-picker";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean
  closeGuestInput: () => void
  openGuestInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
                                         isGuestInputOpen,
                                         openGuestInput,
                                         closeGuestInput,
                                         setDestination,
                                         eventStartAndEndDates,
                                         setEventStartAndEndDates
                                       }: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  const from = eventStartAndEndDates?.from ? format(eventStartAndEndDates.from, "d' de 'LLL", {locale: ptBR}) : null
  const to = eventStartAndEndDates?.to ? format(eventStartAndEndDates.to, "d' de 'LLL", {locale: ptBR}) : null
  const displayedDate = eventStartAndEndDates?.from ? eventStartAndEndDates.to ? `${from} a ${to}` : from : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"/>
        <input
          onChange={event => setDestination(event.target.value)}
          disabled={isGuestInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>
      <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 text-left">
        <Calendar className="size-5 text-zinc-400"/>
        <span className="text-lg text-zinc-400">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {/*MODAL*/}

      {isDatePickerOpen &&
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                  <div className="space-y-2">
                      <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">Selecione a Data</h2>
                          <button type="button" onClick={closeDatePicker}>
                              <X className="size-5 text-zinc-400"/>
                          </button>
                      </div>
                  </div>
                  <DayPicker
                      mode="range"
                      locale={ptBR}
                      selected={eventStartAndEndDates}
                      onSelect={setEventStartAndEndDates}
                  />
              </div>
          </div>
      }

      {/*MODAL END*/}

      <div className="w-px h-6 bg-zinc-800"/>
      {isGuestInputOpen ? (
        <Button variant="secondary" onClick={closeGuestInput}>
          Alterar local/data
          <Settings2 className="size-5"/>
        </Button>
      ) : (
        <Button onClick={openGuestInput}>
          Continuar
          <ArrowRight className="size-5"/>
        </Button>
      )}
    </div>
  )
}