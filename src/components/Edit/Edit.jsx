import { useContext } from "react"
import { Timers } from "../../contexts/Timers"
import Timer from "./Timer"
import { MdDelete } from "react-icons/md";

function Edit({ updateIsRunning }){
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)
    console.log(currentProfile.prName)

    // Adds another timer to current profile
    function addNewInterval() {
        let newId = parseInt(Math.random() * 10 ** 6)
        let newTimer = {
            running: false,
            duration: 50,
            current: 0,
            id: newId,
        }
        currentProfile.timers.push(newTimer)

        let updatedTimers = [...profiles.filter(profile => !profile.selected)]
        updatedTimers.push(currentProfile)
        updateProfiles(updatedTimers)
    }

    // Delete the current profile
    function deleteProfile(){
        let updatedProfiles = [...profiles.filter(profile => !profile.selected)]
        updatedProfiles[0].selected = true
        updateProfiles(updatedProfiles)
    }

    // Display to modify the timer
    return (
        <div className="max-w-lg">
                <div>
                    <button
                        onClick={() => updateIsRunning(true)}
                        className="bg-white text-red-950 p-2 border-black border-2 rounded-full"
                    >
                        Start
                    </button>
                </div>
                <div>
                    <input 
                        type="text"
                        value={currentProfile.prName}
                        onChange={(e)=>{
                            currentProfile.prName = e.target.value
                            updateCurrentProfile(currentProfile)
                        }}
                    />

                    <button>
                        <MdDelete onClick={deleteProfile} />
                    </button>
                </div>
                <div>
                    {currentProfile.timers.map((timer) => (
                        <Timer
                            key={timer.id}
                            duration={timer.duration}
                            id={timer.id}
                        ></Timer>
                    ))}
                </div>
                <div>
                    <button
                        onClick={addNewInterval}
                        className="bg-red-950 text-white p-2 border-black border-2 rounded-full"
                    >
                        +
                    </button>
                </div>
            </div>
    )
}

export default Edit