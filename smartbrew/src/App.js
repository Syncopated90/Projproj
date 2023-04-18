import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>SmartBrew coffee</h1>
      <MyButton />
    </div>
  );
}
function MyButton() {
  return (
    <button>Start brewing coffee</button>
  );
}

export default App;
