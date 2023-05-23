import './App.css'
import Sidebar from './components/Sidebar'
import SettingsCard from './components/SettingsCard'

function App() {

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <div className="settings-container">
          <SettingsCard />
        </div>
        <div className="saved-container">
          <h2 className="saved-container-title">saved values</h2>
        </div>
      </div>
    </div>
  )
}

export default App
