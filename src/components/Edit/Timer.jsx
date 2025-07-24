import { useContext, useRef, forwardRef } from "react"
import { Timers } from "../../contexts/Timers"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import { FaXmark } from "react-icons/fa6"
import { getFullMinutes, getRemainingSecs} from '../../functions/functions.js'
import Palette from "./Palette.jsx"
import Menu from "./Menu.jsx"
import useDragAndDrop from "../../hooks/useDragAndDrop.js"

const Timer = forwardRef(function Timer({ duration, id, color }, ref) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    //To retrieve the value of the minutes input
    let inpMinRef = useRef(parseInt(Math.random() * 10 ** 6))

    //To retrieve the value of the seconds input
    let inpSecRef = useRef(parseInt(Math.random() * 10 ** 6))

    // Change the duration of a timer using minutes input
    function updateTimeMinutes(e){
        let newMinutes = e.target.value
        let newDuration = ( parseInt(newMinutes) * 600 ) + (inpSecRef.current.value * 10)

        let updatedTimerIndex = currentProfile.timers.findIndex(
            (timer) => timer.id == id
        )

        let zeroMinutes = ( parseInt(newMinutes) == 0 && inpSecRef.current.value > 0)

        let regex = /^\d+$/g

        if ( newMinutes.match(regex) && parseInt(newMinutes) >= 0 ) {
            // We don't want a timer with no mins and no sec 
            if ( parseInt(newMinutes) > 0 || zeroMinutes){
                currentProfile.timers[updatedTimerIndex].duration = newDuration
                currentProfile.timers[updatedTimerIndex].current = newDuration

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

        let newDuration = fullMinTenthSec + parseInt(newSeconds) * 10

        if ( newSeconds.match(regex) && ( newSeconds <= 59) ) {
            // We don't want a timer with no mins and no sec 
            if ( parseInt(newSeconds) > 0 || ( parseInt(newSeconds) == 0 && inpMinRef.current.value > 0)){

                let updatedTimerIndex = currentProfile.timers.findIndex(
                    (timer) => timer.id == id
                )
                
                currentProfile.timers[updatedTimerIndex].duration = newDuration
                currentProfile.timers[updatedTimerIndex].current  = newDuration
    
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

    // Select the whole field when clicking
    function onFocusHandler(e){
        e.target.select()
    }

    //Drag and drop
    let hoverClasses = ['scale-[103%]', 'brightness-150']

    let {handleDragEnter, handleDragLeave, handleDropOver,handleDragStart,handleDragOver} = useDragAndDrop(hoverClasses)

    function dropOverCallBack(draggedId, dropId){
        //The index of the dragged tab
        let draggedTimerIdx = currentProfile.timers.findIndex((pr)=> pr.id == draggedId)
        //The index of the droped on tab
        let dropTimerIdx = currentProfile.timers.findIndex((pr)=> pr.id == dropId)

        let draggedTimer = currentProfile.timers[draggedTimerIdx]

        //Destroys the dragged timer at its former position
        currentProfile.timers.splice(draggedTimerIdx,1)
        //Put the dragged timer after the dropped on timmer
        currentProfile.timers.splice(dropTimerIdx,0,draggedTimer)

        let updatedProfile = [currentProfile]

        updateCurrentProfile(updatedProfile)
    }

    return (
        <div
            className={`${color} my-4 py-4 px-6 rounded-full flex justify-between items-center gap-4`}
            draggable
            ref={ref}
            onDragStart={(e) => handleDragStart(e,"timer",id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropOver(e, "timer", id, dropOverCallBack)}
            onDragEnter={(e) => handleDragEnter(e,id)}
            onDragLeave={(e) => handleDragLeave(e)}
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

                <div className="relative after:content-['m'] after:absolute after:right-1">
                    <input
                        ref={inpMinRef}
                        type="text"
                        inputMode="numeric"
                        onChange={(e) => updateTimeMinutes(e)}
                        onKeyDown={(e)=> onKeyDownHandler(e)}
                        onFocus={ (e)=> onFocusHandler(e) }
                        defaultValue={getFullMinutes(duration)}
                        className="max-w-10"
                    />
                </div>
                
                
                <div className="relative after:content-['s'] after:absolute after:right-1">
                    <input
                        ref={inpSecRef}
                        type="text"
                        inputMode="numeric"
                        onChange={(e) => updateTimeSeconds(e)}
                        onKeyDown={(e)=> onKeyDownHandler(e)}
                        onFocus={(e)=> onFocusHandler(e) }
                        defaultValue={getRemainingSecs(duration)}
                        className="max-w-9"
                    />
                </div>
                
            </div>
            
            <div className="flex justify-center items-center gap-1">
                <Menu 
                    id={id}
                    duration={duration}
                    color={color}  
                />
                <button
                    onClick={() => deleteTimer(id)}
                    className="bg-red-600 text-white p-2 rounded-full size-8 flex justify-center items-center"
                >
                    <FaXmark className="text-xl" />
                </button>
            </div>
            
        </div>
    )
})

export default Timer
