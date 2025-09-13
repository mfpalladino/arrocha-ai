import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultsList from './components/ResultsList';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setLoading(false);
  };

  const handleAnalysisStart = () => {
    setLoading(true);
    setResults([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏠 Análise de Oportunidades Imobiliárias</h1>
        <p>Classifique seus leads automaticamente com IA</p>
      </header>
      
      <main className="App-main">
        <FileUpload 
          onAnalysisStart={handleAnalysisStart}
          onAnalysisComplete={handleAnalysisComplete}
          loading={loading}
        />
        
        {loading && (
          <div className="loading">
            <p>Analisando oportunidades...</p>
          </div>
        )}
        
        {results.length > 0 && <ResultsList results={results} />}
      </main>
    </div>
  );
}

export default App;
