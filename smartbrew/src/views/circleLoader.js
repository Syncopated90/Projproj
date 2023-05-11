import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/App.css";
import { useRef, useEffect } from 'react';

//background color: F1EFE8
export default function CircleLoader(props){
  var absLevelAtStart = props.startWaterLevel
  var percentage = Math.round(100 * ((absLevelAtStart - props.waterLevel) / absLevelAtStart));
  const backgroundColor = '#F1EFE8'
  const wheelSize= 250
  const previousPercentageRef = useRef(0);

  useEffect(() => {
    if(percentage > previousPercentageRef.current){
      previousPercentageRef.current = percentage
    }
  }, [percentage])

  console.log("previous level: "+ previousPercentageRef.current)
  console.log("current level: "+ percentage)

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
            <div><span className='wheel-text'>Brewing status: </span><span className='wheel-number'>100 %</span></div>
          </CircularProgressbarWithChildren>
        </div>
    );}
  else return (<>
    <div style={{alignItems: 'center', width: wheelSize, height: wheelSize, margin: 'auto' }}>
      <CircularProgressbarWithChildren 
      value={previousPercentageRef.current}
      background={true} 
      strokeWidth= {3} 
      styles={{path:{stroke:'red',strokeLinecap: 'butt',},trail:{stroke:'transparent'}, background:{fill:backgroundColor}}}>
        <div className='wheel-text'>Your coffee is brewing</div>
        <div><span className='wheel-text'>Brewing status: </span><span className='wheel-number'>{(previousPercentageRef.current) || '0'}%</span></div>
      </CircularProgressbarWithChildren>
    </div></>
  );
}