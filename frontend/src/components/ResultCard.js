import React from 'react';

const ResultCard = ({ result, index, compact = false, onCardClick }) => {
  const getClassification = (analysis) => {
    const text = analysis.toLowerCase();
    if (text.includes('quente')) return 'quente';
    if (text.includes('morno')) return 'morno';
    return 'frio';
  };

  const getClassificationIcon = (classification) => {
    switch (classification) {
      case 'quente': return '🔥';
      case 'morno': return '🟡';
      case 'frio': return '❄️';
      default: return '📊';
    }
  };

  const classification = getClassification(result.analysis);
  const icon = getClassificationIcon(classification);

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(result, index);
    }
  };

  if (compact) {
    return (
      <div 
        className={`result-card compact ${classification} clickable`}
        onClick={handleClick}
      >
        <div className="compact-header">
          <h4>{result.opportunity.nome || `Cliente ${index}`}</h4>
          <span className="compact-badge">{icon}</span>
        </div>
        
        <div className="compact-info">
          <div className="info-item">
            <strong>Orçamento:</strong> R$ {result.opportunity.orcamento?.toLocaleString() || 'N/A'}
          </div>
          <div className="info-item">
            <strong>Urgência:</strong> {result.opportunity.urgencia || 'N/A'}
          </div>
        </div>
        
        <div className="click-hint">
          Clique para ver detalhes
        </div>
      </div>
    );
  }

  return (
    <div className={`result-card ${classification}`}>
      <div className="result-header">
        <h3>{icon} Oportunidade {index}</h3>
        <span className={`classification-badge ${classification}`}>
          {classification.toUpperCase()}
        </span>
      </div>
      
      <div className="opportunity-data">
        <h4>Dados do Cliente:</h4>
        <div className="data-grid">
          {Object.entries(result.opportunity).map(([key, value]) => (
            <div key={key} className="data-item">
              <strong>{key.replace('_', ' ')}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
      
      <div className="analysis-result">
        <h4>Análise:</h4>
        <pre className="analysis-text">{result.analysis}</pre>
      </div>
    </div>
  );
};

export default ResultCard;
