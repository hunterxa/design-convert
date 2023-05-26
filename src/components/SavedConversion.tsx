import { useState } from 'react'
import { TbClipboardText } from 'react-icons/tb'
import { RiDeleteBin4Line } from 'react-icons/ri'
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
          className="saved-conversion-px saved-value"
          style={selectedUnit === UNIT.PX ? selectedButtonStyle : unselectedButtonStyle}
          onClick={() => setSelectedUnit(UNIT.PX)}
        >
          {pxValue} px
        </button>
        <button 
          className="saved-conversion-rem saved-value"
          style={selectedUnit === UNIT.REM ? selectedButtonStyle : unselectedButtonStyle}
          onClick={() => setSelectedUnit(UNIT.REM)}
        >
          {remValue} rem
        </button>
      </div>
      <button 
        className="saved-conversion-button saved-conversion-copy"
        onClick={() => 
          navigator.clipboard.writeText(selectedUnit === UNIT.PX ? `${pxValue.toString()}px` : `${remValue.toString()}rem`)
        }
      >
        <TbClipboardText size="1.2rem" color="#F6F4F3" />
      </button>
      <button 
        className="saved-conversion-button saved-conversion-delete" 
        onClick={() => deleteConversion(index)}
      >
        <RiDeleteBin4Line size="1.2rem" color="#F6F4F3" />
      </button>
    </div>
  )
}