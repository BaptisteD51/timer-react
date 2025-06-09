import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import Timer from "./Timer"
import { MdDelete } from "react-icons/md";
import { FaPlay, FaPlus } from "react-icons/fa";
import useDragAndDrop from "../../hooks/useDragAndDrop.js";

function Edit({ updateIsRunning }){
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    let {draggedItem,updateDraggedItem,dragProps} = useDragAndDrop(onDragStartCallBack,onDropCallBack)

    function onDragStartCallBack(id){
        updateDraggedItem(id)
    }

    function onDropCallBack(id){
        //The index of the dragged timer
        let draggedTimerIndex = currentProfile.timers.findIndex((timer)=> timer.id == draggedItem)
        //The index of the droped on timer
        let dropOnTimerIndex = currentProfile.timers.findIndex((timer)=> timer.id == id)

        let draggedTimer = currentProfile.timers[draggedTimerIndex]

        //Destroys the dragged timer at its former position
        currentProfile.timers.splice(draggedTimerIndex,1)
        //Put the dragged timer after the dropped on timmer
        currentProfile.timers.splice(dropOnTimerIndex,0,draggedTimer)

        updateCurrentProfile(currentProfile)
    }

    // Adds another timer to current profile
    function addNewInterval() {
        let newId = parseInt(Math.random() * 10 ** 6)
        let newTimer = {
            running: false,
            duration: 50,
            current: 0,
            id: newId,
            color:"bg-orange-400"
        }
        currentProfile.timers.push(newTimer)

        updateCurrentProfile(currentProfile)
    }

    // Delete the current profile
    function deleteProfile(){
        let updatedProfiles = [...profiles.filter(profile => !profile.selected)]
        
        //Checks if their is a least one last profile to display 
        if (updatedProfiles.length > 0 ){
            updatedProfiles[0].selected = true
            updateProfiles(updatedProfiles)
        }
        
    }

    // Display to modify the timer
    return (
        <>
                <div className="flex justify-center my-3 gap-2">
                    <input 
                        type="text"
                        value={currentProfile.prName}
                        onChange={(e)=>{
                            currentProfile.prName = e.target.value
                            updateCurrentProfile(currentProfile)
                        }}
                        className="font-bold text-center text-2xl rounded-lg flex-1 max-w-72"
                    />

                    <button>
                        <MdDelete 
                            onClick={deleteProfile} 
                            size={30}
                            className="text-red-900"
                        />
                    </button>
                </div>
                
                <div className="flex justify-center">
                    <button
                        onClick={() => updateIsRunning(true)}
                        className="bg-orange-600 text-orange-50 font-bold p-2 border-black border-2 rounded-full w-full flex items-center justify-center gap-1 my-6"
                    >
                        <FaPlay/> Start
                    </button>
                </div>
                
                <div
                >
                    {currentProfile.timers.map((timer) => (
                        <div
                            key={timer.id}
                            onDragStart={(e) => dragProps.handleDragStart(e, 'timer', timer.id) }
                            onDragOver={dragProps.handleDragOver}
                            onDrop={(e) => dragProps.handleDropOver(e, 'timer', timer.id)}
                        >
                            <Timer
                                duration={timer.duration}
                                color={timer.color}
                                id={timer.id}
                            ></Timer>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center">
                    <button
                        onClick={addNewInterval}
                        className="text-red-800 border-red-800 font-bold text-4xl flex justify-center items-center p-0"
                    >
                        <FaPlus/>
                    </button>
                </div>
            </>
    )
}

export default Edit