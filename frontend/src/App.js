import HomePage from './pages/HomePage'; // Import the HomePage component
import './App.css'; // Import the main CSS file for styling

// Main App component that renders the application
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/AdscribeLogo.jpg" className="App-logo" alt="AdScribe AI Logo" />
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;

