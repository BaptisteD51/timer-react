import { useState } from "react"

function useDragAndDrop(onDragStartCallBack, onDropCallBack){
    let [draggedItem, updateDraggedItem] = useState(null)

    /**
     * When we start dragging a profile
     */
    function handleDragStart(e, type, ...args){
        // Sets the type of dragged object
        e.dataTransfer.setData('text/plain', type)

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
    function handleDropOver(e, type, ...args){
        e.preventDefault()
        
        // Checks if the dropped item is of the same type
        if ( e.dataTransfer.getData('text/plain') == type ){
            onDropCallBack(...args)
        }
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