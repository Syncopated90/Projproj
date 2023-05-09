function WaterLevelView(props) {
  return (
    <div className="waterLevel">
      <button onClick={props.onClickIncrement}>+</button>
      <button onClick={props.onClickDecrement}>-</button>
      <h2>Water tank level: {props.value}%</h2>
    </div>
  );
}

export default WaterLevelView;
