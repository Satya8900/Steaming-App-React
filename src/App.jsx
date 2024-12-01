import Home from "./pages/Home"
import { Route, Routes } from 'react-router-dom'
import MovieAndShows from "./pages/MovieAndShows"
import OpenMovie from "./pages/OpenMovie"
import OpenShow from "./pages/OpenShow"
import Support from "./pages/Support"
import UpgradeSubscription from "./pages/UpgradeSubscription"
import NavigationBar from "./components/NavigationBar"
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react"

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <LoadingBar
        height = {3}
        color='rgb(229, 0, 0)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
     <NavigationBar/>
    <Routes>
      <Route path="/" element={<Home setProgress= {setProgress}/>} />
      <Route path="/movie&shows" element={<MovieAndShows/>} />
      <Route path="/openmovie" element={<OpenMovie/>} />
      <Route path="/openshow" element={<OpenShow/>} />
      <Route path="/support" element={<Support/>} />
      <Route path="/upgradesubscription" element={<UpgradeSubscription/>} />
    </Routes>
    </div>
  )
}

export default App
