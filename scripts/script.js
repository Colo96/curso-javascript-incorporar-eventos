debugger;

const codigo_paises = {
    "EU" : "EUR",
    "AR" : "ARS",
    "AU" : "AUD",
    "BO" : "BOB",
    "BR" : "BRL",
    "CA" : "CAD",
    "CH" : "CHF",
    "CL" : "CLP",
    "CO" : "COP",
    "DK" : "DKK",
    "GB" : "GBP",
    "IL" : "ILS",
    "IN" : "INR",
    "IS" : "ISK",
    "JP" : "JPY",
    "KR" : "KRW",
    "MX" : "MXN",
    "NO" : "NOK",
    "NZ" : "NZD",
    "PE" : "PEN",
    "PH" : "PHP",
    "PY" : "PYG",
    "RU" : "RUB",
    "SE" : "SEK",
    "TR" : "TRY",
    "US" : "USD",
    "UY" : "UYU"
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
    obtenerTipoCambio();
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
    fetch(url).then(response => response.json()).then(result =>{
        let tipoCambio = result.conversion_rates[selectorFinal.value];
        let tasaTotal = (valorMonto * tipoCambio).toFixed(2);
        mostrar.innerText = `${valorMonto} ${selectorInicial.value} = ${tasaTotal} ${selectorFinal.value}`;
    }).catch(() =>{
        mostrar.innerText = "Algo salio mal";
    });
}

