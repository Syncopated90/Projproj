function DataView(props) {
  return (
    <div className="data">
      Data
      <button onClick={props.onClickIncrement}>+</button>
      <button onClick={props.onClickDecrement}>-</button>
      <h2>{props.value}%</h2>
    </div>
  );
}

export default DataView;
