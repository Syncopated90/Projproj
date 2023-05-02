function StartBrew(props){
  return <div className="App">
  <button onClick = {() => props.setBrewingStatus(true)}>
    Turn on
  </button>
  </div>
}

function StopBrew(props){
  return <div className="App">
  <button onClick = {() => props.setBrewingStatus(false)}>
    Turn off
  </button>
  </div>
}

export {StopBrew, StartBrew}
