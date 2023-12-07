/*
Análise Léxica:

Definição: A análise léxica é a primeira fase do processo de análise de linguagens de programação ou de texto natural. Seu objetivo é analisar a sequência de caracteres de entrada e identificar os chamados "tokens" ou unidades léxicas, como palavras-chave, identificadores, números, operadores, etc.
Ordem de Execução: A análise léxica ocorre antes da análise sintática e semântica.
Importância: A análise léxica é fundamental para estruturar a entrada de forma que seja mais fácil para as fases subsequentes entenderem a estrutura do texto ou código.
*/ 

texto_exemplo1 =  `
    (2 * 1) * 9; 1+ 3;\n
    (1 * 3 + 5) * 8;\n 
    2+5+12;\n
    4-4+4;
    `

    function remover_espacos_quebras (sentenca) {
        let texto = sentenca;
        texto = texto.replace(/\s/g, "");
        texto = texto.replace(/\n/g, "");
        return texto;

    }
    sentenca_limpa = remover_espacos_quebras(texto_exemplo1);

caracateresPermitidos = ["+" , "-", "*" , "/" , "(", ")", ";"]

//verificar se só existem caracteres válidos
console.log(sentenca_limpa.length)

function verify_tokens (sentenca, caracteresPermitidos){ 
    let resposta = true;
    let caracateres = sentenca;
    console.log("caracteres" + caracateres) 
    for (let i = 0 ; i < caracateres.length; i++){
        if(isNaN(parseFloat(sentenca[i]))){
            if (!caracteresPermitidos.includes(sentenca[i])){
                console.log("o caracter " + sentenca[i] + " não é permitido");
                resposta = false;
            }
        };   
    }
    return resposta;
} 

console.log(sentenca_limpa)

console.log(verify_tokens(sentenca_limpa, caracateresPermitidos));

function verificarFinal (sentenca){
    let sentencas = sentenca.split(";")
    if(sentencas[sentencas.length -1] == ""){
        return true;
    }else{
        console.log("A sentença não foi devidamente finalizada");
        return false;
    }
}

console.log("Final da sentença");
console.log(verificarFinal(sentenca_limpa))

let resultados = [];

listaDeSentencas = sentenca_limpa.split(";");

function contar_Parenteses(sentenca){
    let contaAbertura = 0;
    let contaFechamento = 0;

    for (let caracter of sentenca){
        if(caracter == "("){
            contaAbertura++
        }else if(caracter == ")"){
            contaFechamento++
        }
    }
    return contaAbertura == contaFechamento;
} 

console.log("parenteses")
console.log(contar_Parenteses(sentenca_limpa))

/*function resolverConta (listaDeSentencas){
    
    for(let sentenca of listaDeSentencas){
        let tabelaAux = [];
        if(sentenca.includes("(")){
            let abriu = [];
            let fechou = [];
            for(let i = 0 ; i < sentenca.length; i++){
                if(sentenca[i] == "("){
                    abriu.push(i);
                }else if(sentenca[i]== ")"){
                    fechou.push(i);
                }
                }
                console.log(abriu, fechou)
                if(abriu.length > 1){

                }else{
                    tabelaAux.push(sentenca.substring(abriu + 1, fechou));
                    console.log("Tabela Aux " + tabelaAux)
                }
            }
        }
    }
    resolverConta(listaDeSentencas);
  */  


/*
Análise Sintática:

Definição: A análise sintática ocorre após a análise léxica e se concentra na estrutura gramatical da sequência de tokens identificada pela análise léxica. Ela verifica se a combinação de tokens segue as regras gramaticais da linguagem.
Ordem de Execução: A análise sintática ocorre após a análise léxica e antes da análise semântica.
Importância: A análise sintática é crucial para compreender a estrutura gramatical do texto ou código, identificando a relação entre os diferentes elementos e organizando-os de acordo com a sintaxe da linguagem.
*/

/*
Análise Semântica:

Definição: A análise semântica é a fase em que o significado ou a semântica do código ou texto é verificado. Ela analisa se as construções gramaticais têm significado válido dentro do contexto da linguagem.
Ordem de Execução: A análise semântica ocorre após a análise léxica e sintática.
Importância: A análise semântica é essencial para garantir que o código ou texto tenha um significado coerente e esteja de acordo com as regras semânticas da linguagem. Isso envolve a verificação de tipos, escopo de variáveis, e outras questões relacionadas ao significado do programa.
*/

//texto de exemplo

