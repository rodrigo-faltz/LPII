import { useState } from 'react';

const TestAPI = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Test GET endpoint
  const testGet = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/data');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Test POST endpoint
  const testPost = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Alice' }),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-tester">
      <h2>API Tester</h2>
      <div className="button-group">
        <button 
          onClick={testGet}
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test GET'}
        </button>
        <button 
          onClick={testPost}
          disabled={loading}
        >
          {loading ? 'Testing...' : 'Test POST'}
        </button>
      </div>
      
      {response && (
        <div className="response-box">
          <h3>Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default TestAPI;