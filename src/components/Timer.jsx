import { useContext } from "react"
import { Timers } from "../contexts/Timers"

function Timer({ duration, current, id, isRunning }) {
    let { timers, updateTimers } = useContext(Timers)

    // Change the duration of a timer
    function updateTime(e) {
        let newDuration = e.target.value
        let regex = /^\d+$/g
        if (newDuration.match(regex) && parseInt(newDuration) > 0) {
            let updatedTimers = [...timers]
            let updatedTimerIndex = updatedTimers.findIndex(
                (timer) => timer.id == id
            )
            updatedTimers[updatedTimerIndex].duration = parseInt(newDuration)
            updateTimers(updatedTimers)
        } else if (newDuration == "") {
            // Do nothing
        } else {
            e.target.value = duration
        }
    }

    // Delete Timer
    function deleteTimer(id) {
        let updatedTimers = [...timers]
        let deleteTimerIndex = updatedTimers.findIndex(
            (timer) => timer.id == id
        )
        updatedTimers.splice(deleteTimerIndex, 1)
        updateTimers(updatedTimers)
    }

    if (isRunning) {
        return (
            <div className="bg-red-800">
                {current} / {duration} s
            </div>
        )
    } else {
        return (
            <div className="bg-red-800 my-4 p-4 rounded-full flex justify-between">
                <input
                    type="number"
                    onChange={(e) => updateTime(e)}
                    defaultValue={duration}
                />
                <button
                    onClick={() => deleteTimer(id)}
                    className="bg-red-950 text-white p-2 border-black border-2 rounded-full"
                >
                    X
                </button>
            </div>
        )
    }
}

export default Timer
