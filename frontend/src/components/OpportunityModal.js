import React from 'react';

const OpportunityModal = ({ opportunity, analysis, index, onClose }) => {
  const getClassification = (analysis) => {
    const text = analysis.toLowerCase();
    if (text.includes('quente')) return 'quente';
    if (text.includes('morno')) return 'morno';
    return 'frio';
  };

  const getActionButton = (classification) => {
    switch (classification) {
      case 'quente':
        return {
          text: '📞 Ligar Agora',
          action: 'call',
          urgent: true
        };
      case 'morno':
        return {
          text: '📧 Enviar Email',
          action: 'email',
          urgent: false
        };
      case 'frio':
        return {
          text: '📋 Adicionar ao Nurturing',
          action: 'nurture',
          urgent: false
        };
      default:
        return {
          text: '📞 Entrar em Contato',
          action: 'contact',
          urgent: false
        };
    }
  };

  const handleAction = (actionType) => {
    const clientName = opportunity.nome || `Cliente ${index}`;
    const phone = opportunity.telefone || opportunity.contato;
    const email = opportunity.email;

    switch (actionType) {
      case 'call':
        if (phone) {
          window.open(`tel:${phone}`);
        } else {
          alert(`Telefone não disponível para ${clientName}`);
        }
        break;
      case 'email':
        if (email) {
          window.open(`mailto:${email}?subject=Oportunidade Imobiliária - ${clientName}`);
        } else {
          alert(`Email não disponível para ${clientName}`);
        }
        break;
      case 'nurture':
        alert(`${clientName} adicionado à campanha de nurturing`);
        break;
      default:
        alert(`Ação de contato para ${clientName}`);
    }
  };

  const classification = getClassification(analysis);
  const actionButton = getActionButton(classification);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Detalhes da Oportunidade #{index}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="client-info">
            <h3>Informações do Cliente</h3>
            <div className="info-grid">
              {Object.entries(opportunity).map(([key, value]) => (
                <div key={key} className="info-row">
                  <span className="info-label">{key.replace('_', ' ')}:</span>
                  <span className="info-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-section">
            <h3>Análise Detalhada</h3>
            <div className={`analysis-box ${classification}`}>
              <pre className="analysis-full">{analysis}</pre>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className={`action-btn ${actionButton.urgent ? 'urgent' : ''}`}
            onClick={() => handleAction(actionButton.action)}
          >
            {actionButton.text}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
