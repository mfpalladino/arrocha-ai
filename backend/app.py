import json
import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Tentar inicializar Bedrock, usar mock se não disponível
try:
    bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')
    BEDROCK_AVAILABLE = True
except Exception as e:
    print(f"Bedrock não disponível: {e}")
    bedrock = None
    BEDROCK_AVAILABLE = False

def analyze_opportunity(opp):
    prompt = f"""Analise esta oportunidade imobiliária e classifique como QUENTE, MORNO ou FRIO:

Dados: {json.dumps(opp, ensure_ascii=False)}

Critérios:
- QUENTE: Alta probabilidade (orçamento adequado, urgência, interesse específico)
- MORNO: Potencial médio (necessita nurturing)
- FRIO: Baixa probabilidade (sem urgência, orçamento limitado)

Responda apenas:
Classificação: [QUENTE/MORNO/FRIO]
Justificativa: [máximo 50 palavras]
Próximos passos: [sugestão de ação]"""

    try:
        response = bedrock.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229-v1:0',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 200,
                'messages': [{'role': 'user', 'content': prompt}]
            })
        )
        return json.loads(response['body'].read())['content'][0]['text']
    except Exception as e:
        print(f"ERRO na análise: {str(e)}")
        raise e

@app.route('/api/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        results = []
        
        for opp in data.get('opportunities', []):
            try:
                analysis = analyze_opportunity(opp)
                results.append({'opportunity': opp, 'analysis': analysis})
            except Exception as e:
                print(f"ERRO ao analisar oportunidade {opp.get('nome', 'sem nome')}: {str(e)}")
                results.append({'opportunity': opp, 'analysis': f'Erro na análise: {str(e)}'})
        
        return jsonify({'results': results})
    except Exception as e:
        print(f"ERRO geral na API: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
