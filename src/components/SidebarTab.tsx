import { Project } from '../utils/interfaces'
import { selectedTabStyle } from '../utils/dynamicStyles'
import '../components.css'

export default function SidebarTab({project, selectedProjectId, setSelectedProjectId}: 
  {project: Project, selectedProjectId: number, setSelectedProjectId: React.Dispatch<React.SetStateAction<number>>}) {
  return (
    <div 
      className="sidebar-tab"
      style={selectedProjectId === project.id ? selectedTabStyle : {}}
      onClick={() => setSelectedProjectId(project.id)}
    >
      <p className="sidebar-tab-title">{project.name}</p>
    </div>
  )
}