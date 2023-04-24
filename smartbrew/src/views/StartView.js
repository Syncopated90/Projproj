function StartView(props){
  return <div className="App">
  <h1>SmartBrew coffee</h1>
  <button onClick = {() => props.setBrewingStatus(true)}>
    Start brewing coffee
  </button>
  <button onClick = {() => props.setBrewingStatus(false)}>
    Stop brewing coffee
  </button>
</div>
}

export default StartView;