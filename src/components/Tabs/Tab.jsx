import { useContext, useRef, useState } from "react"
import { Timers } from "../../contexts/Timers"
import useDragAndDrop from "../../hooks/useDragAndDrop"

function Tab({ id, selected, prName, updatePause, isRunning, updateIsRunning,obj,setObj }) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    //Drag and drop
    let hoverClasses = ['bg-yellow-200']
    let {handleDragEnter, handleDragLeave, handleDropOver,handleDragStart,handleDragOver} = useDragAndDrop(hoverClasses)

    function changeTabPosition(draggedId, dropId){
        console.log("draggedId", draggedId)
        console.log("dropId", dropId)
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

    /// Drag and drop

    function handleTouchStart(e,type,id,ref){
        e.preventDefault()
        console.log("je commence")
        //console.log('e.touches',e.touches)
        console.log('start e.touches[0]', e.touches[0])
        //console.log(e.currentTarget)
        if( (e.currentTarget.contains(e.touches[0].target) ) || e.currentTarget ==  e.touches[0].target){
            console.log(obj)
            setObj(
                {
                    type:type,
                    id:id,
                    elt:ref.current
                }
            )
        } 
    }

    function handleTouchEnd(e){
        e.preventDefault()
        console.log("j'annule tout")
        setObj(null)
        // The touch points that have changed
        //console.log(e.changedTouches)
        console.log('e',e)
        console.log('end e.changedTouches[0]',e.changedTouches[0])
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
        
        let eltFrmPnt = document.elementFromPoint(x,y)

        let tabs = document.querySelectorAll("[data-type='tab']")

        tabs.forEach((tab) => {
            if ( tab.contains(eltFrmPnt) || tab == eltFrmPnt ){

                if (tab.dataset.id == obj.id) {
                    console.log('same item')
                    return
                }
                console.log('valid drop position')
                console.log(tab.dataset.id)
                changeTabPosition(obj.id, tab.dataset.id)
            }
        })
        
    }
    
    // A voir si la désactivation du scroll navigateur ne se fait pas juste avec touch-action:none
    function handleTouchMove(e){
        e.preventDefault()
    }

    // ref pour le drag and drop mobile
    let tabRef = useRef(null)
    //console.log(tabRef)
    //console.log(obj)

    return (
        <li
            className={`${
                selected ? "bg-orange-300" : ""
            } p-4 rounded-l-xl flex justify-center items-center [touch-action:none]`}
            onClick={() => SelectProfile(id)}
            draggable

            // Drag and drop mouse
            onDragStart={(e) => handleDragStart(e, "tab", id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDropOver(e, "tab", id, changeTabPosition)}
            onDragEnter={(e) => handleDragEnter(e,"tab",id)}
            onDragLeave={(e) => handleDragLeave(e)}
            
            // Drag and drop mobile
            onTouchStart={(e) => handleTouchStart(e,"tab",id,tabRef)}
            onTouchEnd={(e) => handleTouchEnd(e)}
            data-id = {id}
            data-type = {"tab"}
            ref = {tabRef}
            /* onTouchMove={(e) => handleTouchMove(e)} */
        >
            <button className="[writing-mode:vertical-lr]">
                {prName}
                <span className="text-red-800"> {id}</span>
            </button>
        </li>
    )
}


export default Tab
