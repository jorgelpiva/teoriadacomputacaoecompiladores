string = "(12*12+12-12)*12/2+3+4+10*10*10"
string = '5+31*-18'

function resolucaoConta(sentenca) {
    stringCompleta = sentenca;
    let aux = ""

    while (isNaN(stringCompleta)) {

        //################################### resolvendo os parenteses #################################################

        if (stringCompleta.includes("(")) {
            let abriu = false;
            let iabert = -1;
            let fechou = false;
            let ifecha = -1;
            for (let i = 0; i < stringCompleta.length; i++) {
                if (stringCompleta[i] == "(") {
                    abriu = true;
                    iabert = i;

                } else if (stringCompleta[i] == ")") {
                    fechou = true;
                    ifecha = i;
                }
                if (abriu && fechou) {
                    aux = stringCompleta.substring(iabert, ifecha + 1);
                    aux = aux.replace("(", "").replace(")", "");
                    sub = stringCompleta.substring(iabert, ifecha + 1);
                }
            }
            while (aux.includes('*') || aux.includes('/')) {
                let indexDiv = 9999999999;
                let indexMult = 9999999999;
                indexMult = aux.indexOf("*") == -1 ? 9999999999 : aux.indexOf("*");
                indexDiv = aux.indexOf("/") == -1 ? 9999999999 : aux.indexOf("/");


                if (indexMult < indexDiv) {
                    let dirContaOk = false;
                    let leftContaok = false;
                    let dirConta;
                    let leftConta;
                    let indDirConta = indexMult + 1;
                    let indLeftConta = indexMult - 1;
                    let subResultado = 0;
                    while (!dirContaOk || !leftContaok) {
                        if (!isNaN(parseFloat(aux[indLeftConta])) && (isNaN(parseFloat(aux[indLeftConta - 1]))) || indLeftConta == 0) {
                            leftContaok = true;
                            leftConta = aux.substring(indLeftConta, indexMult);
                        }

                        if (!isNaN(parseFloat(aux[indDirConta])) && (isNaN(parseFloat(aux[indDirConta + 1]))) || indDirConta == aux.length) {
                            dirContaOk = true;
                            dirConta = aux.substring(indexMult + 1, indDirConta + 1);
                        }

                        if (dirContaOk && leftContaok) {
                            subResultado = parseFloat(dirConta) * parseFloat(leftConta);
                            let trechoCalculado = aux.substring(indLeftConta, indDirConta + 1);
                            aux = aux.replace(trechoCalculado, subResultado);
                        }

                        if (leftContaok == false) {
                            indLeftConta += -1
                        }
                        if (dirContaOk == false) {
                            indDirConta += 1
                        }
                    }

                } else if (indexDiv < indexMult) {
                    let dirContaOk = false;
                    let leftContaok = false;
                    let dirConta;
                    let leftConta;
                    let indDirConta = indexDiv + 1;
                    let indLeftConta = indexDiv - 1;
                    let subResultado = 0;
                    while (!dirContaOk || !leftContaok) {
                        if (!isNaN(parseFloat(aux[indLeftConta])) && (isNaN(parseFloat(aux[indLeftConta - 1]))) || indLeftConta == 0) {
                            leftContaok = true;
                            leftConta = aux.substring(indLeftConta, indexDiv);
                        }

                        if (!isNaN(parseFloat(aux[indDirConta])) && (isNaN(parseFloat(aux[indDirConta + 1]))) || indDirConta == aux.length) {
                            dirContaOk = true;
                            dirConta = aux.substring(indexDiv + 1, indDirConta + 1);
                        }

                        if (dirContaOk && leftContaok) {
                            subResultado = parseFloat(leftConta) / parseFloat(dirConta);
                            let trechoCalculado = aux.substring(indLeftConta, indDirConta + 1);
                            aux = aux.replace(trechoCalculado, subResultado);
                        }

                        if (leftContaok == false) {
                            indLeftConta += -1
                        }
                        if (dirContaOk == false) {
                            indDirConta += 1
                        }
                    }

                }
            }

            while (isNaN(aux)) {
                let numeroAdireita = "";
                let numeroAEsquerda = "";

                let operador = "";
                subResultado = "";
                for (let i = 0; i <= aux.length; i++) {
                    if (i == aux.length && subResultado == "") {
                        operador == "+" ? subResultado = parseFloat(numeroAEsquerda) + parseFloat(numeroAdireita) : subResultado = parseFloat(numeroAEsquerda) - parseFloat(numeroAdireita)
                        aux = aux.replace(aux.substring(0, i), subResultado)
                    } else if (!isNaN(aux[i]) && !isNaN(aux[i + 1]) && operador == "") {
                        numeroAEsquerda = numeroAEsquerda + aux[i];
                    } else if (!isNaN(aux[i]) && isNaN(aux[i + 1]) && operador == "") {
                        numeroAEsquerda = numeroAEsquerda + aux[i];
                    } else if (numeroAEsquerda !== "" && isNaN(aux[i]) && numeroAdireita == "") {
                        operador = aux[i];
                    } else if (operador !== "" && !isNaN(aux[i])) {
                        numeroAdireita = numeroAdireita + aux[i]
                    } else if (numeroAdireita !== "" && (isNaN(aux[i]) || aux.length - 1 == i)) {
                        operador == "+" ? subResultado = parseFloat(numeroAEsquerda) + parseFloat(numeroAdireita) : subResultado = parseFloat(numeroAEsquerda) - parseFloat(numeroAdireita)
                        aux = aux.replace(aux.substring(0, i), subResultado)
                        operador = "";
                        break;
                    }
                }
            }
            stringCompleta = stringCompleta.replace(sub, aux);
        }



        //################################### resolvendo os parenteses #################################################

        //################################### resolvendo o restante    #################################################

        aux = stringCompleta;
        while (aux.includes('*') || aux.includes('/')) {
            indexMult = 9999999999
            indexDiv = 9999999999
            indexMult = aux.indexOf("*") == -1 ? 9999999999 : aux.indexOf("*");
            indexDiv = aux.indexOf("/") == -1 ? 9999999999 : aux.indexOf("/");

            if (indexMult < indexDiv) {
                let indexIni = indexMult;
                let sinalDir;
                let dirContaOk = false;
                let leftContaok = false;
                let dirConta;
                let leftConta;
                let indDirConta = indexMult + 1;
                let indLeftConta = indexMult - 1;
                let subResultado = 0;
                let incrementoDir = 2
                while (!dirContaOk || !leftContaok) {
                    if (!isNaN(parseFloat(aux[indLeftConta])) && (isNaN(parseFloat(aux[indLeftConta - 1]))) || indLeftConta == 0) {
                        
                        leftContaok = true;
                        leftConta = aux.substring(indLeftConta, indexMult);
                        teste = aux[indLeftConta -1]
                        if((indexIni - indLeftConta) == 0|| aux[indLeftConta-1] == "+"){
                            leftConta * +1
                        }else{
                            leftConta = parseFloat(leftConta) * -1
                        }

                    }

                    if(aux[indexIni + 1] == "+"){
                        sinalDir = '+'
                        indDirConta += 1;
                    }else if(aux[indexIni + 1] == "-"){
                        sinalDir = '-'
                        indDirConta += 1; 
                    }else{
                        sinalDir = '+'
                        incrementoDir = 1;
                    }

                    if (!isNaN(parseFloat(aux[indDirConta])) && (isNaN(parseFloat(aux[indDirConta + 1]))) || indDirConta == aux.length) {
                        dirContaOk = true; 
                        dirConta = aux.substring(indexMult + incrementoDir, indDirConta + 1);
                        sinalDir == '+' ? dirConta = parseFloat(dirConta) * 1 : dirConta = parseFloat(dirConta) * -1
                    }

                    if (dirContaOk && leftContaok) {
                        subResultado = parseFloat(dirConta) * parseFloat(leftConta);
                        let trechoCalculado 
                        subResultado < 0 ? trechoCalculado = aux.substring(indLeftConta - 1, indDirConta + 1): trechoCalculado = aux.substring(indLeftConta - 1, indDirConta + 1);
                        aux = aux.replace(trechoCalculado, subResultado);
                        stringCompleta = stringCompleta.replace(trechoCalculado, subResultado);
                    }

                    if (leftContaok == false) {
                        indLeftConta += -1
                    }
                    if (dirContaOk == false) {
                        indDirConta += 1
                    }
                }

            } else if (indexDiv < indexMult) {
                let dirContaOk = false;
                let leftContaok = false;
                let dirConta;
                let leftConta;
                let indDirConta = indexDiv + 1;
                let indLeftConta = indexDiv - 1;
                let subResultado = 0;
                while (!dirContaOk || !leftContaok) {
                    if (!isNaN(parseFloat(aux[indLeftConta])) && (isNaN(parseFloat(aux[indLeftConta - 1]))) || indLeftConta == 0) {
                        leftContaok = true;
                        leftConta = aux.substring(indLeftConta, indexDiv);
                    }

                    if (!isNaN(parseFloat(aux[indDirConta])) && (isNaN(parseFloat(aux[indDirConta + 1]))) || indDirConta == aux.length) {
                        dirContaOk = true;
                        dirConta = aux.substring(indexDiv + 1, indDirConta + 1);
                    }

                    if (dirContaOk && leftContaok) {
                        subResultado = parseFloat(leftConta) / parseFloat(dirConta);
                        let trechoCalculado = aux.substring(indLeftConta, indDirConta + 1);
                        aux = aux.replace(trechoCalculado, subResultado);
                        stringCompleta = stringCompleta.replace(trechoCalculado, subResultado);
                    }

                    if (leftContaok == false) {
                        indLeftConta += -1
                    }
                    if (dirContaOk == false) {
                        indDirConta += 1
                    }
                }

            }
        }

        while (isNaN(aux)) {
            let numeroAdireita = "";
            let numeroAEsquerda = "";

            let operador = "";
            subResultado = "";
            for (let i = 0; i <= aux.length; i++) {
                if (i == aux.length && subResultado == "") {
                    operador == "+" ? subResultado = parseFloat(numeroAEsquerda) + parseFloat(numeroAdireita) : subResultado = parseFloat(numeroAEsquerda) - parseFloat(numeroAdireita)
                    aux = aux.replace(aux.substring(0, i), subResultado)
                } else if (!isNaN(aux[i]) && !isNaN(aux[i + 1]) && operador == "") {
                    numeroAEsquerda = numeroAEsquerda + aux[i];
                } else if (!isNaN(aux[i]) && isNaN(aux[i + 1]) && operador == "") {
                    numeroAEsquerda = numeroAEsquerda + aux[i];
                } else if (numeroAEsquerda !== "" && isNaN(aux[i]) && numeroAdireita == "") {
                    operador = aux[i];
                } else if (operador !== "" && !isNaN(aux[i])) {
                    numeroAdireita = numeroAdireita + aux[i]
                } else if (numeroAdireita !== "" && (isNaN(aux[i]) || aux.length - 1 == i)) {
                    operador == "+" ? subResultado = parseFloat(numeroAEsquerda) + parseFloat(numeroAdireita) : subResultado = parseFloat(numeroAEsquerda) - parseFloat(numeroAdireita)
                    aux = aux.replace(aux.substring(0, i), subResultado)
                    numeroAdireita = "";
                    numeroAEsquerda = "";
                    operador = "";
                    break;
                }
            }
            stringCompleta = stringCompleta.replace(stringCompleta, aux);
        }
        return stringCompleta
    }
}

console.log(resolucaoConta(string));

function parentesesOK(texto) {
    resposta = false;
    expressao = texto;
    if (expressao.includes('(') || expressao.includes(')')) {

        abriu = false
        fechou = false
        indiceA = expressao.indexOf('(')
        indiceF = expressao.indexOf(')')
        if(indiceA>indiceF){
            return false;
        }
        while (expressao.includes('(') || expressao.includes(')')) {
            break;
        }
    } else {
        return true;
    }
    return resposta;
}
console.log(parentesesOK(string))