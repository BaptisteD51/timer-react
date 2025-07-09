import { useState, useContext, useRef, useEffect } from "react"
import { FaEllipsisV } from "react-icons/fa"
import { Timers } from "../../contexts/Timers.jsx"
import useMenu from '../../hooks/useMenu.js'

function Menu({id,duration,color}){
    let { currentProfile, updateCurrentProfile } = useContext(Timers)

    // used to retrieve the elment in the dom
    let menuRef = useRef(null)

    let {showMenu,setShowMenu} = useMenu(menuRef)

    // Replicates the timer and add it afterwards
    function duplicateProfile(){
        let newId = parseInt(Math.random() * 10 ** 6)
        
        let dupTimer = {
            running  : false,
            duration : duration,
            current  : duration,
            id       : newId,
            color    : color
        }

        // Find the position of the current timer
        let currentTimerIndex =  currentProfile.timers.findIndex( timer => timer.id == id)

        // Adds the duplicated timer after it
        currentProfile.timers.splice(currentTimerIndex,0,dupTimer)

        updateCurrentProfile(currentProfile)
        setShowMenu(false)
    }

    useEffect(() => {
            function handleClickOutside(e) {
                //the left condition is there to check the existence of the ref. More robust
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setShowMenu(false)
                }
            }
    
            if (showMenu) {
                document.addEventListener("mousedown", handleClickOutside)
            }
    
            return function () {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [showMenu, setShowMenu]
    )

    return (
        <div className="relative"
        ref={menuRef}
        >
            { showMenu && (
                <div
                    className="absolute bottom-full right-0 bg-white flex flex-wrap mb-2 rounded-lg"
                >
                    <button 
                        className="p-2 pr-5"
                        onClick={()=>duplicateProfile()}
                    >
                        Duplicate
                    </button>
                </div>    
            )}
            <button 
                className="px-2"
                onClick={()=>setShowMenu(!showMenu)}
            >
                <FaEllipsisV className="text-2xl"/>
            </button>
        </div>
    )
}

export default Menu