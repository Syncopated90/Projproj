import '../css/App.css';
import StartPresenter from '../presenters/StartPresenter';
import WaterLevel from '../presenters/waterLevelPresenter';
import writeUserData, {readUserData} from '../firebaseModel';

function App() {
  readUserData("fredrik2")
  return (
    <div>
      <StartPresenter/>
      <WaterLevel/>
    </div>
  );
}

export default App;
