import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import Timer from "./Timer"


function Edit({ updateIsRunning }){
    let { timers, updateTimers } = useContext(Timers)
    //Get the active profile
    let profile = timers.find(timer => timer.selected)


    // Adds another timer to current profile
    function addNewInterval() {
        let newId = parseInt(Math.random() * 10 ** 6)
        let newTimer = {
            running: false,
            duration: 50,
            current: 0,
            id: newId,
        }
        profile.timers.push(newTimer)

        let updatedTimers = [...timers.filter(profile => !profile.selected)]
        updatedTimers.push(profile)
        updateTimers(updatedTimers)
    }

    // Display to modify the timer
    return (
        <div className="max-w-lg">
                <div>
                    <button
                        onClick={() => updateIsRunning(true)}
                        className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                    >
                        Start
                    </button>
                </div>
                <div>
                    {profile.timers.map((timer) => (
                        <Timer
                            key={timer.id}
                            duration={timer.duration}
                            id={timer.id}
                        ></Timer>
                    ))}
                </div>
                <div>
                    <button
                        onClick={addNewInterval}
                        className="bg-red-950 text-white p-2 border-black border-2 rounded-full"
                    >
                        +
                    </button>
                </div>
            </div>
    )
}

export default Edit