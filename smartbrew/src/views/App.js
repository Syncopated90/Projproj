import '../css/App.css';
import StartPresenter from '../presenters/StartPresenter';
import WaterLevel from '../presenters/waterLevelPresenter';

function App() {
  
  return (
    <div>
      <StartPresenter/>
      <WaterLevel/>
    </div>
  );
}

export default App;
