import { useState } from "react"

function useDragAndDrop(hoverClasses){
    let [draggedItemElt, setDraggedItemElt] = useState(null)
    
    let dragDepth = 0

    /**
     * When we start dragging a profile
     */
    function handleDragStart(e,type,id){
        let data = {
            type:type,
            id:id
        }
        e.dataTransfer.setData("application/json", JSON.stringify(data) )
    }

    /**
     * Allow to drop something on the profile
     */
    function handleDragOver(e){
        e.preventDefault()
    }


    /**
     * Removeing the hoverClass when leaving a valid position
     */
    function handleDragLeave(e){
        dragDepth--

        if (dragDepth == 0){
            hoverClasses.forEach(function(c){
                e.currentTarget.classList.remove(c)
            })
        }
        
    }

    /**
     * Put the hoverClass when entering a valid position
     */
    function handleDragEnter(e,id){
        dragDepth++
        let data = JSON.parse(e.dataTransfer.getData("application/json"))
        let draggedId = data.id

        if (draggedId == id){
            return
        } 

        if (dragDepth == 1){
            hoverClasses.forEach(function(c){

                e.currentTarget.classList.add(c)
            })
        }
    }

    /**
     * When we drop the dragged profile over 
     */
    function handleDropOver(e,type,id,dropOverCallBack){
        let data = JSON.parse(e.dataTransfer.getData("application/json"))

        if(data.type != type){
            e.preventDefault()
        } else {
            hoverClasses.forEach(function(c){
                e.currentTarget.classList.remove(c)
            })
            dropOverCallBack(data.id, id)
        }
    }

    return {
        handleDragEnter,
        handleDragLeave,
        handleDropOver,
        handleDragStart,
        handleDragOver,
    }
}

export default useDragAndDrop