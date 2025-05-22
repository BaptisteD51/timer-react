import { useContext, useRef } from "react"
import { Timers } from "../../contexts/Timers"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import Palette from "./Palette.jsx"

function Timer({ duration, id, color }) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    console.log(duration)

    //To retrieve the value of the minutes input
    let inpMinRef = useRef(parseInt(Math.random() * 10 ** 6))

    //To retrieve the value of the seconds input
    let inpSecRef = useRef(parseInt(Math.random() * 10 ** 6))

    function getFullMinutes(tenth){
        return parseInt(tenth / 600)
    }

    function getRemainingSecs(tenth){
        return parseInt( (tenth % 600) / 10 )
    }

    // Change the duration of a timer using minutes input
    function updateTimeMinutes(e){
        let newMinutes = e.target.value

        let updatedTimerIndex = currentProfile.timers.findIndex(
            (timer) => timer.id == id
        )

        let zeroMinutes = ( parseInt(newMinutes) == 0 && inpSecRef.current.value > 0)

        let regex = /^\d+$/g

        if ( newMinutes.match(regex) && parseInt(newMinutes) >= 0 ) {
            // We don't want a timer with no mins and no sec 
            if ( parseInt(newMinutes) > 0 || zeroMinutes){
                currentProfile.timers[updatedTimerIndex].duration =
                ( parseInt(newMinutes) * 600 ) + (inpSecRef.current.value * 10)

                updateCurrentProfile(currentProfile)
            } else {
                e.target.value = 1
            }

        } else if (newMinutes != '') {
            e.target.value = getFullMinutes(duration)    
        }
    }

    // Change the duration of a timer using seconds input
    function updateTimeSeconds(e) {
        let newSeconds = e.target.value
        let regex = /^\d+$/g
        
        let fullMin = inpMinRef.current.value
        let fullMinTenthSec = fullMin * 600 

        if ( newSeconds.match(regex) && ( newSeconds <= 59) ) {
            // We don't want a timer with no mins and no sec 
            if ( parseInt(newSeconds) > 0 || ( parseInt(newSeconds) == 0 && inpMinRef.current.value > 0)){

                let updatedTimerIndex = currentProfile.timers.findIndex(
                    (timer) => timer.id == id
                )
    
                currentProfile.timers[updatedTimerIndex].duration =
                fullMinTenthSec + parseInt(newSeconds) * 10
    
                updateCurrentProfile(currentProfile)
            } else {
                e.target.value = 1
            }

        } else if (newSeconds != '') {
            e.target.value = getRemainingSecs(duration)    
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

    // Close the touchpad on smartphone when clicking "Go to"
    function onKeyDownHandler(e){
        if (e.key == 'Enter'){
            e.preventDefault()
            e.target.blur()
        }
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

                <div className="relative">
                    <div className="absolute right-1">m</div>

                    <input
                        ref={inpMinRef}
                        type="text"
                        inputMode="numeric"
                        onChange={(e) => updateTimeMinutes(e)}
                        onKeyDown={(e)=> onKeyDownHandler(e)}
                        defaultValue={getFullMinutes(duration)}
                        className="max-w-24"
                    />
                </div>
                
                
                <div className="relative">
                    <div className="absolute right-1 ">s</div>

                    <input
                        ref={inpSecRef}
                        type="text"
                        inputMode="numeric"
                        onChange={(e) => updateTimeSeconds(e)}
                        onKeyDown={(e)=> onKeyDownHandler(e)}
                        defaultValue={getRemainingSecs(duration)}
                        className="max-w-24"
                    />
                </div>
                
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
