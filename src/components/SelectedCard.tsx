import '../components.css'

export default function SelectedCard({value, handleChange, unit}: 
  {value: number, handleChange: (e: any) => void, unit: string}) {

  return (
    <div className="selected-card">
      <input 
        className="value-input"
        type="text"
        defaultValue={value}
        onChange = {(e) => handleChange(e)}
      ></input>
      <p className="selected-card-unit">{unit}</p>
    </div>
  )
}