#!/bin/bash

echo "Parando aplicação..."

# Matar processos Python (Flask)
pkill -f "python app.py"

# Matar processos Node (React)
pkill -f "react-scripts start"

echo "✅ Aplicação parada!"
