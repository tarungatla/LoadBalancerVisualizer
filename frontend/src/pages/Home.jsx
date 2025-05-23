import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState('round-robin');
  const [numServers, setNumServers] = useState(5);
  const [weights, setWeights] = useState(Array(numServers).fill(0).map((_, i) => i + 1));

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const handleInitialize = async () => {
    const url = `${baseUrl}/api/loadbalancer/initialize/${algorithm}/${numServers}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weights }),
      });
      if (response.ok) {
        console.log('Load balancer initialized successfully');
        navigate(`/request?algorithm=${algorithm}&numServers=${numServers}`);
      } else {
        const errorData = await response.text();
        console.error(`Error initializing load balancer: ${errorData}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const incrementServers = () => {
    if (numServers < 20) {
      setNumServers(numServers + 1);
      setWeights([...weights, numServers + 1]);
    }
  };

  const decrementServers = () => {
    if (numServers > 1) {
      setNumServers(numServers - 1);
      setWeights(weights.slice(0, -1));
    }
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...weights];
    newWeights[index] = parseInt(value, 10) || 1;
    setWeights(newWeights);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Load Balancing Algorithms Visualizer
        </h1>
        <p className="text-xl text-gray-600 font-medium">Configure and initialize your load balancing setup</p>
      </div>

      {/* Main Configuration Card */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
        
        {/* Algorithm Selection */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 border border-purple-200">
          <label htmlFor="algorithm" className="block text-lg font-semibold text-gray-700 mb-3">
            Load Balancing Algorithm
          </label>
          <select
            id="algorithm"
            className="w-full border-2 border-purple-300 rounded-xl p-4 text-gray-800 text-lg font-medium bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-sm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="round-robin">🔄 Round Robin</option>
            <option value="weightedroundrobin">⚖️ Weighted Round Robin</option>
            <option value="least-connections">📊 Least Connections</option>
          </select>
        </div>

        {/* Server Count Configuration */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 border border-blue-200">
          <label htmlFor="servers" className="block text-lg font-semibold text-gray-700 mb-4">
            Number of Servers
          </label>
          <div className="flex items-center justify-center space-x-6">
            <button 
              onClick={decrementServers} 
              className="w-12 h-12 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-2xl font-bold"
              disabled={numServers <= 1}
            >
              −
            </button>
            <div className="bg-white rounded-xl border-2 border-gray-200 px-6 py-3 shadow-inner">
              <span className="text-3xl font-bold text-gray-800">{numServers}</span>
            </div>
            <button 
              onClick={incrementServers} 
              className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-2xl font-bold"
              disabled={numServers >= 20}
            >
              +
            </button>
          </div>
        </div>

        {/* Weights Configuration (Conditional) */}
        {algorithm === 'weightedroundrobin' && (
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
            <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">⚖️ Server Weight Configuration</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {weights.map((weight, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <label className="block text-sm font-semibold text-gray-600 mb-2 text-center">
                    Server {index + 1}
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                    className="w-full text-center border-2 border-gray-300 text-gray-800 rounded-lg p-3 text-lg font-semibold focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                    min="1"
                    max="100"
                  />
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm">Higher weights = more requests routed to that server</p>
          </div>
        )}

        {/* Initialize Button */}
        <div className="text-center pt-4">
          <button 
            onClick={handleInitialize} 
            className="px-12 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xl font-bold rounded-2xl hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border border-purple-500"
          >
            🚀 Initialize Load Balancer
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
          <div className="text-3xl mb-2">🔄</div>
          <h3 className="font-bold text-gray-700">Round Robin</h3>
          <p className="text-sm text-gray-600 mt-2">Equal distribution across all servers</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
          <div className="text-3xl mb-2">⚖️</div>
          <h3 className="font-bold text-gray-700">Weighted</h3>
          <p className="text-sm text-gray-600 mt-2">Distribution based on server capacity</p>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
          <div className="text-3xl mb-2">📊</div>
          <h3 className="font-bold text-gray-700">Least Connections</h3>
          <p className="text-sm text-gray-600 mt-2">Routes to server with fewest active connections</p>
        </div>
      </div>
    </div>
  );
}