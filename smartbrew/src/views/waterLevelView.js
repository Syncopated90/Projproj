function WaterLevelView(props) {
  return (
    <div className="waterLevel">
      <button onClick={props.onClickIncrement}>+</button>
      <button onClick={props.onClickDecrement}>-</button>
      <div>
        <span>Current water level </span>
        <span className="font-link">{props.value}%</span>
      </div>
    </div>
  );
}

export default WaterLevelView;
