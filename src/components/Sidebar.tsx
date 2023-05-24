import SidebarTab from './SidebarTab'
import { Project } from '../utils/interfaces'
import '../components.css'

export default function Sidebar({ projects, selectedProjectId, setSelectedProjectId }: 
  { projects: Project[], selectedProjectId: number, setSelectedProjectId: React.Dispatch<React.SetStateAction<number>>}) {

  const projectTabElements = projects.map(project => {
    return (
      <SidebarTab
        key={project.id}
        project={project}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
    )
  })

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">design convert</h1>
      {projectTabElements}
    </div>
  )
}