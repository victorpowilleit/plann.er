import {
  Plus,
} from "lucide-react";
import {FormEvent, useEffect, useState} from "react";
import {CreateActivityModal} from "./components/create-activity-modal.tsx";
import {ImportantLinks} from "./components/important-links.tsx";
import {Guests} from "./components/guests.tsx";
import {Activities} from "./components/activities.tsx";
import {DestinationAndDateHeader} from "./components/destination-and-date-header.tsx";
import {dbRead, dbUpdateTrip, DocDataType} from "../../db/functions/CRUD.ts";
import {useParams} from "react-router-dom";

export function TripDetailsPage() {

  const [isCreateActivityModalOpen, setCreateActivityModalOpen] = useState(false);
  const [tripData, setTripData] = useState<DocDataType | null>(null);

  const {tripId} = useParams();

  async function getData(id: string): Promise<void> {
    const data: DocDataType | undefined = await dbRead(id)
    setTripData(data)
  }

  useEffect(() => {
    getData(tripId!).then()
  }, [tripId]);


  async function createActivity(e:FormEvent<HTMLFormElement>):Promise<void>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title')?.toString()
    const occursAt = data.get('occursAt')?.toString()
    if(title&&occursAt) {
      const newActivitiesList = [...tripData.activities||[], {title, occursAt}]
      const response = await dbUpdateTrip(tripId!, {activities: newActivitiesList})
      if(response){
        setTripData({...tripData, activities: newActivitiesList})
        closeCreateActivityModal()
      }
    }
  }

  function openCreateActivityModal() {
    setCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setCreateActivityModalOpen(false);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">

      {/*HEADER*/}
      <DestinationAndDateHeader tripData={tripData}/>

      {/*CONTENT*/}
      <main className="flex gap-16 px-4">

        {/*LEFT SIDE*/}
        <div className="flex-1 space-y-6">
          {/*LEFT SIDE HEADER*/}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={openCreateActivityModal}
              className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5"/>
              Cadastrar atividade
            </button>
          </div>

          {/*DATES LIST*/}
          <Activities activitiesList={tripData?.activities}/>

        </div>

        {/*ASIDE*/}
        <div className="w-80 space-y-6">
          <ImportantLinks/>
          {/*SEPARATOR*/}
          <div className="w-full h-px bg-zinc-800"/>
          <Guests tripData={tripData}/>

        </div>
      </main>

      {/*MODAL*/}
      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal} tripId={tripId!} createActivity={createActivity}/>
      )}

    </div>
  )
}