import { useState, useContext } from "react"
import Timer from "./components/Edit/Timer"
import Track from "./components/Track/Track"
import Edit from "./components/Edit/Edit"
import Tabs from "./components/Tabs/Tabs"
import { Timers, TimersProvider } from "./contexts/Timers"

function App() {
    // Switch between running and edit mode
    let [isRunning, updateIsRunning] = useState(false)
    
    return (
        <TimersProvider>
            <h1 className="text-2xl font-bold">
                Sport timer - made with React
            </h1>
            <div className="flex">
                <Tabs />
                {isRunning ? (
                    <Track
                        isRunning={isRunning}
                        updateIsRunning={updateIsRunning}
                    >
                        <Timer />
                    </Track>
                ) : (
                    <Edit
                        isRunning={isRunning}
                        updateIsRunning={updateIsRunning}
                    />
                )}
            </div>
        </TimersProvider>
    )
}

export default App
