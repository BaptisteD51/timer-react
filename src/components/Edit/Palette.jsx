import { useContext } from "react"
import { Timers } from "../../contexts/Timers.jsx"

function Palette({updateShwColPick, intervalId}){
    let colors = ["bg-blue-500", "bg-red-500", "bg-yellow-200", "bg-green-500", "bg-orange-400", "bg-amber-900", "bg-pink-400", "bg-fuchsia-500"]
    
    let {currentProfile, updateCurrentProfile} = useContext(Timers)

    function changeIntervalColor(color, intervalId) {
        let intervalIndex = currentProfile.timers.findIndex((timer) => timer.id == intervalId)

        currentProfile.timers[intervalIndex].color = color

        updateCurrentProfile(currentProfile)
    }

    return (
        
        <div className="absolute bottom-full left-1/2 bg-white flex flex-wrap w-36 p-2 gap-2 justify-center -translate-x-1/2">
            {colors.map((color) => (
                <button
                    className={`bg-red-600 border-4 border-black rounded-sm size-6 ${color}`}
                    key={color}
                    onClick={() => {
                        changeIntervalColor(color, intervalId)
                        updateShwColPick(false)
                    }}
                >
                </button>
            )
            )}
        </div>
    )
}

export default Palette