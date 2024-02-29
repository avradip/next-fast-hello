// pages/index.js
'use client'
/*

import React, { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div  className="flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />
      <h1>{inputValue} Hello</h1>
    </div>
  );
};


export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', height: '100vh' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
        style={{ marginBottom: '1rem' }}
      />
      <h1>{inputValue} Hello</h1>
    </div>
  );
};


export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Hello</h1>
    </div>
  );
};
*/

// pages/index.js

import { useState } from 'react';
import { FaArrowRight  } from 'react-icons/fa';
import Head from 'next/head';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSubmit(e); // Call the handleSubmit function when Enter key is pressed
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API + "/hello/";
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: inputValue }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error:', error);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setOutput('An error occurred with input: ' + inputValue);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Next + Fast API Starter</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter input"
            className="flex-grow px-4 py-2 mr-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:text-gray-600"
          >
            <FaArrowRight  className="ml-2" /> {/* Add the arrow right icon */}
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Output</h2>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-4 py-2 bg-gray-200 rounded-md resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
