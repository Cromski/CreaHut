import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== '') {
      setHistory([inputValue, ...history]);
      setInputValue('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-move bg-[length:200%_200%] flex flex-col items-center">
      <header className="w-full text-center py-8 bg-transparent">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to CreaHut
        </h1>
      </header>
      <div className="relative flex-grow w-full flex flex-col items-center justify-center px-4">
        <div className="relative w-full max-w-md mb-4">
          <input
            className="p-4 rounded-lg text-lg w-full border-2 border-transparent focus:outline-none focus:border-white pr-12"
            type="text"
            placeholder="Enter something..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="absolute right-0 top-0 h-full px-4 bg-white rounded-r-lg text-lg text-blue-600 hover:bg-blue-100 focus:outline-none"
            onClick={handleButtonClick}
          >
            ➔
          </button>
        </div>
      </div>
      <div className="absolute top-1/4 right-4 w-64 bg-white bg-opacity-50 rounded-lg p-4 shadow-md overflow-y-auto max-h-60">
        <h2 className="text-xl font-semibold mb-2 text-blue-600">Search History</h2>
        <ul className="max-h-40 overflow-y-auto">
          {history.length === 0 ? (
            <li className="text-gray-500">No history yet.</li>
          ) : (
            history.map((item, index) => (
              <li key={index} className="text-gray-800">
                {item}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
