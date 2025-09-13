import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onAnalysisStart, onAnalysisComplete, loading }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonInput(e.target.result);
        setError('');
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = async () => {
    try {
      setError('');
      const data = JSON.parse(jsonInput);
      
      onAnalysisStart();
      
      const response = await axios.post('http://localhost:5000/api/analyze', data);
      onAnalysisComplete(response.data.results);
      
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao processar JSON: ' + err.message);
      onAnalysisComplete([]);
    }
  };

  const sampleData = {
    opportunities: [
      {
        nome: "João Silva",
        orcamento: 500000,
        urgencia: "alta",
        tipo_imovel: "apartamento",
        localizacao_preferida: "centro",
        contato_anterior: "sim"
      }
    ]
  };

  return (
    <div className="file-upload">
      <div className="upload-section">
        <h2>Dados das Oportunidades</h2>
        
        <div className="input-methods">
          <div className="file-input">
            <label htmlFor="file">Upload arquivo JSON:</label>
            <input 
              type="file" 
              id="file"
              accept=".json" 
              onChange={handleFileUpload}
              disabled={loading}
            />
          </div>
          
          <div className="text-input">
            <label htmlFor="json-text">Ou cole o JSON aqui:</label>
            <textarea
              id="json-text"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={JSON.stringify(sampleData, null, 2)}
              rows="10"
              disabled={loading}
            />
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        
        <button 
          onClick={handleAnalyze} 
          disabled={!jsonInput.trim() || loading}
          className="analyze-btn"
        >
          {loading ? 'Analisando...' : 'Analisar Oportunidades'}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
