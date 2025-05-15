import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import Palette from "./Palette.jsx"

function Timer({ duration, id, color }) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    // Change the duration of a timer
    function updateTime(e) {
        let newDuration = e.target.value
        let regex = /^\d+$/g

        if (newDuration.match(regex) && parseInt(newDuration) > 0) {
            let updatedTimerIndex = currentProfile.timers.findIndex(
                (timer) => timer.id == id
            )

            currentProfile.timers[updatedTimerIndex].duration =
                parseInt(newDuration) * 10

            updateCurrentProfile(currentProfile)

        } else if (newDuration == "") {
            // Do nothing

        } else {
            e.target.value = duration / 10
        }
    }

    // Delete Timer
    function deleteTimer(id) {
        let deleteTimerIndex = currentProfile.timers.findIndex(
            (timer) => timer.id == id
        )

        currentProfile.timers.splice(deleteTimerIndex, 1)
        
        updateCurrentProfile(currentProfile)
    }

    //Change Timer position
    function changeTimerPosition(id, direction) {
        let moveTimerIndex = currentProfile.timers.findIndex((timer) => timer.id == id)
        let replaceTimerIndex = moveTimerIndex + direction

        // Do nothing if timer at the end or at the beginning of the array
        if (
            replaceTimerIndex < 0 ||
            replaceTimerIndex > currentProfile.timers.length - 1
        ) {
            return
        }

        // If not, reverse positions
        let moveTimer = currentProfile.timers[moveTimerIndex]
        let replaceTimer = currentProfile.timers[replaceTimerIndex]

        currentProfile.timers[moveTimerIndex] = replaceTimer
        currentProfile.timers[replaceTimerIndex] = moveTimer

        updateCurrentProfile(currentProfile)
    }

    return (
        <div
            className={`${color} my-4 py-4 px-6 rounded-full flex justify-between items-center gap-4`}
        >
            <div className="flex flex-col justify-between justify-self-start">
                <button onClick={() => changeTimerPosition(id, -1)}>
                    <FaAngleUp size={25} />
                </button>
                <button onClick={() => changeTimerPosition(id, 1)}>
                    <FaAngleDown size={25} />
                </button>
            </div>

            <div className="flex justify-center items-center gap-4">
                <div className="relative">
                    <Palette intervalId={id} />
                </div>

                <input
                    type="number"
                    onChange={(e) => updateTime(e)}
                    defaultValue={duration / 10}
                    className="max-w-24"
                />
            </div>
            

            <button
                onClick={() => deleteTimer(id)}
                className="bg-red-600 text-white p-2 rounded-full size-8 flex justify-center items-center"
            >
                <FaXmark className="text-xl" />
            </button>
        </div>
    )
}

export default Timer
