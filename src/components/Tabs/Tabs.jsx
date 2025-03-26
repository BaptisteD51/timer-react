import { useContext } from "react"
import { Timers } from "../../contexts/Timers"

function Tabs() {
    let { timers, updateTimers } = useContext(Timers)

    function SelectProfile(profile) {
        // Get all profiles except the one to be selected
        let profiles = [...timers.filter((pr) => pr.id != profile.id)]

        // Set all profiles as unselected
        profiles = profiles.map((pr) => {
            pr.selected = false
            return pr
        })

        // Set the clicked profile as selected and update profiles
        profile.selected = true
        profiles.push(profile)
        updateTimers(profiles)
    }

    function AddProfile(){
        let profiles = [...timers]

        profiles = profiles.map((pr) => {
            pr.selected = false
            return pr
        })

        let newProfileId = parseInt(Math.random() * 10 ** 6)
        let newIntervalId = parseInt(Math.random() * 10 ** 6)

        profiles.push({
            prName : "New Profile",
            id : newProfileId,
            selected : true,
            timers : [
                {
                    running: false,
                    duration: 100,
                    current: 0,
                    id: newIntervalId,
                }
            ]    
        })

        updateTimers(profiles)
    }

    return (
        <aside>
            <ul>
                {timers.map((profile) => (
                    <li
                        key={profile.id}
                        className="bg-orange-300 rounded-full p-2"
                        onClick={() => SelectProfile(profile)}
                    >
                        <button>{profile.prName}</button>
                    </li>
                ))}
            </ul>
            <button
                className="bg-orange-700 text-white p-2 border-black border-2 rounded-full"
                onClick={AddProfile}
            > + </button>
        </aside>
    )
}

export default Tabs
