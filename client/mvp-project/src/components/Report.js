const Report = (props) => {
  return (
    <div id='report'>
      <ul className='entry-uls'>
        {((props.currentEntries.length === 0 && props.isLoaded === true) || props.invalidEntry === true) ? props.renderEmpty() : props.renderEntries()}
      </ul>
      <ul className='page-no-uls' id='page-numbers'>
        {props.renderPageNumbers()}
      </ul>
    </div>
  )
};

export default Report;

