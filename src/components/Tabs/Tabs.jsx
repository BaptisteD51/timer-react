import { useContext, useState, useRef } from "react"
import { Timers } from "../../contexts/Timers"
import { FaPlus } from "react-icons/fa";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import Tab from "./Tab.jsx"

function Tabs({isRunning,updateIsRunning,pause,updatePause}) {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } = useContext(Timers)

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

    return (
        <aside>
            <ul className="bg-orange-50">
                {profiles.map((profile) => (
                    <Tab 
                        key = {"tab" + profile.id}
                        id = {profile.id}
                        selected = {profile.selected}
                        prName = {profile.prName}
                        updatePause = {updatePause}
                        isRunning = {isRunning}
                        updateIsRunning = {updateIsRunning}
                    />
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
