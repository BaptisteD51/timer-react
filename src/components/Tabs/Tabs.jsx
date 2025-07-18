import { useContext, useState } from "react"
import { Timers } from "../../contexts/Timers"
import { FaPlus } from "react-icons/fa";
import useDragAndDrop from "../../hooks/useDragAndDrop";

function Tabs({isRunning,updateIsRunning,pause,updatePause}) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    let {draggedItem, updateDraggedItem, dragProps} = useDragAndDrop(onDragStartCallback,onDropOverCallBack) 

    function SelectProfile(profile) {
        // Get all profiles
        let updatedProfiles = [...profiles]

        //The position of the profile in the list
        let prPos = profiles.findIndex((pr) => pr.id == profile.id)

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

        //updatedProfiles.push(profile)
        updateProfiles(updatedProfiles)
    }

    function AddProfile() {
        let updatedProfiles = [...profiles]

        updatedProfiles = updatedProfiles.map((pr) => {
            pr.selected = false
            return pr
        })

        let newProfileId = parseInt(Math.random() * 10 ** 6)
        let newIntervalId = parseInt(Math.random() * 10 ** 6)

        updatedProfiles.push({
            prName: "New Profile",
            id: newProfileId,
            selected: true,
            timers: [
                {
                    running: false,
                    duration: 100,
                    current: 100,
                    id: newIntervalId,
                    color:"bg-orange-400"
                },
            ],
        })

        updateProfiles(updatedProfiles)
    }

    /**
     * When we start dragging a profile
     */
    function onDragStartCallback(id){
        updateDraggedItem(id)
    }

    /**
     * When we drop the dragged profile over 
     */
    function onDropOverCallBack(id){
        let updatedProfiles = [...profiles]
        let draggedPrPos = updatedProfiles.findIndex(profile => profile.id == draggedItem)
        let dropOnPrPos = updatedProfiles.findIndex(profile => profile.id == id)

        let draggedPr = updatedProfiles[draggedPrPos]

        //Delete the dragged profile at its former position
        updatedProfiles.splice(draggedPrPos, 1)
        
        //insert the dragged profile after the dropped on profile
        updatedProfiles.splice(dropOnPrPos,0,draggedPr) 

        //Update the state
        updateProfiles(updatedProfiles)
    }

    return (
        <aside>
            <ul className="bg-orange-50">
                {profiles.map((profile) => (
                    <li
                        key={profile.id}
                        className={`${
                            profile.selected ? "bg-orange-300" : ""
                        } p-4 rounded-l-xl flex justify-center items-center`}
                        onClick={() => SelectProfile(profile)}
                        draggable
                        onDragStart={(e) => dragProps.handleDragStart(e, 'profile', profile.id)}
                        onDragOver={dragProps.handleDragOver}
                        onDrop={(e) => dragProps.handleDropOver(e, 'profile', profile.id)}
                    >
                        <button
                            className="[writing-mode:vertical-lr]"
                        >
                            {profile.prName}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center my-5">
                <button
                    className="text-orange-700 text-l border-2 border-orange-700 p-1 rounded-md"
                    onClick={AddProfile}
                >
                    <FaPlus/>
                </button>
            </div>
        </aside>
    )
}

export default Tabs
