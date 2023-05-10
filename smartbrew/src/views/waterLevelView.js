function WaterLevelView(props) {
  return (
    <div className="waterLevel">
      Water Level
      <button onClick={props.onClickIncrement}>+</button>
      <button onClick={props.onClickDecrement}>-</button>
      <h2>{props.value}%</h2>
      <div>
        <span>Current water level </span>
        <span className="font-link">{props.value}%</span>
      </div>
    </div>
  );
}

export default WaterLevelView;
