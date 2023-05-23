import { useState } from 'react'
import {
  selectedButtonStyle,
  unselectedButtonStyle
} from '../utils/dynamicStyles'
import { UNIT } from '../utils/enums'
import '../components.css'

export default function SavedConversion({pxValue, remValue, deleteConversion, index}: 
  {pxValue: number, remValue: number, deleteConversion: (index: number) => void, index: number}) {

    const [selectedUnit, setSelectedUnit] = useState(UNIT.REM)

  return (
    <div className="saved-conversion">
      <div className="saved-conversion-values">
        <button 
          className="saved-conversion-px"
          style={selectedUnit === UNIT.PX ? selectedButtonStyle : unselectedButtonStyle}
          onClick={() => setSelectedUnit(UNIT.PX)}
        >
          {pxValue} px
        </button>
        <button 
          className="saved-conversion-rem"
          style={selectedUnit === UNIT.REM ? selectedButtonStyle : unselectedButtonStyle}
          onClick={() => setSelectedUnit(UNIT.REM)}
        >
          {remValue} rem
        </button>
      </div>
      <button className="saved-conversion-delete" onClick={() => deleteConversion(index)}>delete</button>
    </div>
  )
}