import { useState } from "react"
import Timer from "./components/Timer"
import Track from "./components/Track"
import Edit from "./components/Edit"
import { TimersProvider } from "./contexts/Timers"

function App() {
    // Switch between running and edit mode
    let [isRunning, updateIsRunning] = useState(false)

    return (
        <TimersProvider>
            Timers
            <h1>Sport timer - made with React</h1>
            
            { isRunning ? (
                    <Track isRunning={isRunning} updateIsRunning={updateIsRunning}>
                        <Timer />
                    </Track>
                ) : (
                    <Edit isRunning={isRunning} updateIsRunning={updateIsRunning} />
                )
            }
            
        </TimersProvider>
    )
}

export default App
