import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import SettingsCard from './components/SettingsCard'
import SavedConversion from './components/SavedConversion'
import { Conversion, Project } from './utils/interfaces'
import { getProjectsFromStorage, saveProjectsToStorage } from './utils/storage'
import './App.css'

function App() {

  const [savedProjects, setSavedProjects] = useState<Project[]>(getProjectsFromStorage())

  //Keeping track of which project is selected in the sidebar
  //Special styling applied to that project and it's saved conversions are loaded
  //Loading first project by default
  const [selectedProjectId, setSelectedProjectId] = useState<number>(savedProjects[0].id)

  //Save conversions to local storage when the savedConversions state changes
  useEffect(() => {
    saveProjectsToStorage(savedProjects)
  }, [savedProjects])

  //Function to save a conversion when the user clicks the save button
  //Is passed to the SettingsCard component, where the save button lives
  const handleSave = (pxValue: number, remValue: number) => {
    setSavedProjects(prevSavedProjects => {
      const newSavedProjects = prevSavedProjects.map(project => {
        if (project.id === selectedProjectId) {
          return {
            ...project,
            conversions: [...project.conversions, { pxValue, remValue }]
          }
        } else {
          return project
        }
      })
      return newSavedProjects
    })
  }

  //Function to delete a conversion from state
  //Is passed the index and filters out that conversion from state
  const deleteConversion = (index: number) => {
    setSavedProjects(prevSavedProjects => {
      const newSavedProjects = prevSavedProjects.map(project => {
        if (project.id === selectedProjectId) {
          return {
            ...project,
            conversions: project.conversions.filter((conversion, i) => i !== index)
          }
        } else {
          return project
        }
      })
      return newSavedProjects
    })
  }

  const createNewProject = () => {
    const newProject: Project = {
      id: savedProjects.length,
      name: `Project ${savedProjects.length + 1}`,
      conversions: []
    }
    setSavedProjects(prevSavedProjects => [...prevSavedProjects, newProject])
    setSelectedProjectId(newProject.id)
  }

  //Get conversions array from the selected project and map it to a list of SavedConversion components
  const savedConversionsList = savedProjects[selectedProjectId].conversions.map((conversion, index) => {
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
      <Sidebar
        projects={savedProjects}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
      <div className="content">
        <div className="settings-container">
          <SettingsCard saveConversion={handleSave} />
        </div>
        <div className="saved-container">
          <div className="saved-container-top-bar">
            <h2 className="saved-container-title">saved values</h2>
            <button className="new-project-button" onClick={createNewProject}>new project</button>  
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
