import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/App.css";

export default function CircleLoader(props){
  var absLevelAtStart = props.startWaterLevel
  var percentage = Math.round(100 * ((absLevelAtStart - props.waterLevel) / absLevelAtStart));
  if(props.turnedOn === false){
    return (
        <div style={{ alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
          <CircularProgressbar styles={{path:{stroke:'red'}, trail: {stroke: 'red',}}}/>
        </div>
    );}
  else if(percentage === 100){
    return (
        <div style={{ alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
          <CircularProgressbar styles={{path:{stroke:'green'}, trail: {stroke: 'green',}}}/>
        </div>
    );}
  else return (<>
    <div>absLevelAtStart was {absLevelAtStart}</div>
    <div>props.waterlevel is {props.waterLevel}</div>
    <div>pecentage is {percentage}</div>
    <div style={{alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div></>
  );
}