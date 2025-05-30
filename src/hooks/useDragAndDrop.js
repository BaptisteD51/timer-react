import { useState } from "react"

function useDragAndDrop(onDragStartCallBack, onDropCallBack){
    let [draggedItem, updateDraggedItem] = useState(null)
    
    /**
     * When we start dragging a profile
     */
    function handleDragStart(e, ...args){
        onDragStartCallBack(...args)
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
    function handleDropOver(e, ...args){
        e.preventDefault()
        onDropCallBack(...args)
    }

    return {
        draggedItem,
        updateDraggedItem,
        dragProps:{
            handleDragStart,
            handleDragOver,
            handleDropOver
        }
    }
}

export default useDragAndDrop