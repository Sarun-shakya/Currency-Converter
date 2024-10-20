const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

document
for(let select of dropdowns){
for( currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    }
    else if(select.name === "to" && currCode === "NPR"){
        newOption.selected = "selected";  
    }
    select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        UpdateFlag(evt.target);
    });
}

const UpdateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    console.log(amountValue);
    if(amountValue == "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;   
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowercase()];
    
    let finalAmount = amountValue * rate;
    msg.innerText `${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});

