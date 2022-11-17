let siTable = document.getElementById("si");
let expoTable = document.getElementById("expo");

let siSolutions = [[], [], [], [], [], [], []];

let data;

(async () => {
	if (window.location.href.includes("sturmente.github.io")) {
		data = await fetch(window.location.href + "data.json");
	} else {
		data = await fetch("data.json");
	}
	data = await data.json();

	document.getElementById("new-si").addEventListener("click", newSiTable);

	newSiTable();
	function newSiTable() {
		siTable.innerHTML = "";
		data["si-units"].forEach((siUnit, i) => {
			const size = siUnit[0];
			const name = siUnit[1];
			const unit = siUnit[2];
			const formulaSign = siUnit[3];

			let values = generateValues();

			if (i == 0) values = [true, true, true, true];

			let row = document.createElement("tr");

			let sizeElem = document.createElement("th");
			if (values[0] == true) {
				sizeElem.innerHTML = size;
			} else {
				let input = document.createElement("input");
				sizeElem.appendChild(input);
				siSolutions[i - 1].push([size, input]);
			}
			row.appendChild(sizeElem);

			let nameElem = document.createElement("th");
			if (values[1] == true) {
				nameElem.innerHTML = name;
			} else {
				let input = document.createElement("input");
				nameElem.appendChild(input);
				siSolutions[i - 1].push([name, input]);
			}
			row.appendChild(nameElem);

			let unitElem = document.createElement("th");
			if (values[2] == true) {
				unitElem.innerHTML = unit;
			} else {
				let input = document.createElement("input");
				unitElem.appendChild(input);
				siSolutions[i - 1].push([unit, input]);
			}
			row.appendChild(unitElem);

			let formulaSignElem = document.createElement("th");
			if (values[3] == true) {
				formulaSignElem.innerHTML = formulaSign;
			} else {
				let input = document.createElement("input");
				formulaSignElem.appendChild(input);
				siSolutions[i - 1].push([formulaSign, input]);
			}
			row.appendChild(formulaSignElem);

			siTable.appendChild(row);
		});
	}

	// It starts at 27 because of the first table row which doesnt contain an exponent
	let expo = 27;
	let n = 3;

	data.exponents.forEach((exponent) => {
		let row = document.createElement("tr");

		let expoElem = document.createElement("th");
		let symbol = document.createElement("th");
		let name = document.createElement("th");

		if (expo == 27) {
			expoElem.innerHTML = exponent[0];
			symbol.innerHTML = exponent[1];
			name.innerHTML = exponent[2];
		} else {
			expoElem.innerHTML = `10<sup>${expo}</sup>`;

			let symbolInput = document.createElement("input");
			symbolInput.classList.add("symbol");
			symbol.appendChild(symbolInput);

			let nameInput = document.createElement("input");
			nameInput.classList.add("name");
			name.appendChild(nameInput);
		}

		row.appendChild(expoElem);
		row.appendChild(symbol);
		row.appendChild(name);

		expoTable.appendChild(row);

		expo -= n;
		if (expo == 3) n = 1;
		else if (expo == -3) n = 3;
		else if (expo == 0) expo -= n;
	});
})();

document.getElementById("control-si").addEventListener("click", () => {
	for (let i = 0; i < siSolutions.length; i++) {
		for (let j = 0; j < siSolutions[i].length; j++) {
			let x = siSolutions[i][j][0].toLowerCase();
			x = x.replace(/\s/g, "");
			let y = siSolutions[i][j][1].value.toLowerCase();
			y = y.replace(/\s/g, "");
			if (x != y) {
				siSolutions[i][j][1].style.color = "red";
				siSolutions[i][j][1].value = siSolutions[i][j][0];
			} else {
				siSolutions[i][j][1].style.color = "green";
			}
			siSolutions[i][j][1].readOnly = true;
		}
	}
});

document.getElementById("control-expo").addEventListener("click", () => {
	let symbols = document.getElementsByClassName("symbol");
	let names = document.getElementsByClassName("name");

	for (let i = 0; i < symbols.length; i++) {
		let symbol = symbols[i];
		let name = names[i];

		if (symbol.value != data.exponents[i + 1][0]) {
			symbol.style.color = "red";
			symbol.value = data.exponents[i + 1][0];
		} else {
			symbol.style.color = "green";
		}

		if (name.value.toLowerCase() != data.exponents[i + 1][1].toLowerCase()) {
			name.style.color = "red";
			name.value = data.exponents[i + 1][1];
		} else {
			name.style.color = "green";
		}

		symbol.readOnly = true;
		name.readOnly = true;
	}
});

document.getElementById("clear-expo").addEventListener("click", () => {
	let classes = document.getElementsByClassName("symbol");

	for (let i = 0; i < classes.length; i++) {
		classes[i].value = "";
		classes[i].readOnly = false;
		classes[i].style.color = "black";
	}

	classes = document.getElementsByClassName("name");

	for (let i = 0; i < classes.length; i++) {
		classes[i].value = "";
		classes[i].readOnly = false;
		classes[i].style.color = "black";
	}
});

function generateValues() {
	let values = [true, true, true, true];
	const amount = random(1, 3);
	for (let i = 0; i < amount; i++) {
		let n;
		do {
			n = random(0, 3);
		} while (values[n] == false);
		values[n] = false;
	}
	return values;
}

function random(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
