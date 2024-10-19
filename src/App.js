import './App.css';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <div class="gradient-container">
        <div class="gradient-color"></div>
        <div class="gradient-color"></div>
        <div class="gradient-color"></div>
        <div class="gradient-color"></div>
        <div class="gradient-backdrop"></div>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
