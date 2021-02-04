const Report = (props) => {
  // return props.report ? props.report : null
  return (
    <div id='report'>
      <ul className ='uls'>
        {props.renderEntries}
      </ul>
      <ul class= 'uls' id='page-numbers'>
        {props.renderPageNumbers}
      </ul>
      </div>
        )
        };

export default Report;