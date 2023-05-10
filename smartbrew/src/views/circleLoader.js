import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/App.css";

//background color: F1EFE8
export default function CircleLoader(props){
  var absLevelAtStart = props.startWaterLevel
  var percentage = Math.round(100 * ((absLevelAtStart - props.waterLevel) / absLevelAtStart));
  const backgroundColor = '#F1EFE8'
  const wheelSize= 250
  if(props.turnedOn === false){
    props.setBrewIsFinished(false)
    return (
        <div style={{ alignItems: 'center', width: wheelSize, height: wheelSize, margin: 'auto' }}>
          <CircularProgressbarWithChildren 
            background={true}
            strokeWidth= {1} 
            styles={{path:{stroke:'transparent'}, trail: {stroke: 'transparent'}, background:{fill:backgroundColor}}}>
              <div className='wheel-text'>Ready to brew.</div>
              <div><span className='wheel-text'>Brewing status: </span><span className='wheel-number'>0%</span></div>
          </CircularProgressbarWithChildren>
        </div>
    );}
  else if(percentage >= 100){
    props.setBrewIsFinished(true)
    return (
        <div style={{ alignItems: 'center', width: wheelSize, height: wheelSize, margin: 'auto' }}>
          <CircularProgressbarWithChildren 
          strokeWidth= {3}
          background={true}
          styles={{path:{stroke:'green'}, trail: {stroke: 'green',}, background:{fill:backgroundColor}}}>
            <div className='wheel-text'>Your coffee is ready</div>
            <div><span className='wheel-text'>Brewing status: </span><span className='font-link'>100 %</span></div>
          </CircularProgressbarWithChildren>
        </div>
    );}
  else return (<>
    <div style={{alignItems: 'center', width: wheelSize, height: wheelSize, margin: 'auto' }}>
      <CircularProgressbarWithChildren 
      value={percentage}
      background={true} 
      strokeWidth= {3} 
      styles={{path:{stroke:'red',strokeLinecap: 'butt',},trail:{stroke:'transparent'}, background:{fill:backgroundColor}}}>
        <div className='wheel-text'>Your coffee is brewing</div>
        <div><span className='wheel-text'>Brewing status: </span><span className='font-link'>{((percentage > 0) && percentage) || '0'}%</span></div>
      </CircularProgressbarWithChildren>
    </div></>
  );
}