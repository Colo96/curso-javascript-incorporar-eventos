debugger;

const codigo_paises = {
    "EUR" : "EU",
    "ARS" : "AR",
    "AUD" : "AU",
    "BOB" : "BO",
    "BRL" : "BR",
    "CAD" : "CA",
    "CHF" : "CH",
    "CLP" : "CL",
    "COP" : "CO",
    "DKK" : "DK",
    "GBP" : "GB",
    "ILS" : "IL",
    "INR" : "IN",
    "ISK" : "IS",
    "JPY" : "JP",
    "KRW" : "KR",
    "MXN" : "MX",
    "NOK" : "NO",
    "NZD" : "NZ",
    "PEN" : "PE",
    "PHP" : "PH",
    "PYG" : "PY",
    "RUB" : "RU",
    "SEK" : "SE",
    "TRY" : "TR",
    "USD" : "US",
    "UYU" : "UY"
}

const dropList = document.querySelectorAll("form select");
const mostrar = document.querySelector(".exchange-rate");
const input = document.querySelector("input[type='text']");
const selectorInicial = document.querySelector(".from select");
const selectorFinal = document.querySelector(".to select");
const imagenFrom = document.querySelector(".from .select-box img");
const imagenTo = document.querySelector(".to .select-box img");
const obtenerBoton = document.querySelector("form button");

window.onload = () => {
    imagenFrom.src = "imagenes/white-flag.png";
    imagenTo.src = "imagenes/white-flag.png";
}


selectorInicial.addEventListener('change', (event) => {
    imagenFrom.src = `https://flagcdn.com/48x36/${event.target.value.toLowerCase()}.png`;
});

selectorFinal.addEventListener('change', (event) => {
    imagenTo.src = `https://flagcdn.com/48x36/${event.target.value.toLowerCase()}.png`;
});

obtenerBoton.addEventListener('click', (e) => {
    e.preventDefault();
    obtenerTipoCambio();
});

function obtenerTipoCambio() {
    let valorMonto = mostrar.value;
    if(valorMonto == "" || valorMonto == "0"){
       mostrar.value = "1";
       valorMonto = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/f97e5b3cb88c6e38d88a4f49/latest/${selectorInicial.value}`;

    fetch(url).then(response => response.json()).then(result => {
        let tipoCambio = result.rates[selectorFinal.value];
        let tasaTotal = (valorMonto * tipoCambio).toFixed(2);
        mostrar.innerText = `${valorMonto} ${selectorInicial.value} = ${tasaTotal} ${selectorFinal.value}`; 
    }).catch(() => {
        mostrar.innerText = "Algo fue mal.";
    });
}
