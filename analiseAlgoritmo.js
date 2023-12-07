
function analiseLexica(expressao) {
    const alfabeto = /[0-9+\-*/();;]/g; // Alfabeto permitido
    const caracteresContados = {};

    // Contar a ocorrência de cada caractere no alfabeto permitido
    expressao.replace(alfabeto, (caractere) => {
        caracteresContados[caractere] = (caracteresContados[caractere] || 0) + 1;
        return ''; // Remover o caractere da string para separar expressões
    });

    return caracteresContados;
}

caracateresPermitidos = ["+", "-", "*", "/", "(", ")", ";"];

function verify_tokens(sentenca, caracteresPermitidos) {
    let resposta = true;
    let caracateres = sentenca;
    console.log("caracteres" + caracateres)
    for (let i = 0; i < caracateres.length; i++) {
        if (isNaN(parseFloat(sentenca[i]))) {
            if (!caracteresPermitidos.includes(sentenca[i])) {
                console.log("o caracter " + sentenca[i] + " não é permitido");
                resposta = false;
            }
        };
    }
    return resposta;
}

function verificaParenteses(expressao) {
    const pilha = [];

    for (let i = 0; i < expressao.length; i++) {
        const char = expressao[i];

        if (char === '(') {
            pilha.push(char);
        } else if (char === ')') {
            if (pilha.length === 0) {
                return false;
            }

            pilha.pop();
        }
    }

    return pilha.length === 0;
}

function resolveExpressaoMatematica(expressao) {
    // Função para dividir a expressão em tokens
    const tokenizar = (expressao) => {
        const regex = /\d+\.?\d*|[-()+*/]/g;
        return expressao.match(regex) || [];
    };

    // Função para analisar a expressão a partir dos tokens
    const analisar = (tokens) => {
        let indice = 0;
        console.log(tokens[indice])


        // Função para analisar um número
        const analisarNumero = () => {
            console.log(tokens[indice])
            return parseFloat(tokens[indice++]);
        };

        // Função para analisar uma expressão
        const analisarExpressao = () => {
            let esquerda = analisarTermo();

            // Processar os operadores de adição e subtração
            while (indice < tokens.length && (tokens[indice] === '+' || tokens[indice] === '-')) {
                console.log(tokens[indice])
                const operador = tokens[indice++];
                const direita = analisarTermo();
                esquerda = operador === '+' ? esquerda + direita : esquerda - direita;
            }

            return esquerda;
        };

        // Função para analisar um termo
        const analisarTermo = () => {
            let esquerda = analisarFator();

            // Processar os operadores de multiplicação e divisão
            while (indice < tokens.length && (tokens[indice] === '*' || tokens[indice] === '/')) {
                console.log(tokens[indice])
                const operador = tokens[indice++];
                const direita = analisarFator();
                esquerda = operador === '*' ? esquerda * direita : esquerda / direita;
            }

            return esquerda;
        };

        // Função para analisar um fator
        const analisarFator = () => {
            if (tokens[indice] === '(') {
                console.log(tokens[indice])
                indice++;
                const resultado = analisarExpressao();
                console.log(tokens[indice])
                indice++; // Consumir o ')'
                return resultado;
            } else if (tokens[indice] === '-') {
                console.log(tokens[indice])
                indice++;
                return -analisarFator();
            } else {
                return analisarNumero();
            }
        };

        // Iniciar a análise sintática
        return analisarExpressao();
    };

    // Obter os tokens da expressão
    const tokens = tokenizar(expressao);

    // Realizar a análise sintática e retornar o resultado
    return analisar(tokens);
}

//FUNÇÕES ACIMA GENERICAS ABAIXO EXECUÇÃO

let expressaoDigit = '10+5*3+(5*10)-10;'
const expressoes = expressaoDigit.trim().split(';');

console.log('expressoes')
console.log(expressoes)
console.log(expressoes[0] == "")

if (expressoes[0] == "") {
    console.log('informe uma expressõa válida.');
}
else if (expressoes[expressoes.length - 1] !== "") {
    console.log('a expressão ' + expressoes[expressoes.length - 1] + ' não foi encerrada corretamente esperado token ;')
}
else if (expressoes.length > 0) {
    console.log('');

    // Calcular e exibir resultados
    expressoes.forEach((expressao) => {
        const expressaoLimpa = expressao.trim();
        if (verify_tokens(expressaoLimpa, caracateresPermitidos) == false) {
            console.log('a expressão ' + expressaoLimpa + ' possuí tokens não permitidos');
        }
        else if (verificaParenteses(expressao) == false) {
            console.log('a expressão ' + expressaoLimpa + ' possuí problemas de abertura e fechamento de parenteses');
        }
        else if (expressaoLimpa) {
            const resultadoAnalise = analiseLexica(expressaoLimpa);
            const resultadoExpressao = resolveExpressaoMatematica(expressaoLimpa);

            // Exibir resultados
            console.log(`<strong>${expressaoLimpa}:</strong> Análise: ${JSON.stringify(resultadoAnalise)}, Resultado: ${resultadoExpressao}`);
        }
    });
    // Limpar caixa de texto
    expressaoInput = '';
}