import { useContext } from "react"
import {Timers} from "../contexts/Timers"

function Timer({duration, current, id, isRunning}){
    let {timers, updateTimers} = useContext(Timers)

    function updateTime(e){
        let newDuration = e.target.value
        let regex = /^\d+$/g
        if ( newDuration.match(regex) && ( parseInt(newDuration) > 0 )) {
            let updatedTimers = [...timers]
            updatedTimers.map((timer)=>{
                timer.id == id ? timer.duration = parseInt(newDuration) : null
                return timer
            })
            updateTimers(updatedTimers)
        } else if (newDuration == "") {
            // Do nothing
        } 
        else {
            e.target.value = duration
        }
    }

    if (isRunning){
        return (
            <div className="bg-red-800">
                {current} / {duration} s
            </div>
        )
    } else {
        return (
            <div className="bg-red-800 my-4 p-4 rounded-full">
                <input type="number" onChange={(e)=> updateTime(e)} defaultValue={duration}/>
            </div>
        )
    }
    
}

export default Timer