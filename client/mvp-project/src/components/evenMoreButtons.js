const EvenMoreButtons = (props) => {
  return (
    <div className='more-buttons' onChange={(event) => props.setFormat(event)}>
      <h4 id='choose-format'>Choose Format</h4>

      <input type="radio" id="kph" name="format" value="kph" checked={props.format === 'kph' ? 'Checked' : null} />
      <label for="kph">Kilometers/Hour</label><br />

      <input type="radio" id="mph" name="format" value="mph" />
      <label for="mph">Miles/Hour</label><br/>

      <input type="radio" id="mps" name="format" value="mps" />
      <label for="mps">Meters/Second</label><br />
    </div>
  )
}

export default EvenMoreButtons;