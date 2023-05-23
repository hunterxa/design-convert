import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import SettingsCard from './components/SettingsCard'
import SavedConversion from './components/SavedConversion'
import { Conversion } from './utils/interfaces'
import { saveConversionsToStorage, getConversionsFromStorage } from './utils/storage'
import './App.css'

function App() {

  const [savedConversions, setSavedConversions] = useState<Conversion[]>(getConversionsFromStorage())

  //Save conversions to local storage when the savedConversions state changes
  useEffect(() => {
    saveConversionsToStorage(savedConversions)
  }, [savedConversions])

  //Function to save a conversion when the user clicks the save button
  //Is passed to the SettingsCard component, where the save button lives
  const handleSave = (pxValue: number, remValue: number) => {
    setSavedConversions([...savedConversions, {pxValue, remValue}])
  }

  //Funciton to delete a conversion from state
  //Is passed the index and filters out that conversion from state
  const deleteConversion = (index: number) => {
    setSavedConversions(savedConversions.filter((conversion, i) => i !== index))
  }

  const savedConversionsList = savedConversions.map((conversion, index) => {
    return (
      <SavedConversion 
        key={index}
        pxValue={conversion.pxValue} 
        remValue={conversion.remValue} 
        deleteConversion={deleteConversion}
        index={index}
      />
    )
  })

  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <div className="settings-container">
          <SettingsCard saveConversion={handleSave} />
        </div>
        <div className="saved-container">
          <div className="saved-container-top-bar">
            <h2 className="saved-container-title">saved values</h2>
          </div>
          <div className="saved-container-grid">
            {savedConversionsList}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
