import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/App.css";

export default function CircleLoader(props){
  var absLevelAtStart = props.startWaterLevel
  var percentage = Math.round(100 * ((absLevelAtStart - props.waterLevel) / absLevelAtStart));
  if(props.turnedOn === false){
    return (
        <div style={{ alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
          <CircularProgressbarWithChildren 
            background={true}
            strokeWidth= {1} 
            styles={{path:{stroke:'black'}, trail: {stroke: 'red'}, background:{fill:'#F1EFE8'}}}>
              <div>Ready to brew.</div>
              <div>Brewing status: 0 %</div>
          </CircularProgressbarWithChildren>
        </div>
    );}
  else if(percentage >= 100){
    props.setBrewIsFinished(true)
    return (
        <div style={{ alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
          <CircularProgressbarWithChildren 
          strokeWidth= {3}
          background={true}
          styles={{path:{stroke:'green'}, trail: {stroke: 'green',}, background:{fill:'#F1EFE8'}}}/>
        </div>
    );}
  else return (<>
    <div style={{alignItems: 'center', width: 300, height: 300, margin: 'auto' }}>
      <CircularProgressbarWithChildren 
      value={percentage}
      background={true} 
      strokeWidth= {3} 
      styles={{path:{stroke:'red'},trail:{stroke:'black', }, background:{fill:'#F1EFE8'}}}>
        <div>Your coffee is brewing</div>
        <div>Brewing status: {percentage}%</div>
      </CircularProgressbarWithChildren>
    </div></>
  );
}
/*
    <div>absLevelAtStart was {absLevelAtStart}</div>
    <div>props.waterlevel is {props.waterLevel}</div>
    <div>pecentage is {percentage}</div>*/