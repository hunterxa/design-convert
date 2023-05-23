import { useState, useEffect } from 'react'
import SelectedCard from './SelectedCard'
import { UNIT } from '../utils/enums'
import { convertPxToRem, convertRemToPx } from '../utils/conversion'
import { BsArrowLeftRight } from 'react-icons/bs'
import '../components.css'

export default function SettingsCard() {
  const [unit, setUnit] = useState(UNIT.PX)
  const [base, setBase] = useState(16)
  const [pxValue, setPxValue] = useState(base)
  const [remValue, setRemValue] = useState(convertPxToRem(base, pxValue))

  const selectedButtonStyle = {
    backgroundColor: '#E96262',
    boxShadow: '0 0.25rem 0.25rem 0 #00000040 inset',
    textDecoration: 'underline',
  }

  const unselectedButtonStyle = {
    backgroundColor: '#EA52524A',
  }

  const selectedCardStyle = {
    backgroundColor: '#E96262',
  }

  const unselectedCardStyle = {
    backgroundColor: '#EA52524A',
  }

  //Handler functions to handle input changes in the SelectedCardComponents
  //When input is empty or non-numbers entered, set value to 0 to avoid errors
  const handlePxValueChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setPxValue(0)
    } else {
      setPxValue(parseInt(e.target.value))
    }
  }

  const handleRemValueChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setRemValue(0)
    } else {
      setRemValue(parseFloat(e.target.value))
    }
  }

  //Handeler function to handle input changes in the base font size input
  //When input is empty or non-numbers entered, set value to 16 to avoid errors
  const handleBaseChange = (e: any) => {
    if (isNaN(e.target.value) || e.target.value === "") {
      setBase(16)
    } else {
      setBase(parseInt(e.target.value))
    }
  }

  //Update remValue state when pxValue state changes and vice versa
  useEffect(() => {
    if (unit === UNIT.PX) {
      setRemValue(convertPxToRem(base, pxValue))
    } else {
      setPxValue(convertRemToPx(base, remValue))
    }
  }, [pxValue, remValue])

  return (
    <div className="settings-card">
      <div className="settings-card-base-unit">
        <p className="settings-card-root-text">root font size</p>
        <div className="settings-card-base-text">
          {/* TODO: set this to be able to be null and handle that case */}
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
            : <p>{convertRemToPx(base, remValue)} px</p>
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
            : <p>{convertPxToRem(base, pxValue)} rem</p>
          }
        </div>
      </div>
    </div>
  )
}