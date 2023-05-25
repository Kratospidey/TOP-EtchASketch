let gridSize = 16;
let gridcont = document.querySelector("#grid-container");
let colorMode = true;
let randomMode = false;
let shadingMode = false;
let eraseMode = false;
let prevGridDiv = null; // Track the previously entered grid div
let eraser = document.querySelector("#eraser");
const slider = document.getElementById("grid-slider");

let isMousePressed = false; // Track if the mouse button is pressed

// Mouse event handlers
function handleMouseDown() {
	isMousePressed = true;
}

function handleMouseUp() {
	isMousePressed = false;
}

function setColorMode() {
	colorMode = true;
	randomMode = false;
	shadingMode = false;
	eraseMode = false;
}

function setRandomMode() {
	colorMode = false;
	randomMode = true;
	shadingMode = false;
	eraseMode = false;
}

function setShadingMode() {
	colorMode = false;
	randomMode = false;
	shadingMode = true;
	eraseMode = false;
}

function setEraseMode() {
	colorMode = false;
	randomMode = false;
	shadingMode = false;
	eraseMode = true;
}

function handleGridDivMouseEnter(e) {
	if (isMousePressed && eraseMode) {
		e.target.style.backgroundColor = "";
	}
	if (isMousePressed) {
		if (colorMode) {
			const colorPicker = document.querySelector("#color-picker");
			const color = colorPicker.value;
			e.target.style.backgroundColor = color;
		} else if (randomMode) {
			if (e.target !== prevGridDiv) {
				const randomColor = getRandomColor();
				e.target.style.backgroundColor = randomColor;
			}
		} else if (shadingMode) {
			if (e.target !== prevGridDiv) {
				const currentColor = e.target.style.backgroundColor;
				const opacity = currentColor
					? parseFloat(currentColor.slice(-4, -1))
					: 0;
				const newOpacity = Math.min(opacity + 0.1, 1);
				e.target.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
			}
		}
		prevGridDiv = e.target;
	}
}
function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Clear button event listener
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearGrid);

function clearGrid() {
	const gridDivs = document.querySelectorAll(".griddiv");
	gridDivs.forEach((div) => {
		div.style.backgroundColor = "";
	});
}

const colorModeButton = document.querySelector("#color-mode");
colorModeButton.addEventListener("click", setColorMode);

const randomModeButton = document.querySelector("#random-mode");
randomModeButton.addEventListener("click", setRandomMode);

const shadingModeButton = document.querySelector("#shading-mode");
shadingModeButton.addEventListener("click", setShadingMode);

document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);

eraser.addEventListener("click", () => {
	setEraseMode();
});

function createGrid(number) {
	const gridContainer = document.querySelector("#grid-container");
	gridContainer.innerHTML = ""; // Clear the existing grid

	const maxGridSize = 500; // Maximum size of the grid container in pixels
	const gridSize = Math.min(maxGridSize, gridContainer.clientWidth);
	const cellSize = gridSize / number; // Calculate the size of each cell

	gridContainer.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${number}, 1fr)`;

	for (let i = 1; i <= number * number; i++) {
		let div = document.createElement("div");
		div.classList.add("griddiv");
		div.addEventListener("mousemove", handleGridDivMouseEnter);
		div.style.width = `${cellSize}px`; // Set the width of the cell
		div.style.height = `${cellSize}px`; // Set the height of the cell
		gridContainer.appendChild(div);
	}

	document.querySelector(
		"#grid-dimensions"
	).textContent = `${number}x${number}`;
}

// Add an event listener to the "input" event of the slider
slider.addEventListener("input", () => {
	// Get the current value of the slider
	const sliderValue = slider.value;
	createGrid(sliderValue);
});

createGrid(16);
