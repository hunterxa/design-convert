import { useState } from 'react'
import { BsArrowLeftRight } from 'react-icons/bs'
import SelectedCard from './SelectedCard'
import { UNIT } from '../utils/enums'
import { convertPxToRem, convertRemToPx } from '../utils/conversion'
import { 
  selectedButtonStyle,
  unselectedButtonStyle,
  selectedCardStyle,
  unselectedCardStyle
} from '../utils/dynamicStyles'
import '../components.css'

export default function SettingsCard({saveConversion}: 
  {saveConversion: (pxValue: number, remValue: number) => void}) {

  const [unit, setUnit] = useState(UNIT.PX)
  const [base, setBase] = useState(16)
  const [pxValue, setPxValue] = useState(base)
  const [remValue, setRemValue] = useState(convertPxToRem(base, pxValue))

  //Handler functions to handle input changes in the SelectedCardComponents
  //When input is empty or non-numbers entered, set value to 0 to avoid divide-by-zero errors
  const handlePxValueChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setPxValue(0)
      setRemValue(0)
    } else {
      setPxValue(parseInt(e.target.value))
      setRemValue(convertPxToRem(base, parseInt(e.target.value)))
    }
  }

  const handleRemValueChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setRemValue(0)
      setPxValue(0)
    } else {
      setRemValue(parseFloat(e.target.value))
      setPxValue(convertRemToPx(base, parseFloat(e.target.value)))
    }
  }

  //Handeler function to handle input changes in the base font size input
  //When input is empty or non-numbers entered, set value to 16 to avoid type errors
  const handleBaseChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setBase(16)
    } else {
      setBase(parseInt(e.target.value))
    }
  }

  return (
    <div className="settings-card">
      <div className="settings-card-base-unit">
        <p className="settings-card-root-text">root font size</p>
        <div className="settings-card-base-text">
          <input 
            className="settings-card-base-input"
            type="text"
            defaultValue={base}
            onChange = {(e) => handleBaseChange(e)}
          ></input>
        <p className="settings-card-base-equal">px = 1 rem</p>
        </div>
      </div>
      <div className="settings-card-bar">
        <div className="settings-card-unit-selectors">
          <button 
            className="settings-card-unit-selector"
            id="px-selector"
            style={unit === UNIT.PX ? selectedButtonStyle : unselectedButtonStyle}
            onClick={() => setUnit(UNIT.PX)}
          >
            px
          </button>
          <button 
            className="settings-card-unit-selector"
            id="rem-selector"
            style={unit === UNIT.REM ? selectedButtonStyle : unselectedButtonStyle}
            onClick={() => setUnit(UNIT.REM)}
          >
            rem
          </button>
        </div>
      </div>
      <div className="settings-card-info-display">
        <div 
          className="settings-card-info"
          style={unit === UNIT.PX ? selectedCardStyle : unselectedCardStyle}
        >
          {
            unit === UNIT.PX
            ? <SelectedCard 
                value={pxValue}
                handleChange={(e) => handlePxValueChange(e)}
                unit='px'
              />
            : <p>{pxValue} px</p>
          }
        </div>
        <BsArrowLeftRight size={"2rem"} color={"#000000BA"}/>
        <div 
          className="settings-card-info"
          style={unit === UNIT.REM ? selectedCardStyle : unselectedCardStyle}
        >
          {
            unit === UNIT.REM
            ? <SelectedCard 
                value={remValue}
                handleChange={(e) => handleRemValueChange(e)}
                unit='rem'
              />
            : <p>{remValue} rem</p>
          }
        </div>
      </div>
      <div className="settings-card-bottom-row">
        <button
          className="settings-card-save-button"
          onClick={() => saveConversion(pxValue, remValue)}
        >
          save
        </button>
      </div>
    </div>
  )
}