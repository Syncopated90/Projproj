import '../css/App.css';
import StartPresenter from '../presenters/startPresenter';
import WaterLevel from '../presenters/waterLevelPresenter';
import {readUserData, readWaterLevel} from '../firebaseModel';

function App() {
  readUserData("fredrik")
  readWaterLevel("fredrik")
  return (
    <div>
      <StartPresenter/>
      <WaterLevel/>
    </div>
  );
}

export default App;
