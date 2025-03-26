import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import Timer from "./Timer"


function Edit({ updateIsRunning }){
    let { timers, updateTimers } = useContext(Timers)
    
    // Adds another timer
    function addNewTimer() {
        let newId = parseInt(Math.random() * 10 ** 6)
        let newTimer = {
            running: false,
            duration: 50,
            current: 0,
            id: newId,
        }
        let updatedTimers = [...timers]
        updatedTimers.push(newTimer)
        updateTimers(updatedTimers)
    }

    // Display to modify the timer
    return (
        <div className="max-w-md">
                <div>
                    <button
                        onClick={() => updateIsRunning(true)}
                        className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                    >
                        Start
                    </button>
                </div>
                <div>
                    {timers.map((timer) => (
                        <Timer
                            key={timer.id}
                            duration={timer.duration}
                            id={timer.id}
                        ></Timer>
                    ))}
                </div>
                <div>
                    <button
                        onClick={addNewTimer}
                        className="bg-red-950 text-white p-2 border-black border-2 rounded-full"
                    >
                        +
                    </button>
                </div>
            </div>
    )
}

export default Edit