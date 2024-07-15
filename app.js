// JavaScript code in app.js

let selectElement = document.getElementById("converter-values");

let temperature = ["Select", "Degree Celsius", "Fahrenheit", "Kelvin"];
let time = ["Select", "Nanosecond", "Microsecond", "Millisecond", "Second", "Minute", "Hour"];
let volume = ["Select", "Liter", "Milliliter"];
let length = ["Select", "Kilometre", "Metre", "Centimetre", "Millimetre", "Micrometre", "Nanometre", "Foot", "Inch"];

// To change the value of the heading
let heading = document.getElementsByClassName("heading")[0];
let selectedValue;
selectElement.addEventListener('change', function () {
    selectedValue = selectElement.value;
    if (selectedValue === "Select") {
        heading.innerHTML = `Converter`;
    } else {
        heading.innerHTML = `${selectedValue} Converter`;
    }
});

// Add dropdown based on user selection
let convertDiv1 = document.getElementById("convertDiv1");
let convertDiv2 = document.getElementById("convertDiv2");

selectElement.addEventListener('change', function () {
    let selectedValue = selectElement.value;
    console.log(heading.innerHTML);

    // Remove any existing dropdown menus
    let existingDropDowns = document.querySelectorAll(".conv-values1");
    existingDropDowns.forEach(dropdown => dropdown.remove());

    if (selectedValue === "Temperature") {
        createAndAppendDropdown(temperature, convertDiv1, 'dropdown1');
        createAndAppendDropdown(temperature, convertDiv2, 'dropdown2');
    } else if (selectedValue === "Time") {
        createAndAppendDropdown(time, convertDiv1, 'dropdown1');
        createAndAppendDropdown(time, convertDiv2, 'dropdown2');
    } else if (selectedValue === "Volume") {
        createAndAppendDropdown(volume, convertDiv1, 'dropdown1');
        createAndAppendDropdown(volume, convertDiv2, 'dropdown2');
    } else if (selectedValue === "Length") {
        createAndAppendDropdown(length, convertDiv1, 'dropdown1');
        createAndAppendDropdown(length, convertDiv2, 'dropdown2');
    }

    dropDownId();
});

function createAndAppendDropdown(optionsArray, parentDiv, dropdownId) {
    let dropDownMenu = document.createElement("select");
    optionsArray.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText;
        option.text = optionText;
        dropDownMenu.add(option);
    });
    parentDiv.appendChild(dropDownMenu);
    dropDownMenu.className = "conv-values1";
    dropDownMenu.id = dropdownId;
}

let selectedValue1, selectedValue2;
function dropDownId() {
    let dropDown1 = document.getElementById("dropdown1");
    let dropDown2 = document.getElementById("dropdown2");

    dropDown1.addEventListener('change', function () {
        selectedValue1 = dropDown1.value;
        for (let i = 1; i < dropDown2.options.length; i++) {
            let option2Value = dropDown2.options[i].value;
            if (selectedValue1 === option2Value) {
                dropDown2.options[i].disabled = true;
            } else {
                dropDown2.options[i].disabled = false;
            }
        }
    });

    dropDown2.addEventListener('change', function () {
        selectedValue2 = dropDown2.value;
        for (let i = 1; i < dropDown1.options.length; i++) {
            let option1Value = dropDown1.options[i].value;
            if (selectedValue2 === option1Value) {
                dropDown1.options[i].disabled = true;
            } else {
                dropDown1.options[i].disabled = false;
            }
        }
    });
}

let input1 = document.getElementById("input1");
input1.addEventListener("input", function () {
    if (!selectedValue || selectedValue === "Select" || !selectedValue1 || selectedValue1 === "Select" || !selectedValue2 || selectedValue2 === "Select") {
        alert("Please select conversion type and units before entering a value.");
        this.value = "";
    } else {
        let input1Value = this.value;
        document.getElementById("input2").value = converter(selectedValue, selectedValue1, selectedValue2, input1Value);
    }
});

function converter(type, unit1, unit2, inputValue) {
    let calc;
    if (type === "Temperature") {
        if (unit1 === "Degree Celsius" && unit2 === "Fahrenheit") {
            calc = (inputValue * 9 / 5) + 32;
            return calc + " °F";
        } else if (unit1 === "Degree Celsius" && unit2 === "Kelvin") {
            calc = (inputValue * 1) + 273.15;
            return calc + " K";
        } else if (unit1 === "Fahrenheit" && unit2 === "Degree Celsius") {
            calc = (inputValue - 32) * 5 / 9;
            return calc + " °C";
        } else if (unit1 === "Fahrenheit" && unit2 === "Kelvin") {
            calc = ((inputValue - 32) * 5 / 9) + 273.15;
            return calc + " K";
        } else if (unit1 === "Kelvin" && unit2 === "Degree Celsius") {
            calc = inputValue - 273.15;
            return calc + " °C";
        } else if (unit1 === "Kelvin" && unit2 === "Fahrenheit") {
            calc = ((inputValue - 273.15) * 9 / 5) + 32;
            return calc + " °F";
        }
    } else if (type === "Time") {
        const timeUnits = {
            "Nanosecond": 1,
            "Microsecond": 1000,
            "Millisecond": 1000000,
            "Second": 1000000000,
            "Minute": 60000000000,
            "Hour": 3600000000000
        };
        return calc = (inputValue * timeUnits[unit1]) / timeUnits[unit2];
    } else if (type === "Volume") {
        const volumeUnits = {
            "Milliliter": 1,
            "Liter": 1000
        };

        calc = (inputValue * volumeUnits[unit1]) / volumeUnits[unit2];

    } else if (type === "Length") {
        const lengthUnits = {
            "Kilometre": 1000000,
            "Metre": 1000,
            "Centimetre": 10,
            "Millimetre": 1,
            "Micrometre": 0.001,
            "Nanometre": 0.000001,
            "Foot": 304.8,
            "Inch": 25.4
        };

        calc = (inputValue * lengthUnits[unit1]) / lengthUnits[unit2];

    }
    return calc;
}
