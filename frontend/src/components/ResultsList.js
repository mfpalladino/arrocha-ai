import React, { useState } from 'react';
import ResultCard from './ResultCard';
import OpportunityModal from './OpportunityModal';

const ResultsList = ({ results }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const organizeByClassification = () => {
    const organized = { quente: [], morno: [], frio: [] };
    
    results.forEach((result, index) => {
      const analysis = result.analysis.toLowerCase();
      const resultWithIndex = { ...result, originalIndex: index + 1 };
      
      if (analysis.includes('quente')) {
        organized.quente.push(resultWithIndex);
      } else if (analysis.includes('morno')) {
        organized.morno.push(resultWithIndex);
      } else {
        organized.frio.push(resultWithIndex);
      }
    });
    
    return organized;
  };

  const handleCardClick = (result, index) => {
    setSelectedOpportunity({ result, index });
  };

  const closeModal = () => {
    setSelectedOpportunity(null);
  };

  const organized = organizeByClassification();

  const KanbanColumn = ({ title, items, className, icon }) => (
    <div className={`kanban-column ${className}`}>
      <div className="column-header">
        <h3>{icon} {title}</h3>
        <span className="count">{items.length}</span>
      </div>
      <div className="column-content">
        {items.map((result) => (
          <ResultCard 
            key={result.originalIndex} 
            result={result} 
            index={result.originalIndex}
            compact={true}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="results-section">
      <div className="results-header">
        <h2>Quadro de Oportunidades</h2>
        <div className="total-count">
          Total: {results.length} oportunidades
        </div>
      </div>
      
      <div className="kanban-board">
        <KanbanColumn 
          title="QUENTE" 
          items={organized.quente}
          className="quente-column"
          icon="🔥"
        />
        <KanbanColumn 
          title="MORNO" 
          items={organized.morno}
          className="morno-column"
          icon="🟡"
        />
        <KanbanColumn 
          title="FRIO" 
          items={organized.frio}
          className="frio-column"
          icon="❄️"
        />
      </div>

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={selectedOpportunity.result.opportunity}
          analysis={selectedOpportunity.result.analysis}
          index={selectedOpportunity.index}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ResultsList;
