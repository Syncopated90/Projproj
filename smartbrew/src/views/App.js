import '../css/App.css';
import StartPresenter from '../presenters/startPresenter';
import WaterLevel from '../presenters/waterLevelPresenter';
import {readUserData} from '../firebaseModel';

function App() {
  readUserData("fredrik")
  return (
    <div>
      <StartPresenter/>
      <WaterLevel/>
    </div>
  );
}

export default App;
