#!/bin/bash

echo "🏠 Iniciando Plataforma de Análise Imobiliária..."

# Instalar dependências se necessário
if [ ! -d "backend/venv" ]; then
    echo "Configurando ambiente Python..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Instalando dependências React..."
    cd frontend
    npm install
    cd ..
fi

# Iniciar backend em background
echo "Iniciando backend..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!
cd ..

# Aguardar backend inicializar
sleep 3

# Iniciar frontend
echo "Iniciando frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

echo "✅ Aplicação rodando!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
echo ""
echo "Para parar: Ctrl+C ou execute ./stop.sh"

# Aguardar interrupção
wait
