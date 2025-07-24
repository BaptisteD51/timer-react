import { useState } from "react"

function useDragAndDrop(onDragStartCallBack, onDropCallBack, hoverClasses){
    let [draggedItemElt, setDraggedItemElt] = useState(null)
    
    let dragDepth = 0

    /**
     * When we start dragging a profile
     */
    function handleDragStart(e, type, data, elt, ...args){
        // Sets the type of dragged object
        e.dataTransfer.setData("application/json", JSON.stringify({type:type,data:data}))
        setDraggedItemElt(elt)

        onDragStartCallBack(...args)
    }

    /**
     * Allow to drop something on the profile
     */
    function handleDragOver(e){
        e.preventDefault()
    }

    /**
     * Put the hoverClass when entering a valid position
     */
    function handleDragEnter(e){
        e.preventDefault()
        let draggedOverItem = e.currentTarget
        dragDepth++
        //console.log(dragDepth)
        
        if (dragDepth == 1){
            if(draggedOverItem != draggedItemElt){
            hoverClasses.forEach(function(c){
                //console.log("ajout")
                draggedOverItem.classList.add(c)
            })
        }
        }
        
    }

    /**
     * Removeing the hoverClass when leaving a valid position
     */
    function handleDragLeave(e){
        e.preventDefault()
        let leftItem = e.currentTarget
        dragDepth++
        
        if (dragDepth == 0){
            hoverClasses.forEach(function(c){
                console.log("remove")
                leftItem.classList.remove(c)
            })
        }
            
        //}
        
        
        
    }

    /**
     * When we drop the dragged profile over 
     */
    function handleDropOver(e, type, elt,...args){
        e.preventDefault()
        
        console.log('data', e.dataTransfer.getData('application/json') )
        let object = JSON.parse(e.dataTransfer.getData('application/json'))

        // Checks if the dropped item is of the same type
        if ( e.dataTransfer.getData('application/json') == type ){
            
            //Remove the hover classes from dropped on elt
            hoverClasses.forEach(function(c){
                elt.classList.remove(c)
            })
           
            onDropCallBack(object, ...args)
        }
    }

    return {
        dragProps:{
            handleDragStart,
            handleDragOver,
            handleDropOver,
            handleDragEnter,
            handleDragLeave
        }
    }
}

export default useDragAndDrop