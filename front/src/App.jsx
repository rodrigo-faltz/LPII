// App.jsx
import TestAPI from './TestAPI';

function App() {
  return (
    <div className="App">
      <TestAPI />
      <h1>Welcome to the API Tester</h1>
      <p>This is a simple application to test API endpoints.</p>
      <p>Click the buttons above to test the GET and POST endpoints.</p>
      <p>Check the console for any errors.</p>
      <p>Make sure your backend server is running on port 3000.</p>
      <p>Enjoy testing!</p>
      
    </div>
  );
}

export default App;