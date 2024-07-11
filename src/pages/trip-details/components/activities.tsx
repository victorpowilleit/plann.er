import {Activity} from "./activity.tsx";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ISOStringFormat} from "date-fns/types";

interface ActivitiesProps {
  activitiesList: { title: string, occursAt: ISOStringFormat }[]
}

export function Activities({activitiesList = []}: ActivitiesProps) {

  const activitiesListSorted = activitiesList?.map(activity => {
    return {...activity, occursAt: activity.occursAt.toDate()}
  }).sort((a, b) => a.occursAt - b.occursAt);

  const activityByDate:{[key:string]:{title:string, occursAt:Date}[]} = {}
  activitiesListSorted.forEach(activity => {
    const key = `0${activity.occursAt.getDate()}`.slice(-2) + "_" + `0${activity.occursAt.getMonth() + 1}`.slice(-2)
    activityByDate[key] ? activityByDate[key].push(activity) : activityByDate[key] = [activity]
  })


  return (
    <div className="space-y-8">

      {/*DATE*/}
      {activitiesList.length > 0 ?
      Object.keys(activityByDate).map(day => (
        <div key={day} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">Dia {day.slice(0,2)}</span>
            <span className="text-xs text-zinc-500 capitalize">{format(activityByDate[day][0].occursAt, 'EEEE', {locale: ptBR})}</span>
          </div>
          <div className="space-y-2.5">
            {activityByDate[day].map(activity => <Activity key={activity.title+activity.occursAt} title={activity.title} occursAt={activity.occursAt}/>)}
          </div>
        </div>
      ))
        :
        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada.</p>
      }

    </div>
  )
}