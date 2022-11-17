let solutions = [[], [], [], [], [], [], []];

(async () => {
	let data = await fetch(window.location.href + "data.json");
	if ((data.status = 404)) data = await fetch("/data.json");
	data = await data.json();

	let siTable = document.getElementById("si");

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
				solutions[i - 1].push([size, input]);
			}
			row.appendChild(sizeElem);

			let nameElem = document.createElement("th");
			if (values[1] == true) {
				nameElem.innerHTML = name;
			} else {
				let input = document.createElement("input");
				nameElem.appendChild(input);
				solutions[i - 1].push([name, input]);
			}
			row.appendChild(nameElem);

			let unitElem = document.createElement("th");
			if (values[2] == true) {
				unitElem.innerHTML = unit;
			} else {
				let input = document.createElement("input");
				unitElem.appendChild(input);
				solutions[i - 1].push([unit, input]);
			}
			row.appendChild(unitElem);

			let formulaSignElem = document.createElement("th");
			if (values[3] == true) {
				formulaSignElem.innerHTML = formulaSign;
			} else {
				let input = document.createElement("input");
				formulaSignElem.appendChild(input);
				solutions[i - 1].push([formulaSign, input]);
			}
			row.appendChild(formulaSignElem);

			siTable.appendChild(row);
		});
	}
})();

document.getElementById("control-si").addEventListener("click", () => {
	for (let i = 0; i < solutions.length; i++) {
		for (let j = 0; j < solutions[i].length; j++) {
			let x = solutions[i][j][0].toLowerCase();
			x = x.replace(/\s/g, "");
			let y = solutions[i][j][1].value.toLowerCase();
			y = y.replace(/\s/g, "");
			if (x != y) {
				solutions[i][j][1].style.color = "red";
				solutions[i][j][1].value = solutions[i][j][0];
			} else {
				solutions[i][j][1].style.color = "green";
			}
			solutions[i][j][1].readOnly = true;
		}
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
