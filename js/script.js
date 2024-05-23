function mostrarCampos(opcion) {
    var campos = document.getElementById('campos');
    campos.style.display = 'block';
    campos.innerHTML = '';

    if (opcion == 1 || opcion == 3 || opcion == 4) {
        campos.innerHTML = `
            <label for="n">Ingrese n del flujo de caja libre:</label>
            <input type="number" id="n"><br>
            <label for="inversion">Ingrese la inversión:</label>
            <input type="number" id="inversion"><br>
            <label for="tasa_descuento">Ingrese la tasa de descuento efectiva anual:</label>
            <input type="number" step="0.01" id="tasa_descuento"><br>
        `;
    } else if (opcion == 2) {
        campos.innerHTML = `
            <label for="n">Ingrese n del flujo de caja libre:</label>
            <input type="number" id="n"><br>
            <label fo= "Tasa interes">Ingrese la tasa de interés</label><br>
            <input type="number" id="interes"><br>
            <label for="inversion">Ingrese la inversión:</label>
            <input type="number" id="inversion"><br>
        `;
    }
}

function calcular() {
    var opcion = parseInt(document.getElementById('opcion').value);

    if (opcion == 1 || opcion == 3 || opcion == 4) {
        var n = parseInt(document.getElementById('n').value);
        var inversion = parseInt(document.getElementById('inversion').value)*-1;
        var tasa_descuento = parseFloat(document.getElementById('tasa_descuento').value)/100;
    } else if (opcion == 2) {
        var n = parseInt(document.getElementById('n').value);
        var inversion = parseInt(document.getElementById('inversion').value)*-1;
        var interes = parseFloat(document.getElementById('interes').value)/100;
    }

    var resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';

    if (opcion == 1) {
        var flujos_caja = [];

        for (var fne = 0; fne < n; fne++) {
            var fneValue = parseInt(prompt("Ingrese el flujo neto de efectivo por año:"));
            flujos_caja.push(fneValue);
        }

        var VPN = 0;

        for (let valor = 0; valor < n; valor++) {
            var vpn = flujos_caja[valor] /((1 + tasa_descuento)**(valor + 1));
            VPN += vpn;
        }

        VPN += inversion;

        resultadoElement.innerHTML = `El Valor Presente Neto (VPN) es: ${VPN}<br>`;

        if (VPN > 0) {
            resultadoElement.innerHTML += "Se acepta la alternativa";
        } else if (VPN == 0) {
            resultadoElement.innerHTML += "Indiferente aceptar";
        } else if (VPN < 0) {
            resultadoElement.innerHTML += "Se rechaza la alternativa";
        }
    } else if (opcion == 2) {
        var flujos_caja = [];

        flujos_caja.push(inversion);

        for (var fne = 0; fne < n; fne++) {
            var fneValue = parseInt(prompt("Ingrese el flujo neto de efectivo por año:"));
            flujos_caja.push(fneValue);
        }

        var tir = calcularTIR(flujos_caja,interes);


        resultadoElement.innerHTML = `La Tasa Interna de Retorno (TIR) es: ${tir * 100}%<br>`;

        // var tasa_descuento = parseFloat(prompt("Ingrese la tasa de descuento efectiva anual:"))/100;

        if (tir > tasa_descuento) {
            resultadoElement.innerHTML += "Aceptar la alternativa";
        } else if (tir == tasa_descuento) {
            resultadoElement.innerHTML += "Indiferente de aceptar";
        } else {
            resultadoElement.innerHTML += "Rechazar la alternativa";
        }
    } else if (opcion == 3) {
        var flujos_caja = [];

        for (var fne = 0; fne < n; fne++) {
            var fneValue = parseInt(prompt("Ingrese el flujo neto de efectivo por año:"));
            flujos_caja.push(fneValue);
        }

        var VPN = 0;

        for (var valor = 0; valor < n; valor++) {
            var vpn = flujos_caja[valor] / Math.pow((1 + tasa_descuento), (valor + 1));
            VPN += vpn;
        }

        var BC = VPN / -inversion;

        resultadoElement.innerHTML = `El Beneficio-Costo (B/C) es: ${BC}<br>`;

        if (BC > 1) {
            resultadoElement.innerHTML += "Se acepta la alternativa";
        } else if (BC == 1) {
            resultadoElement.innerHTML += "Indiferente de aceptar";
        } else if (BC < 1) {
            resultadoElement.innerHTML += "Se rechaza la alternativa";
        }
    } else if (opcion == 4) {
        var flujos_caja = [];

        for (var fne = 0; fne < n; fne++) {
            var fneValue = parseInt(prompt("Ingrese el flujo neto de efectivo por año:"));
            flujos_caja.push(fneValue);
        }

        var valores_VPN_FNE = [];

        for (var valor = 0; valor < n; valor++) {
            var vpn = flujos_caja[valor] / Math.pow((1 + tasa_descuento), (valor + 1));
            valores_VPN_FNE.push(vpn);
        }

        var payback = 0;
        var indice = 0;

        while (payback < inversion && indice < valores_VPN_FNE.length) {
            payback += valores_VPN_FNE[indice];
            indice++;
        }

        if (payback >= inversion) {
            resultadoElement.innerHTML = `El payback se alcanza en el periodo: ${indice}`;
        } else {
            resultadoElement.innerHTML = "El payback no se alcanza";
        }
    } else {
        // resultadoElement.innerHTML = "Opción no válida";
        alert("Opcion no valida");
    }
}

function calcularTIR(flujos_caja,interes) {
    var npv = 0;

    for (var i = 0; i < flujos_caja.length; i++) {
        npv += flujos_caja[i] /((1 +interes))**i;
    }

    return npv;
}