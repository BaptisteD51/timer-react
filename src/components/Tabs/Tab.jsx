import { useContext, useRef, useState } from "react"
import { Timers } from "../../contexts/Timers"
import useDragAndDrop from "../../hooks/useDragAndDrop"

function Tab({ id, selected, prName, updatePause, isRunning, updateIsRunning }) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    //Drag and drop
    let hoverClasses = ['bg-yellow-200']
    let {handleDragEnter, handleDragLeave, handleDropOver,handleDragStart,handleDragOver} = useDragAndDrop(hoverClasses)

    function changeTabPosition(draggedId, dropId){

        //The index of the dragged tab
        let draggedTabIdx = profiles.findIndex((pr)=> pr.id == draggedId)
        //The index of the droped on tab
        let dropTabIdx = profiles.findIndex((pr)=> pr.id == dropId)

        let draggedTab = profiles[draggedTabIdx]

        //Destroys the dragged timer at its former position
        profiles.splice(draggedTabIdx,1)
        //Put the dragged timer after the dropped on timmer
        profiles.splice(dropTabIdx,0,draggedTab)

        let updatedProfiles = [...profiles]

        updateProfiles(updatedProfiles)
    }

    function SelectProfile(id) {
        // Get all profiles
        let updatedProfiles = [...profiles]

        //The position of the profile in the list
        let prPos = profiles.findIndex((pr) => pr.id == id)
        
        //Get the clicked profile via its position
        let profile = profiles[prPos]

        // Set all profiles as unselected
        updatedProfiles = updatedProfiles.map((pr) => {
            pr.selected = false
            return pr
        })

        // Set the clicked profile as selected
        profile.selected = true

        // Replace the profile with the selected profile
        updatedProfiles[prPos] = profile

        // If timer is running, reset the running and pause state, and set countdowns to 0
        if(isRunning){
            updatePause(false)
            updateIsRunning(false)

            updatedProfiles.forEach(profile => {
                profile.timers.forEach(timer =>{
                    timer.current = timer.duration
                    timer.running = false
                })
            })
        }
        
        updateProfiles(updatedProfiles)
    }

    return (
        <li
            className={`${
                selected ? "bg-orange-300" : ""
            } p-4 rounded-l-xl flex justify-center items-center`}
            onClick={() => SelectProfile(id)}
            draggable
            //handleDragEnter, handleDragLeave,
            onDragStart={(e) => handleDragStart(e, "tab", id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropOver(e, "tab", id, changeTabPosition)}
            onDragEnter={(e) => handleDragEnter(e,id)}
            onDragLeave={(e) => handleDragLeave(e)}
        >
            <button className="[writing-mode:vertical-lr]">
                {prName}
            </button>
        </li>
    )
}


export default Tab
