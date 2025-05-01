import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import Timer from "./Timer"
import { MdDelete } from "react-icons/md";
import { FaPlay, FaPlus } from "react-icons/fa";

function Edit({ updateIsRunning }){
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

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

        let updatedTimers = [...profiles.filter(profile => !profile.selected)]
        updatedTimers.push(currentProfile)
        updateProfiles(updatedTimers)
    }

    // Delete the current profile
    function deleteProfile(){
        let updatedProfiles = [...profiles.filter(profile => !profile.selected)]
        
        //Checks if their is a least one last profile to show 
        if (updatedProfiles.length > 0 ){
            updatedProfiles[0].selected = true
            updateProfiles(updatedProfiles)
        }
        
    }

    // Display to modify the timer
    return (
        <>
                <div className="flex justify-center my-3">
                    <input 
                        type="text"
                        value={currentProfile.prName}
                        onChange={(e)=>{
                            currentProfile.prName = e.target.value
                            updateCurrentProfile(currentProfile)
                        }}
                        className="font-bold text-center text-2xl rounded-lg"
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
                        className="bg-orange-600 text-orange-50 font-bold p-2 border-black border-2 rounded-full flex w-full items-center justify-center gap-1 my-6"
                    >
                        <FaPlay/> Start
                    </button>
                </div>
                
                <div>
                    {currentProfile.timers.map((timer) => (
                        <Timer
                            key={timer.id}
                            duration={timer.duration}
                            color={timer.color}
                            id={timer.id}
                        ></Timer>
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