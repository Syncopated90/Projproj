import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "../css/App.css";

export default function CircleLoader(props){
  //const percentage = level;
  console.log(props.waterLevel)
  const percentage = props.waterLevel
  //const percentage = 44
  return (
      <div style={{ alignItems: 'center', width: 200, height: 200, margin: 'auto' }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
  );
}