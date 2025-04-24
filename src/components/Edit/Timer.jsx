import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"

function Timer({ duration, id }) {
    let { profiles, updateProfiles } = useContext(Timers)

    let profile = profiles.find((timer) => timer.selected)

    // Change the duration of a timer
    function updateTime(e) {
        let newDuration = e.target.value
        let regex = /^\d+$/g
        if (newDuration.match(regex) && parseInt(newDuration) > 0) {
            let updatedProfiles = [
                ...profiles.filter((pr) => pr.id != profile.id),
            ]
            let updatedTimerIndex = profile.timers.findIndex(
                (timer) => timer.id == id
            )
            profile.timers[updatedTimerIndex].duration =
                parseInt(newDuration) * 10
            updatedProfiles.push(profile)
            updateProfiles(updatedProfiles)
        } else if (newDuration == "") {
            // Do nothing
        } else {
            e.target.value = duration / 10
        }
    }

    // Delete Timer
    function deleteTimer(id) {
        let updatedProfiles = [...profiles.filter((pr) => pr.id != profile.id)]
        let deleteTimerIndex = profile.timers.findIndex(
            (timer) => timer.id == id
        )
        profile.timers.splice(deleteTimerIndex, 1)
        updatedProfiles.push(profile)
        updateProfiles(updatedProfiles)
    }

    //Change Timer position
    function changeTimerPosition(id, direction) {
        let updatedProfiles = [...profiles.filter((pr) => pr.id != profile.id)]
        let moveTimerIndex = profile.timers.findIndex((timer) => timer.id == id)
        let replaceTimerIndex = moveTimerIndex + direction

        // Returns if at the end or at the beginning of the array
        if (
            replaceTimerIndex < 0 ||
            replaceTimerIndex > profile.timers.length - 1
        ) {
            return
        }

        // If not, reverse positions
        let moveTimer = profile.timers[moveTimerIndex]
        let replaceTimer = profile.timers[replaceTimerIndex]
        profile.timers[moveTimerIndex] = replaceTimer
        profile.timers[replaceTimerIndex] = moveTimer

        updatedProfiles.push(profile)
        updateProfiles(updatedProfiles)
    }

    return (
        <div className="bg-red-800 my-4 p-4 rounded-full flex justify-between items-center">
            <div className="flex flex-col justify-between">
                <button onClick={() => changeTimerPosition(id, -1)}>
                    <FaAngleUp size={25} />
                </button>
                <button onClick={() => changeTimerPosition(id, 1)}>
                    <FaAngleDown size={25} />
                </button>
            </div>
            <input
                type="number"
                onChange={(e) => updateTime(e)}
                defaultValue={duration / 10}
            />
            <button
                onClick={() => deleteTimer(id)}
                className="bg-red-600 text-white p-2 rounded-full size-8 flex justify-center items-center"
            >
                <FaXmark 
                    className="text-xl"
                />
            </button>
        </div>
    )
}

export default Timer
