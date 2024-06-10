import './App.css';
import Main from './components/Main';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div className="App">
      <Main />
      <Toaster/>
    </div>
  );
}

export default App;
