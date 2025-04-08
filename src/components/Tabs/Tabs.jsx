import { useContext } from "react"
import { Timers } from "../../contexts/Timers"

function Tabs() {
    let { profiles, updateProfiles, currentProfile, updateCurrentProfile } =
        useContext(Timers)

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
                },
            ],
        })

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
                        } p-4 rounded-l-xl`}
                        onClick={() => SelectProfile(profile)}
                    >
                        <button>{profile.prName}</button>
                    </li>
                ))}
            </ul>
            <button
                className="bg-orange-700 text-white p-2 border-black border-2 rounded-full"
                onClick={AddProfile}
            >
                {" "}
                +{" "}
            </button>
        </aside>
    )
}

export default Tabs
