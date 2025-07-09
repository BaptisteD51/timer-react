import { useState, useEffect, useContext } from "react"
import { Timers } from "../../contexts/Timers"
import { FaPlay, FaPause } from "react-icons/fa"
import { RxReset } from "react-icons/rx"
import bipmp3 from "../../assets/audio/long_bip.mp3"
import sirenmp3 from "../../assets/audio/siren.mp3"
import Counter from "../Track/Counter"

function Track({ isRunning, updateIsRunning, pause, updatePause }) {
    let { updateProfiles, currentProfile, updateCurrentProfile } =
        useContext(Timers)

    //Get a copy of the active profile. In order not to work with the full context, we work with a local state
    let [cpProfile, setCpProfile] = useState(currentProfile)

    // The sounds of the timer
    let bip = new Audio(bipmp3)
    let siren = new Audio(sirenmp3)

    // An interval fire every tenth of a sec
    useEffect(() => {
        let countDown = setInterval(() => {
            if (isRunning && !pause) {
                let prTimers = [...cpProfile.timers]
                let runningTimerIndex = prTimers.findIndex(
                    (timer) => timer.running
                )

                // if the countdown is already started
                if (runningTimerIndex != -1) {
                    prTimers[runningTimerIndex].current--

                    // Go to the next timer if end of the duration
                    if (
                        prTimers[runningTimerIndex].current <= 0
                    ) {

                        //if there is a timer after
                        if (runningTimerIndex < prTimers.length - 1) {
                            bip.play()
                            prTimers[runningTimerIndex].running = false
                            prTimers[runningTimerIndex + 1].running = true
                        }
                        // if it's the last timer
                        else {
                            siren.play()
                            prTimers = resetTimers(prTimers)
                            updateIsRunning(false)
                        }
                    }
                }
                // Launch the count down
                else {
                    prTimers[0].running = true
                    prTimers[0].current += 1
                }

                // Update the copied profile timers
                // Create a copy by value (or re-rendering won't work if by reference)
                let updatedProfile = {...cpProfile}
                updatedProfile.timers = prTimers
                setCpProfile(updatedProfile)
            }
        }, 100)

        return () => {
            clearInterval(countDown)
        }
    }, [pause, isRunning, cpProfile])

    // Prevents the mobile screen from turning off
    useEffect(()=>{
        let wakeLock = null

        async function requestWakeLock(){
            if('wakeLock' in navigator){
                try{
                    wakeLock = await navigator.wakeLock.request("screen") 
                    console.log("WakeLock is active")
                    wakeLock.addEventListener('release', () => {
                        //To debug if WakeLock is released for some reason
                        console.log("WakeLock was released")
                    })
                }
                catch (err) {
                    console.log(err.name)
                    console.log(err.message)
                }
            }
        }

        requestWakeLock()

        return () => {
            if (wakeLock) {
                wakeLock.release()
            }
        }
    },[])


    // Reset all timers and return timers
    function resetTimers(timers) {
        timers = timers.map((timer) => {
            timer.current = timer.duration
            timer.running = false
            return timer
        })
        return timers
    }

    function resetAll() {

        let resetedTimers = resetTimers([...cpProfile.timers])
        cpProfile.timers = resetedTimers
        setCpProfile(cpProfile)

        // Reset the running and pause state
        updatePause(false)
        updateIsRunning(false)
    }

    //Display when the timer is launched

    return (
        <>
            <div className="flex gap-3 justify-center">
                {pause ? (
                    <button
                        onClick={() => {
                            updatePause(false)
                        }}
                        className="bg-orange-600 text-orange-50 p-2 border-black border-2 size-10 rounded-full flex justify-center items-center"
                    >
                        <FaPlay />
                    </button>
                ) : (
                    <button
                        onClick={() => updatePause(true)}
                        className="bg-orange-600 text-orange-50 p-2 border-black border-2 size-10 rounded-full flex justify-center items-center"
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
            </div>

            <div>
                {cpProfile.timers.map((timer) => (
                    <Counter
                        key={timer.id}
                        duration={timer.duration}
                        current={timer.current}
                        color={timer.color}
                        running={timer.running}
                    ></Counter>
                ))}
            </div>
        </>
    )
}

export default Track
