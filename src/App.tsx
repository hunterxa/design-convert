import { useState, useEffect } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Sidebar from './components/Sidebar'
import SettingsCard from './components/SettingsCard'
import SavedConversion from './components/SavedConversion'
import { Project } from './utils/interfaces'
import { getProjectsFromStorage, saveProjectsToStorage } from './utils/storage'
import './App.css'

function App() {

  const [savedProjects, setSavedProjects] = useState<Project[]>(getProjectsFromStorage())

  //Keeping track of which project is selected in the sidebar
  //Special styling applied to that project and it's saved conversions are loaded
  //Loading first project by default
  const [selectedProjectId, setSelectedProjectId] = useState<number>(savedProjects[0].id)

  //When the user clicks the delete button, confirm and cancel buttons will appear
  //This state is used to toggle those buttons
  const [showDeleteOptions, setShowDeleteOptions] = useState<boolean>(false)

  const [parent, enableAnimations] = useAutoAnimate<HTMLDivElement>()

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
      id: savedProjects[savedProjects.length - 1].id + 1,
      name: 'New Project',
      conversions: []
    }
    setSavedProjects(prevSavedProjects => [...prevSavedProjects, newProject])
    setSelectedProjectId(newProject.id)
  }

  const deleteProject = (id: number) => {
    setSavedProjects(prevSavedProjects => prevSavedProjects.filter(project => project.id !== id))
    setSelectedProjectId(savedProjects[0].id)
    setShowDeleteOptions(false)
  }

  const getSelectedProjectConversions = () => {
    const selectedProject = savedProjects.find(project => project.id === selectedProjectId)
    if (selectedProject) {
      return selectedProject.conversions
    } else {
      return []
    }
  }

  //Get conversions array from the selected project and map it to a list of SavedConversion components
  const savedConversionsList = getSelectedProjectConversions().map((conversion, index) => {
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

  //Small component with confirmation and cancel buttons
  //Only shown when delete button is clicked
  const DeleteOptions = () => {
    return (
      <div className="delete-options">
        <button className="delete-options-confirm project-button" onClick={() => deleteProject(selectedProjectId)}>
          confirm
        </button>
        <button className="delete-options-cancel" onClick={() => setShowDeleteOptions(false)}>cancel</button>
      </div>
    )
  }

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
            <div ref={parent} className="project-buttons">
              <button className="project-button new-project" onClick={createNewProject}>new project</button>
              {/* Only show delete button when there is more than one project */}
              { savedProjects.length > 1 && (
                <button
                  className="project-button delete-project"
                  onClick={() => setShowDeleteOptions(true)}
                >
                    delete project
                </button>
              )}
              { showDeleteOptions && <DeleteOptions /> } 
            </div>
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
