import { useContext, useState } from "react"
import { Timers } from "../../contexts/Timers"
import { FaPlus } from "react-icons/fa";

function Tabs() {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

    let [draggedPrId, updateDraggedPrId] = useState(null)

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
                    current: 0,
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
    function handleDragStart(e, id){
        updateDraggedPrId(id)
    }

    /**
     * Allow to drop something on the profile
     */
    function handleDragOver(e){
        e.preventDefault()
    }

    /**
     * When we drop the dragged profile over 
     */
    function handleDropHover(e, id){
        e.preventDefault()

        let updatedProfiles = [...profiles]
        let draggedPrPos = updatedProfiles.findIndex(profile => profile.id == draggedPrId)
        let dropOnPrPos = updatedProfiles.findIndex(profile => profile.id == id)

        let draggedPr = updatedProfiles[draggedPrPos]
        
        //Delete the dragged profile at its former position
        updatedProfiles.splice(draggedPrPos, 1)

        //insert the dragged profile after the dropped on profile
        updatedProfiles.splice(dropOnPrPos,0,draggedPr) 
    }

    return (
        <aside>
            <ul className="bg-orange-50">
                {profiles.map((profile) => (
                    <li
                        key={profile.id}
                        className={`${
                            profile.selected ? "bg-orange-300" : ""
                        } p-4 rounded-l-xl`}
                        onClick={() => SelectProfile(profile)}
                        draggable
                        onDragStart={(e) => handleDragStart(e, profile.id)}
                        onDragOver={(e)=> handleDragOver(e)}
                        onDrop={(e) => handleDropHover(e, profile.id)}
                    >
                        <button>{profile.prName}</button>
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
