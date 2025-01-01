import { useState, useEffect, useContext } from "react"
import Timer from "./Timer"
import {Timers} from "../contexts/Timers"

function Track() {
    let {timers, updateTimers} = useContext(Timers)

    // Allow to start, pause and resume global timer
    let [isRunning, updateIsRunning] = useState(false)

    // An interval fire each second
    useEffect(() => {
        let countDown = setInterval(() => {
            if (isRunning) {
                let updatedTimers = [...timers]
                let runningTimerIndex = updatedTimers.findIndex((timer) => timer.running)
                if (runningTimerIndex != -1) {
                    updatedTimers[runningTimerIndex].current++
                    if (updatedTimers[runningTimerIndex].current >= updatedTimers[runningTimerIndex].duration) {
                        if (runningTimerIndex < updatedTimers.length - 1) {
                            updatedTimers[runningTimerIndex].running = false
                            updatedTimers[runningTimerIndex + 1].running = true
                        } else {
                            updatedTimers = resetTimers(updatedTimers)
                            updateIsRunning(false)
                        }
                    }
                } else {
                    updatedTimers[0].running = true
                    updatedTimers[0].current += 1
                }
                updateTimers(updatedTimers)
            }
        }, 1000)

        return () => {
            clearInterval(countDown)
        }
    }, [timers, isRunning, updateTimers])

    // Reset all timers and return timers
    function resetTimers(timers) {
        timers = timers.map((timer) => {
            timer.current = 0
            timer.running = false
            return timer
        })
        return timers
    }

    if (isRunning) {
        return (
            <div className="max-w-md">
                <div>
                    <button onClick={() => updateIsRunning(true)} className="bg-white text-red-950 p-2 border-black border-2 rounded-full">
                        Start
                    </button>
                    <button onClick={() => updateIsRunning(false)}>Pause</button>
                    <button>Reset</button>
                </div>
                <div>
                    {timers.map((timer) => (
                        <Timer key={timer.id} duration={timer.duration} current={timer.current} id={timer.id} isRunning={isRunning}></Timer>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="max-w-md">
                <div>
                    <button onClick={() => updateIsRunning(true)} className="bg-white text-red-950 p-2 border-black border-2 rounded-full">
                        Start
                    </button>
                    <button onClick={() => updateIsRunning(false)}>Pause</button>
                    <button>Reset</button>
                </div>
                <div>
                    {timers.map((timer) => (
                        <Timer key={timer.id} duration={timer.duration} current={timer.current} id={timer.id} isRunning={isRunning}></Timer>
                    ))}
                </div>
            </div>
        )
    }
}

export default Track
