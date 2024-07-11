import {Calendar, Plus, Tag, X} from "lucide-react";
import {Button} from "../../../components/button.tsx";
import {FormEvent, useState} from "react";
import {DayPicker} from "react-day-picker";
import {ptBR} from "date-fns/locale";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ISOStringFormat} from "date-fns/types";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
  tripId: string
  createActivity: (e: { date: Date; event: FormEvent<HTMLFormElement>; title: string|null }) => void
  dateRange: {from: ISOStringFormat, to: ISOStringFormat}
}

export function CreateActivityModal(
  {closeCreateActivityModal, createActivity, dateRange}: CreateActivityModalProps) {
  const [activityTitle, setActivityTitle] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  function formattedActivity(){
    if(!date || !time){
      return {title: null, date: new Date()}
    }
    const dateTime = new Date(date!)
    const [hour, minute] = time!.split(':').map(Number)
    dateTime.setHours(hour)
    dateTime.setMinutes(minute)
    return {title: activityTitle, date: dateTime}
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

        <div className="space-y-2">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={(event) => createActivity({event, ...formattedActivity()})} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5 "/>
            <input onChange={e=>setActivityTitle(e.target.value)} name="title" placeholder="Qual a atividade?"
                   className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 text-left"/>
          </div>
          <div className="flex items-center gap-2">

            <div className="h-14 flex-1 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5"/>
              <button onClick={openDatePicker}
                      className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 pr-5 text-left">
                {date ? `0${date.getDay()}`.slice(-2) + "/" + `0${date.getMonth() + 1}`.slice(-2)+` às ${time} horas` : "Data da atividade"}
              </button>
            </div>


            {/* DATE PICKER MODAL */}
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
                            mode="single"
                            locale={ptBR}
                            selected={date}
                            onSelect={setDate}
                            disabled={{
                              before: dateRange?.from!.toDate(),
                              after: dateRange?.to!.toDate(),
                            }}
                        />
                        <div className='w-full flex justify-center text-2xl'>
                            <input className="bg-transparent" type="time" onChange={e=>setTime(e.target.value)}/>
                        </div>
                    </div>
                </div>
            }
            {/* END DATE PICKER MODAL */}

          </div>
          <Button size="full" type="submit">
            Salvar atividade
            <Plus className="size-5"/>
          </Button>
        </form>
      </div>
    </div>
  )
}