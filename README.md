# 🏠 Plataforma de Análise de Oportunidades Imobiliárias

Sistema que utiliza Amazon Bedrock para classificar automaticamente oportunidades de vendas imobiliárias em **QUENTE**, **MORNO** ou **FRIO**.

> 💝 **Criado com muito amor e suor durante o AWS Vibe Coding Dojo no ROGADX 2025** 🚀

## 🚀 Como executar

### Modo Simples (Recomendado)

```bash
# Configure suas credenciais AWS (apenas uma vez)
aws configure

# Iniciar aplicação completa
./start.sh

# Parar aplicação
./stop.sh
```

A aplicação estará disponível em `http://localhost:3000`

### Modo Manual (Opcional)

```bash
# Backend
cd backend && pip install -r requirements.txt && python app.py

# Frontend (em outro terminal)
cd frontend && npm install && npm start
```

## 📋 Formato dos dados

```json
{
  "opportunities": [
    {
      "nome": "João Silva",
      "orcamento": 500000,
      "urgencia": "alta",
      "tipo_imovel": "apartamento",
      "localizacao_preferida": "centro",
      "contato_anterior": "sim"
    }
  ]
}
```

## 🎯 Classificações

- **🔥 QUENTE**: Alta probabilidade de compra
- **🟡 MORNO**: Potencial médio, necessita nurturing  
- **❄️ FRIO**: Baixa probabilidade de conversão

## 🛠️ Tecnologias

- **Backend**: Python, Flask, Amazon Bedrock
- **Frontend**: React, Axios
- **IA**: Claude 3 Sonnet via Bedrock
