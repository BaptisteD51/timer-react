import { useState, useContext } from "react"
import Timer from "./components/Edit/Timer"
import Track from "./components/Track/Track"
import Edit from "./components/Edit/Edit"
import Tabs from "./components/Tabs/Tabs"
import { Timers, TimersProvider } from "./contexts/Timers"

function App() {
    // Switch between running and edit mode
    let [isRunning, updateIsRunning] = useState(false)

    // Pause the timer
    let [pause, updatePause] = useState(false)


    return (
        <TimersProvider>
            <main className="w-4xl max-w-full flex flex-col items-center mx-2 mb-12">
                <h1 className="text-3xl font-bold text-center my-6">Sport timer</h1>
                <div className="max-sm:w-full sm:w-[640px] flex justify-center rounded-xl bg-orange-50 overflow-hidden shadow-xl">
                    <Tabs
                        isRunning={isRunning}
                        updateIsRunning={updateIsRunning}
                        pause={pause}
                        updatePause={updatePause}
                    />

                    <div className="bg-orange-300 p-4 flex-1">
                        
                        {isRunning ? (
                            <Track
                                isRunning={isRunning}
                                updateIsRunning={updateIsRunning}
                                pause={pause}
                                updatePause={updatePause}
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
                </div>
            </main>
        </TimersProvider>
    )
}

export default App
