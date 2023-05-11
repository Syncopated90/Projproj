function WaterLevelView(props) {
  return (
    <div className="waterLevel">
      <div className='water-text'>
        <span>Current water level: </span>
        <span className="water-number">{props.value}%</span>
      </div>
    </div>
  );
}
/*<button onClick={props.onClickIncrement}>+</button>
      <button onClick={props.onClickDecrement}>-</button>*/
export default WaterLevelView;
