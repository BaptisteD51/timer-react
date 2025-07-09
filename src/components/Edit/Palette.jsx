import { useContext, useRef } from "react"
import { Timers } from "../../contexts/Timers.jsx"
import useMenu from '../../hooks/useMenu.js'

function Palette({ intervalId }) {
    let colors = [
        "bg-blue-500",
        "bg-red-500",
        "bg-yellow-200",
        "bg-green-500",
        "bg-orange-400",
        "bg-amber-900",
        "bg-pink-400",
        "bg-fuchsia-500",
    ]

    // used to retrieve the elment in the dom
    let paletteRef = useRef(null)

    let {showMenu, setShowMenu} = useMenu(paletteRef)

    let { currentProfile, updateCurrentProfile } = useContext(Timers)

    function changeIntervalColor(color, intervalId) {
        let intervalIndex = currentProfile.timers.findIndex(
            (timer) => timer.id == intervalId
        )

        currentProfile.timers[intervalIndex].color = color

        updateCurrentProfile(currentProfile)
    }

    return (
        <div
            ref={paletteRef}
        >
            {showMenu && (
                <div 
                    className="absolute bottom-full left-1/2 bg-white flex flex-wrap w-36 p-2 gap-2 justify-center -translate-x-1/2 rounded-lg mb-2"
                >
                    {colors.map((color) => (
                        <button
                            className={`border-4 border-black rounded-sm size-6 ${color}`}
                            key={color}
                            onClick={() => {
                                changeIntervalColor(color, intervalId)
                                setShowMenu(false)
                            }}
                        ></button>
                    ))}
                </div>
            )}

            <button
                className="bg-red-600 border-4 border-black rounded-sm size-6"
                onClick={() => setShowMenu(!showMenu)}
            ></button>
        </div>
    )
}

export default Palette
