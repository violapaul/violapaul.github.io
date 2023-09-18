
function parseEquation(eq) {
    let xCoeffMatch = eq.match(/([-+]?\d*\.?\d*)?\s*x/);
    let yCoeffMatch = eq.match(/([-+]?\d*\.?\d*)?\s*y/);
    let constantMatch = eq.match(/=\s*([-+]?\d*\.?\d+)/);

    if (xCoeffMatch && yCoeffMatch && constantMatch) {
        let aVal = xCoeffMatch[1];
        let a = aVal ? (aVal === '-' || aVal === '+' ? (aVal === '-' ? -1 : 1) : parseFloat(aVal)) : 1;

        let bVal = yCoeffMatch[1];
        let b = bVal ? (bVal === '-' || bVal === '+' ? (bVal === '-' ? -1 : 1) : parseFloat(bVal)) : 1;

        let c = parseFloat(constantMatch[1]);

        return [a, b, c];
    }
    return null;
}

function solveEquations(coeffs1, coeffs2) {
    let [a, b, c] = coeffs1;
    let [p, q, r] = coeffs2;

    let denominator = a * q - b * p;
    if (denominator === 0) {
        return null;
    }

    let x = (c * q - b * r) / denominator;
    let y = (a * r - c * p) / denominator;

    return [x, y];
}

function plotEquations() {
    const eq1 = document.getElementById("eq1").value;
    const eq2 = document.getElementById("eq2").value;

    const coeffs1 = parseEquation(eq1);
    const coeffs2 = parseEquation(eq2);

    const solution = solveEquations(coeffs1, coeffs2);
    const solutionDisplay = document.getElementById("solutionDisplay");

    if (solution) {
        solutionDisplay.textContent = "The solution is: x = " + solution[0].toFixed(2) + ", y = " + solution[1].toFixed(2);
    } else {
        solutionDisplay.textContent = "The equations are either parallel or represent the same line.";
    }

    const xValues = [-10, 10];
    const yValuesEq1 = xValues.map(x => (coeffs1[2] - coeffs1[0] * x) / coeffs1[1]);
    const yValuesEq2 = xValues.map(x => (coeffs2[2] - coeffs2[0] * x) / coeffs2[1]);

    const data = [{
        x: xValues,
        y: yValuesEq1,
        type: 'scatter',
        mode: 'lines',
        name: 'Equation 1'
    },
    {
        x: xValues,
        y: yValuesEq2,
        type: 'scatter',
        mode: 'lines',
        name: 'Equation 2'
    }];


    var layout = {
        title: 'Graph of Linear Equations',        
        xaxis: {
            scaleanchor: 'y',
            range: [-10, 10],  // Set fixed range for x-axis
            scaleratio: 1
        },
        yaxis: {
            scaleanchor: 'x',
            range: [-10, 10],  // Set fixed range for x-axis
            scaleratio: 1
        }
    };

    
    // const layout = {
    //     title: 'Graph of Linear Equations',
    //     xaxis: {
    //         title: 'x',
    //         range: [-10, 10],
    //         fixedrange: true
    //     },
    //     yaxis: {
    //         title: 'y',
    //         range: [-10, 10],
    //         fixedrange: true
    //     },
    //     aspectmode: 'equal'
    // };

    Plotly.newPlot('plotArea', data, layout);
}
