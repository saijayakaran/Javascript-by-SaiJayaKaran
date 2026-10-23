const getData = async () => {
    const response = await fetch('https://api.restcountries.com/countries/v5?response_fields=names.common,names.native,names.official,currencies,flag.emoji&limit=100&offset=0&api-key=rc_live_ee9690ef3a5648529b04b8ea0ff89af9&pretty=1');
    const data = await response.json();
    return data.data.objects;
};

const displayData = async () => {
    const data = await getData();
    data.forEach((country) => {
         const option = document.createElement("option");
        const currencyCode = country.currencies[0]?.code ?? "Unknown";
        option.value = currencyCode;
        option.textContent = `${country.flag.emoji} ${currencyCode} - ${country.names.official}`;
        document.getElementById("currency1").appendChild(option);
        document.getElementById("currency2").appendChild(option.cloneNode(true))
    });
};

displayData();

const convertButton = document.getElementById("convertbutton");

convertButton.addEventListener("click", () => {
    const fromValue = document.getElementById("currency1").value;
    const toValue = document.getElementById("currency2").value;
    const amountValue = document.getElementById("amount").value;

    const getExchangeRate = async () => {
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/3724c7ab6aabe6274b4e2f42/pair/${fromValue}/${toValue}`
        );
        return await response.json();
    };

    getExchangeRate().then((data) => {
    if (data.result !== "success") {
        document.getElementsByClassName("result")[0].textContent =
            `Error: ${data["error-type"]}`;
        return;
    }

    const exchangeRate = data.conversion_rate;
    const convertedAmount = amountValue * exchangeRate;

    document.getElementsByClassName("result")[0].textContent =
        `${amountValue} ${fromValue} = ${convertedAmount.toFixed(2)} ${toValue}`;
});
});
