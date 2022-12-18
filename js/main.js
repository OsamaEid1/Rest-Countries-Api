//Set Dark Theme if it in the home page
window.onload = () => {
    if (localStorage.getItem("Dark")) switchTheme();
}

// Switch Theme
let themeSwitcher = document.querySelector(".theme-switcher");
let themeIcon = document.querySelector(".theme-switcher i");
let themeSpan = document.querySelector(".theme-switcher span");
let header = document.querySelector("header");
let inputGroup = document.querySelector(".search .input-group");
let input = document.querySelector(".search .input-group input");
let select = document.querySelector(".search select");
let selectOptions = document.querySelectorAll(".search option");

themeSwitcher.onclick = () => switchTheme();

let dark = false;
function switchTheme() {
    document.body.classList.toggle("body-dark-theme");
    header.classList.toggle("elements-dark-theme");
    inputGroup.classList.toggle("elements-dark-theme");
    input.classList.toggle("elements-dark-theme");
    select.classList.toggle("elements-dark-theme");

   //Change Mode Button and focus state of the Input and Store the state of the Theme
    if (!dark) {
        themeIcon.className = "far fa-light fa-sun";
        themeSpan.innerHTML = "Light Mode";

        window.localStorage.setItem("Dark", true);
        dark = true;
        input.onfocus = () => {
            input.style.color = "hsl(0, 0%, 100%)";
        };
    } else {
        themeIcon.className = "far fa-light fa-moon";
        themeSpan.innerHTML = "Dark Mode";

        window.localStorage.removeItem("Dark");

        dark = false;
    }

    //Change Options in Select
    selectOptions.forEach((opt) => {
        opt.classList.toggle("elements-dark-theme");
    });

    // Change Country Box
    let countries = document.querySelectorAll(".country");
    countries.forEach((c) => {
        c.classList.toggle("elements-dark-theme");
    });

    //Change Input Text color
    input.onfocus = () => {
        input.style.color = "#212529";
    };
}

// Get Countries
let req = new XMLHttpRequest();
req.open("GET", "https://restcountries.com/v3.1/all");
req.send();

let jsData;
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    jsData = JSON.parse(this.responseText);

    let countries = document.querySelector(".countries");
    jsData.forEach((c) => {
        if (c.name.common != "Israel") {
        //Avoid bringing fake entities... >> FREE PALESTINE ! <<

        // Create country box
        let country = document.createElement("div");
        country.classList.add("country", "card", "px-0", "pb-3");

        //Create the body of country box
        let countryBody = document.createElement("div");
        countryBody.classList.add("card-body");

        //Set country's Flag
        let img = document.createElement("img");
        img.src = c.flags.png;
        img.style.height = "220px"; //Set a constant height because many flags have a variable size.

        //Set the country's Name
        let h4 = document.createElement("h4");
        h4.classList.add("card-title", "fw-bold");
        h4.appendChild(document.createTextNode(c.name.common));

        //Set the Population of country
        let population = document.createElement("p");
        population.classList.add("card-text", "m-0");
        population.style.fontWeight = "600";
        population.appendChild(document.createTextNode("Population: "));
        //Add the number of the country's Population
        let populationSpan = document.createElement("span");
        populationSpan.classList.add("fw-normal");
        populationSpan.appendChild(
            document.createTextNode(c.population.toLocaleString())
        );
        population.appendChild(populationSpan);

        //Set the Region of country
        let region = document.createElement("p");
        region.classList.add("card-text", "m-0");
        region.style.fontWeight = "600";
        region.appendChild(document.createTextNode("Region: "));
        //Add the name of the country's Region
        let regionSpan = document.createElement("span");
        regionSpan.classList.add("region", "fw-normal");
        regionSpan.appendChild(document.createTextNode(c.region));
        region.appendChild(regionSpan);

        //Set the Capital of country
        let capital = document.createElement("p");
        capital.classList.add("card-text", "m-0");
        capital.style.fontWeight = "600";
        capital.appendChild(document.createTextNode("Capital: "));
        //Add the name of the country's capital
        let capitalSpan = document.createElement("span");
        capitalSpan.classList.add("fw-normal");
        capitalSpan.appendChild(document.createTextNode(c.capital));
        capital.appendChild(capitalSpan);

        //Append Elements
        countryBody.appendChild(h4);
        countryBody.appendChild(population);
        countryBody.appendChild(region);
        countryBody.appendChild(capital);

        country.appendChild(img);
        country.appendChild(countryBody);

        countries.appendChild(country);
        }
    });

    //Filter countries with Select box
    select.onchange = () => {
        let regionsOfTheCountries = document.querySelectorAll(".region");
        regionsOfTheCountries.forEach((r) => {
        if (r.innerHTML != select.value && select.value != "none") {
            r.parentElement.parentElement.parentElement.style.display =
                "none";
        } else {
            r.parentElement.parentElement.parentElement.style.display =
                "flex";
        }
        });
    };

    //Filter countries with Search input
    input.oninput = () => {
        //Change text-input color if the mode is dark
        document.body.className == "body-dark-theme"
        ? (input.style.color = "hsl(0, 0%, 100%)")
        : (input.style.color = "#212529");

        let strValueInput = JSON.stringify(input.value);
        strValueInput = strValueInput
        .substring(1, strValueInput.length - 1) //Remove double quotes
        .toLowerCase();

        let namesOfTheCountries = document.querySelectorAll(".country .card-title");
        namesOfTheCountries.forEach((n) => {
            if (!n.innerHTML.toLowerCase().includes(strValueInput)) 
                n.parentElement.parentElement.style.display = "none";
            else
                n.parentElement.parentElement.style.display = "flex";
        });
    };
    }

   //Go to Details Page of Country
    let countries = document.querySelectorAll(".country");
    countries.forEach((c) => {
        c.onclick = () => {
            let capitalName = c.children[1].children[3].children[0];
            capitalName = capitalName.innerHTML.split(","); //Because some countries codes hav mor than one capital
            window.sessionStorage.setItem("capital", capitalName[0]);
            location.assign("../details-page.html");
        };
    });
};

//ScrollTop button
let scrollTopBtn = document.querySelector(".scroll-top-btn");
window.onscroll = () => {
    window.scrollY >= 200
        ? scrollTopBtn.classList.add("show")
        : scrollTopBtn.classList.remove("show");
};
scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};
