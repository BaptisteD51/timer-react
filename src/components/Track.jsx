import { useState, useEffect, useContext } from "react"
import Timer from "./Timer"
import { Timers } from "../contexts/Timers"
import { FaPlay, FaPause } from "react-icons/fa"
import { RxReset } from "react-icons/rx"
import bipmp3 from "../assets/audio/long_bip.mp3"
import sirenmp3 from "../assets/audio/siren.mp3"

function Track() {
    let { timers, updateTimers } = useContext(Timers)

    // Switch between running and edit mode
    let [isRunning, updateIsRunning] = useState(false)

    // Pause the timer
    let [pause, updatePause] = useState(false)

    // The sounds of the timer
    let bip = new Audio(bipmp3)
    let siren = new Audio(sirenmp3)
    // An interval fire each second
    useEffect(() => {
        let countDown = setInterval(() => {
            if (isRunning && !pause) {
                let updatedTimers = [...timers]
                let runningTimerIndex = updatedTimers.findIndex(
                    (timer) => timer.running
                )
                // if the countdown is already started
                if (runningTimerIndex != -1) {
                    updatedTimers[runningTimerIndex].current++
                    // Go to the next timer if end of the duration
                    if (
                        updatedTimers[runningTimerIndex].current >=
                        updatedTimers[runningTimerIndex].duration
                    ) {
                        //if there is a timer after
                        if (runningTimerIndex < updatedTimers.length - 1) {
                            bip.play()
                            updatedTimers[runningTimerIndex].running = false
                            updatedTimers[runningTimerIndex + 1].running = true
                        }
                        // if it's the last timer
                        else {
                            siren.play()
                            updatedTimers = resetTimers(updatedTimers)
                            updateIsRunning(false)
                        }
                    }
                }
                // launch the cont down
                else {
                    updatedTimers[0].running = true
                    updatedTimers[0].current += 1
                }
                updateTimers(updatedTimers)
            }
        }, 1000)

        return () => {
            clearInterval(countDown)
        }
    }, [timers, isRunning, updateTimers, pause])

    // Reset all timers and return timers
    // Reset all timers and return timers
    function resetTimers(timers) {
        timers = timers.map((timer) => {
            timer.current = 0
            timer.running = false
            return timer
        })
        return timers
    }

    function resetAll() {
        //Reset all timers to their starting values
        let updatedTimers = resetTimers([...timers])
        updateTimers(updatedTimers)
        // Reset the running and pause state
        updatePause(false)
        updateIsRunning(false)
    }

    // Adds another timer
    function addNewTimer() {
        let newId = parseInt(Math.random() * 10 ** 6)
        let newTimer = {
            running: false,
            duration: 5,
            current: 0,
            id: newId,
        }
        let updatedTimers = [...timers]
        updatedTimers.push(newTimer)
        updateTimers(updatedTimers)
    }

    //Display when the timer is launched
    if (isRunning) {
        return (
            <div className="max-w-md">
                {pause ? (
                    <button
                        onClick={() => {
                            updatePause(false)
                        }}
                        className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                    >
                        <FaPlay />
                    </button>
                ) : (
                    <button
                        onClick={() => updatePause(true)}
                        className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                    >
                        <FaPause />
                    </button>
                )}
                <button
                    onClick={resetAll}
                    className="flex bg-white text-red-950 p-2 border-black border-2 rounded-full"
                >
                    Reset
                    <RxReset size={20} />
                </button>

                <div>
                    {timers.map((timer) => (
                        <Timer
                            key={timer.id}
                            duration={timer.duration}
                            current={timer.current}
                            id={timer.id}
                            isRunning={isRunning}
                        ></Timer>
                    ))}
                </div>
            </div>
        )
    }
    // Display to modify the timer
    else {
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
                            current={timer.current}
                            id={timer.id}
                            isRunning={isRunning}
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
}

export default Track
