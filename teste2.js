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


function resolveExpressaoMatematica(expressao) {
    // Função para dividir a expressão em tokens
    const tokenizar = (expressao) => {
      const regex = /\d+\.?\d*|[-()+*/]/g;
      return expressao.match(regex) || [];
    };
  
    // Função para analisar a expressão a partir dos tokens
    const analisar = (tokens) => {
      let indice = 0;
  
      // Função para analisar um número
      const analisarNumero = () => {
        return parseFloat(tokens[indice++]);
      };
  
      // Função para analisar uma expressão
      const analisarExpressao = () => {
        let esquerda = analisarTermo();
  
        // Processar os operadores de adição e subtração
        while (indice < tokens.length && (tokens[indice] === '+' || tokens[indice] === '-')) {
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
          const operador = tokens[indice++];
          const direita = analisarFator();
          esquerda = operador === '*' ? esquerda * direita : esquerda / direita;
        }
  
        return esquerda;
      };
  
      // Função para analisar um fator
      const analisarFator = () => {
        if (tokens[indice] === '(') {
          indice++;
          const resultado = analisarExpressao();
          indice++; // Consumir o ')'
          return resultado;
        } else if (tokens[indice] === '-') {
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
  
  // Exemplo de uso
  const expressaoTeste = "-(12*12+12-12)*12/2+3+(4+10*10)*-10";
  const resultado = resolveExpressaoMatematica(expressaoTeste);
  console.log(`Resultado: ${resultado}`);


  