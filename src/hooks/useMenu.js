import { useState, useEffect } from "react"

// Used to open or close a menu in the interface
// The menu is closed when cliked outside
// This custom hook is here to reuse the logic for several menus  
function useMenu(menuRef){
    let [showMenu, setShowMenu] = useState(false)

    console.log('hello')

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
        }, [showMenu, setShowMenu, menuRef])

    return { showMenu, setShowMenu }
}

export default useMenu