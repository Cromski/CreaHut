import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/page_logo.png'; // Import the logo

function App() {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = ["Elephant", "Batman", "Sun", "Skateboard"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async () => {
    if (inputValue.trim() !== '') {
      setHistory([inputValue, ...history]);
      generateImage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    } else if (e.key === 'ArrowUp') {
      setInputValue(history[0]);
    }
  };

  const generateImage = async (prompt) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_SECRET_KEY;
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: `${prompt}, highly detailed, intricate line drawing, black and white, professional quality, no background, coloring book style, leave spaces open for coloring`,
          n: 1,
          size: '512x512',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const imageUrl = response.data.data[0].url;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const openImageInNewTab = () => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient-move bg-[length:200%_200%] flex flex-col items-center justify-center">
      {/* Logo Section */}
      <img src={logo} alt="CreaHut Logo" className="h-16 w-16 mb-2 rounded-lg lg:mb-0 lg:mr-4" />

      {/* Title Section */}
      <h1 className="text-5xl font-extrabold text-white mb-4 text-center">
        Welcome to CreaHut
      </h1>

      {/* Space before image */}
      {imageUrl ? null : <div className="mb-8" />}

      {/* Generated Image Section */}
      {loading ? (
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-white border-t-transparent mb-4"></div>
      ) : null}
      {imageUrl && (
        <div className="mb-8 cursor-pointer" onClick={openImageInNewTab}>
          <img src={imageUrl} alt="Generated" className="rounded-lg shadow-lg" />
        </div>
      )}

      {/* Search Field Section */}
      <div className="relative w-full max-w-lg mb-8">
        <input
          className="p-4 rounded-lg text-lg w-full border-2 border-transparent focus:outline-none focus:border-white pr-12"
          type="text"
          placeholder={"Write something .. "+placeholders[placeholderIndex]}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="absolute right-0 top-0 h-full px-4 bg-white rounded-r-lg text-lg text-blue-600 hover:bg-blue-100 focus:outline-none"
          onClick={handleButtonClick}
        >
          ➔
        </button>
      </div>

      {/* Search History Section */}
      <div className="lg:absolute lg:right-4 lg:top-1/4 w-full max-w-lg lg:w-64 bg-white bg-opacity-50 rounded-lg p-4 shadow-lg overflow-y-auto max-h-60">
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
