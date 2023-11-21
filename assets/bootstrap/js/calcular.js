function calcularImc() {    

    const { peso, altura, idade } = getDados();  
    const resultado = (peso/(altura*altura));

    const classificacao = classificacaoOMS (resultado);
    const risco = riscoComobirdade(resultado);

    document.getElementById("resultPeso").innerHTML = peso;
    document.getElementById("resultAltura").innerHTML = altura;
    document.getElementById("resultIdade").innerHTML = idade;
    document.getElementById("resultIMC").innerHTML = resultado.toFixed(2);
    document.getElementById("resultClassificacaoOMS").innerHTML = classificacao;
    document.getElementById("resultRisco").innerHTML = risco;
    compararPlanos();

}

function getDados() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const idade = document.getElementById('idade').value;
    return {peso, altura, idade};
}

function verificarSePodeComprar(dinheiro, totalCompra) {
    if (dinheiro >= totalCompra) {
        return 'Pode comprar';
    } else {
        return 'Não pode comprar';
    }
}

function classificacaoOMS(resultado) {
    if (resultado < 18.5) {
        return 'Peso Baixo';
    }else if (resultado >= 18.5 && resultado <= 24.9) {
        return 'Peso Normal';
    }else if (resultado >= 25 && resultado <= 29.9) {
        return 'Sobrepeso';
    }else if (resultado >= 30 && resultado <= 34.9) {
        return 'Obesidade';
    }else if (resultado >= 35 && resultado <= 39.9) {
        return 'Obesidade Móbida';
    }else if (resultado >= 40) {
        return 'Caixão e vela preta';
    }
}

function riscoComobirdade(resultado) {
    let teste = '';
    if (resultado < 18.5) {
        teste = 'Baixo';
        //alert(teste);
        return teste;
        //return 'Baixo';
    } else if (resultado >= 18.5 && resultado <= 24.9) {
        teste = 'Normal';
        //alert(teste);
        return teste;
        //return 'Normal';
    } else if (resultado >= 25 && resultado <= 29.9) {
        teste = 'Aumentado';
        //alert(teste);
        return teste;
        //return 'Aumentado';
    }else if (resultado >= 30 && resultado <= 34.9) {
        teste = 'Moderado';
        //alert(teste);
        return teste;
        //return 'Moderado';
    }else if (resultado >= 35 && resultado <= 39.9) {
        teste = 'Grave';
        //alert(teste);
        return teste;
        //return 'Grave';
    }else if (resultado >= 40) {
       teste = 'Ta é morto';
       //alert(teste);
       return teste;
       //return 'Ta é morto';
    }
}

function compararPlanos() {

    const { peso, altura, idade } = getDados(); 
    const imc = (peso/(altura*altura));    

    // Operadora A 
    // Const precoA é um objeto com 3 propriedades. Basic, standard e premium, sendo atribuido valores a eles por meio do calculo
    const precoA = {
        basic: 100 + (idade * 10 * (imc / 10)),
        standard: (150 + (idade * 15)) * (imc / 10),
        premium: (200 - (imc * 10) + (idade * 20)) * (imc / 10)
    };

    // Operadora B
    
    // calculo do fator comorbidade
    //  expressão condicional (ternária) que calcula o fator de comorbidade
    // Se o IMC < 18.5, o fator de comorbidade = 10.
    // Se o IMC < 24.9, o fator de comorbidade = 1. ...
    // condicao ? valor_se_verdadeiro : valor_se_falso
    const fatorComorbidade = (imc < 18.5) ? 10 : (imc < 24.9) ? 1 : (imc < 29.9) ? 6 : (imc < 34.9) ? 10 : (imc < 39.9) ? 20 : 30;

    // Const precoB é um objeto com 3 propriedades. Basic, standard e premium, sendo atribuido valores a eles por meio do calculo
    const precoB = {
        basic: 100 + (fatorComorbidade * 10 * (imc / 10)),
        standard: (150 + (fatorComorbidade * 15)) * (imc / 10),
        premium: (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10)
    };
    
    // .toFixec(2) separa o número decimal para duas casa dps da vírgula
    const resultado = `
            
            <table class="table">
            <thead>
            <tr>
                <th scope="col">Pacote do Plano</th>
                <th scope="col">Unimed</th>
                <th scope="col">Hapvida</th>
                <th scope="col">Extrato</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> Basic </td>
                <td>R$ ${precoA.basic.toFixed(2)} </td>
                <td>R$ ${precoB.basic.toFixed(2)} </td>
                <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#extrBasic"> Abrir Extrato </button> </td>
            </tr>
            <tr>
                <td> Standard </td>
                <td>R$ ${precoA.standard.toFixed(2)} </td>
                <td>R$ ${precoB.standard.toFixed(2)} </td>
                <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#extrStandard"> Abrir Extrato </button> </td>
            </tr> 
            <tr>
                <td> Premium </td>
                <td>R$ ${precoA.premium.toFixed(2)} </td>
                <td>R$ ${precoB.premium.toFixed(2)} </td>
                <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#extrPremium"> Abrir Extrato </button> </td>
            </tr>                        
            </tbody>
        </table>
    `;
    document.getElementById("resultPlanos").innerHTML = resultado;

    // Basic
    //PlanoA Basic
    document.getElementById("extrIdadePlanoABasic").innerHTML = idade;
    document.getElementById("extrAlturaPlanoABasic").innerHTML = altura;
    document.getElementById("extrImcPlanoABasic").innerHTML = imc.toFixed(2);
    document.getElementById("extrTotalPlanoABasic").innerHTML = precoA.basic.toFixed(2);

    //PlanoB Basic
    document.getElementById("extrIdadePlanoBBasic").innerHTML = idade;
    document.getElementById("extrAlturaPlanoBBasic").innerHTML = altura;
    document.getElementById("extrImcPlanoBBasic").innerHTML = imc.toFixed(2);
    document.getElementById("extrComorbidadePlanoBBasic").innerHTML = fatorComorbidade;
    document.getElementById("extrTotalPlanoBBasic").innerHTML = precoB.basic.toFixed(2);

    // Standard
    //PlanoA Standard
    document.getElementById("extrIdadePlanoAStandard").innerHTML = idade;
    document.getElementById("extrAlturaPlanoAStandard").innerHTML = altura;
    document.getElementById("extrImcPlanoAStandard").innerHTML = imc.toFixed(2);
    document.getElementById("extrTotalPlanoAStandard").innerHTML = precoA.standard.toFixed(2);

    //PlanoB Standard
    document.getElementById("extrIdadePlanoBStandard").innerHTML = idade;
    document.getElementById("extrAlturaPlanoBStandard").innerHTML = altura;
    document.getElementById("extrImcPlanoBStandard").innerHTML = imc.toFixed(2);
    document.getElementById("extrComorbidadePlanoBStandard").innerHTML = fatorComorbidade;
    document.getElementById("extrTotalPlanoBStandard").innerHTML = precoB.standard.toFixed(2);

    // Premium
    //PlanoA Standard
    document.getElementById("extrIdadePlanoAPremium").innerHTML = idade;
    document.getElementById("extrAlturaPlanoAPremium").innerHTML = altura;
    document.getElementById("extrImcPlanoAPremium").innerHTML = imc.toFixed(2);
    document.getElementById("extrTotalPlanoAPremium").innerHTML = precoA.premium.toFixed(2);

    //PlanoB Standard
    document.getElementById("extrIdadePlanoBPremium").innerHTML = idade;
    document.getElementById("extrAlturaPlanoBPremium").innerHTML = altura;
    document.getElementById("extrImcPlanoBPremium").innerHTML = imc.toFixed(2);
    document.getElementById("extrComorbidadePlanoBPremium").innerHTML = fatorComorbidade;
    document.getElementById("extrTotalPlanoBPremium").innerHTML = precoB.premium.toFixed(2);

    const valorABasic = precoA.basic.toFixed(2);
    const valorAStandard = precoA.standard.toFixed(2);
    const valorAPremium = precoA.premium.toFixed(2);

    const valorBBasic = precoB.basic.toFixed(2);
    const valorBStandard = precoB.standard.toFixed(2);
    const valorBPremium = precoB.premium.toFixed(2);

    const melhorPlano = sugerirPlano(valorABasic, valorAStandard, valorAPremium, valorBBasic, valorBStandard, valorBPremium);
    

    document.getElementById("melhorPlano").innerHTML = (' O plano mais barato custa R$'+ melhorPlano);
    
}

function sugerirPlano(valorABasic, valorAStandard, valorAPremium, valorBBasic, valorBStandard, valorBPremium) {
    // Array contendo os valores fornecidos como parâmetros
    const valores = [valorABasic, valorAStandard, valorAPremium, valorBBasic, valorBStandard, valorBPremium];

    // Encontrar o menor valor
    const menorValor = Math.min(...valores);

    // Encontrar o índice do menor valor no array
    const indiceMenorValor = valores.indexOf(menorValor);

    // Sugerir o plano correspondente ao índice
    const sugestao = `Sugira o Plano ${String.fromCharCode(65 + indiceMenorValor)}`;

    return menorValor;

}
