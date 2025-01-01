import { useState } from "react"
import Timer from "./components/Timer"
import Track from "./components/Track"
import { TimersProvider } from "./contexts/Timers"

function App() {
    return (
        <TimersProvider>
            Timers
            <h1>Sport timer - made with React</h1>
            <Track>
                <Timer />
            </Track>
        </TimersProvider>
    )
}

export default App
