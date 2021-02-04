import React from 'react';

const ProgressBar = (props) => {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: 'orange',
    borderRadius: 50,
    marginBottom: 5
  }

  const fillerStyles = {
    width: `${props.completed}%`,
    height: 20,
    backgroundColor: 'turquoise',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width .1s ease-in-out'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }
return props.completed === 0 ? null :
 (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${props.completed}%`}</span>
      </div>
    </div>
  )
}

export default ProgressBar;