//Set Dark Theme if it in the home page
window.onload = () => {
    if (localStorage.getItem("Dark")) switchTheme();
}

// Switch Theme
let themeSwitcher = document.querySelector(".theme-switcher");
let themeIcon = document.querySelector(".theme-switcher i");
let themeSpan = document.querySelector(".theme-switcher span");
let header = document.querySelector("header");
let backBtn = document.querySelector(".container > button");

themeSwitcher.onclick = () => switchTheme();

let dark = false;
function switchTheme() {
    //toggle this class to change the Theme
    document.body.classList.toggle("body-dark-theme");
    header.classList.toggle("elements-dark-theme");
    backBtn.classList.toggle("elements-dark-theme");
    let spans = document.querySelectorAll(".borders span");
    spans.forEach((span) => {
        console.log(span);
        span.classList.toggle("elements-dark-theme");
    });

    //Change the Theme of the Mode Button and its text
    if (!dark) {
        themeIcon.className = "far fa-light fa-sun";
        themeSpan.innerHTML = "Light Mode";

        window.localStorage.setItem("Dark", true);

        dark = true;
    } else {
        themeIcon.className = "far fa-light fa-moon";
        themeSpan.innerHTML = "Dark Mode";

        window.localStorage.removeItem("Dark");

        dark = false;
    }
}

//Get the details of the country that its capital name is stored in Session Storage
let capitalOfTheCountry = window.sessionStorage.getItem("capital");
let req = new XMLHttpRequest();
req.open(
   "GET",
   `https://restcountries.com/v2/capital/${capitalOfTheCountry}`
);
req.send();
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        printTheDetails(JSON.parse(this.responseText));
    }
}

// Print the Details of this country to the Details Page
function printTheDetails(jsData){
    let flag = document.querySelector(".flag img");
    let countryName = document.querySelector(".country-name");
    let nativeName = document.querySelector(".native-name");
    let population = document.querySelector(".population");
    let region = document.querySelector(".region");
    let subRegion = document.querySelector(".sub-region");
    let capital = document.querySelector(".capital");
    let domain = document.querySelector(".domain");
    let currnc = document.querySelector(".currencies");
    let lang = document.querySelector(".lang");
    let bordersDiv = document.querySelector(".borders > div");

    //Add the flag of this country
    flag.src = jsData[0].flags.png;

    // Add the Name of this country
    countryName.innerHTML = jsData[0].name;

    // Add the Native Name of this country
    nativeName.innerHTML = jsData[0].nativeName;

    // Add the Population number of this country
    population.innerHTML = jsData[0].population.toLocaleString();

    // Add the Region of this country
    region.innerHTML = jsData[0].region;

    // Add the Sub-region of this country
    subRegion.innerHTML = jsData[0].subregion;

   // Add the Capital of this country
   capital.innerHTML = capitalOfTheCountry; //from session storage

   // Add the Top Level Domain of this country
    domain.innerHTML = jsData[0].topLevelDomain[0];

    // Add the Currencies of this country
    for (let i = 0; i < jsData[0].currencies.length; i++) {
        currnc.innerHTML = jsData[0].currencies[i].name;
    }

    // Add Languages in this country
    for (let i = 0; i < jsData[0].languages.length; i++) {
        if (i == jsData[0].languages.length - 1) {
            lang.innerHTML += jsData[0].languages[i].name;
        } else {
            lang.innerHTML += jsData[0].languages[i].name + ", ";
        }
    }

    // Add border countries with Alpha Code of them
    if (jsData[0].borders != undefined) {    
        for (let i = 0; i < jsData[0].borders.length; i++) {
        console.log(jsData[0].borders[i]);
        if (jsData[0].borders[i] != "ISR") {
           //Check if it is a real state... >> FREE PALESTINE ! <<
            let countriesNamesReq = new XMLHttpRequest();
            countriesNamesReq.open(
                "GET",
                `https://restcountries.com/v2/alpha/${jsData[0].borders[i]}`
            );
            countriesNamesReq.send();
            countriesNamesReq.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let countryData = JSON.parse(this.responseText);
                    let span = document.createElement("span");
                    span.appendChild(document.createTextNode(countryData.name));
                    bordersDiv.appendChild(span);
                }
            };
        }
        }
    } else 
        bordersDiv.append("This Is Island.")
};

//Back to home page
backBtn.onclick = () => {
    window.sessionStorage.clear();
    location.assign("https://osamaeid1.github.io/Rest-Countries-Api/");
}
