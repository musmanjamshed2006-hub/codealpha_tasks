let display = document.getElementById("display");
let historyList = document.getElementById("historyList");
let historyBox = document.getElementById("historyBox");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);

        let li = document.createElement("li");
        li.textContent = display.value + " = " + result;
        historyList.appendChild(li);

        display.value = result;
    } catch {
        display.value = "Error";
    }
}

function toggleHistory() {
    historyBox.style.display =
        historyBox.style.display === "none" ? "block" : "none";
}