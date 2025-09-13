import json
import boto3
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)
bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

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
        return f"Erro: {str(e)}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    results = []
    
    for opp in data.get('opportunities', []):
        analysis = analyze_opportunity(opp)
        results.append({'opportunity': opp, 'analysis': analysis})
    
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
