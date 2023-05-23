import { useState } from 'react'
import SelectedCard from './SelectedCard'
import { UNIT } from '../utils/enums'
import { BsArrowLeftRight } from 'react-icons/bs'
import '../components.css'

export default function SettingsCard() {
  const [unit, setUnit] = useState(UNIT.PX)
  const [base, setBase] = useState(16)
  const [value, setValue] = useState(base)

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
            onChange = {(e) => setBase(parseInt(e.target.value))}
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
                value={value}
                handleChange={(e) => setValue(parseInt(e.target.value))}
                unit='px'
              />
            : <p>{value} px</p>
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
                value={value}
                handleChange={(e) => setValue(parseInt(e.target.value))}
                unit='rem'
              />
            : <p>{value} rem</p>
          }
        </div>
      </div>
    </div>
  )
}