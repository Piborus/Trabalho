// script.js
document.getElementById('health-plan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const imc = weight / (height * height);

    const planosA = calcularPlanosA(age, imc);
    const planosB = calcularPlanosB(imc);

    const resultado = compararPlanos(planosA, planosB);

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';
    resultElement.appendChild(gerarTabelaResultado(planosA, planosB, resultado));
    resultElement.style.display = 'block';
});

function calcularPlanosA(age, imc) {
    return {
        basico: 100 + (age * 10 * (imc / 10)),
        standard: (150 + (age * 15)) * (imc / 10),
        premium: (200 - (imc * 10) + (age * 20)) * (imc / 10)
    };
}

function calcularPlanosB(imc) {
    let fatorComorbidade;

    if (imc < 18.5) {
        fatorComorbidade = 10;
    } else if (imc < 25) {
        fatorComorbidade = 1;
    } else if (imc < 30) {
        fatorComorbidade = 6;
    } else if (imc < 35) {
        fatorComorbidade = 10;
    } else if (imc < 40) {
        fatorComorbidade = 20;
    } else {
        fatorComorbidade = 30;
    }

    return {
        basico: 100 + (fatorComorbidade * 10 * (imc / 10)),
        standard: (150 + (fatorComorbidade * 15)) * (imc / 10),
        premium: (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10)
    };
}

function compararPlanos(planosA, planosB) {
    return {
        basico: planosA.basico < planosB.basico ? 'A' : 'B',
        standard: planosA.standard < planosB.standard ? 'A' : 'B',
        premium: planosA.premium < planosB.premium ? 'A' : 'B'
    };
}

function gerarTabelaResultado(planosA, planosB, resultado) {
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-responsive');

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    const thead = document.createElement('thead');
    thead.classList.add('thead-light');

    const headerRow = document.createElement('tr');
    const headers = ['Plano', 'Operadora A', 'Operadora B', 'Melhor Opção'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const planos = ['Básico', 'Standard', 'Premium'];
    planos.forEach((plano, index) => {
        const row = document.createElement('tr');
        const planoCell = document.createElement('td');
        planoCell.textContent = plano;
        row.appendChild(planoCell);

        const operadoraACell = document.createElement('td');
        operadoraACell.textContent = `R$ ${[planosA.basico, planosA.standard, planosA.premium][index].toFixed(2)}`;
        row.appendChild(operadoraACell);

        const operadoraBCell = document.createElement('td');
        operadoraBCell.textContent = `R$ ${[planosB.basico, planosB.standard, planosB.premium][index].toFixed(2)}`;
        row.appendChild(operadoraBCell);

        const melhorOpcaoCell = document.createElement('td');
        melhorOpcaoCell.textContent = `Operadora ${[resultado.basico, resultado.standard, resultado.premium][index]}`;
        row.appendChild(melhorOpcaoCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    return tableContainer;
}
