// Constants
const board = document.getElementById("grid_board");
const boardSquares = 600;
let gridNumber = 16;

const gridBackgroundColor = "#FFFFFF"
let currPaintColor = "#000";

// Board Creation
createGridBoard(gridNumber);

// Initialize or change pixel paint color
setPaintColor(currPaintColor);

// Add button functionality
activateButtons();

function activateButtons() {
	document.getElementById("clear_grid").addEventListener("click", clearGrid);
	document.getElementById("resize_grid").addEventListener("click", resizeGrid);
	document.getElementById("black_button").addEventListener("click", function() { setPaintColor("#000"); });
	document.getElementById("red_button").addEventListener("click", function() { setPaintColor("#F00"); });
	document.getElementById("eraser_button").addEventListener("click", eraserMode);
}

function createGridBoard(gNum = 16) {
	// Generate total number of cells
	for (let i = 0; i < gNum ** 2; ++i) {
		let cell = createGridCell();
		board.appendChild(cell);
	}

	// Style/format the cells to fit on grid board
	formatGridCell(gNum);

	// Functions
	function createGridCell() {
		let gridCell = document.createElement('div');
		gridCell.className ='gridCell';
		return gridCell;
	}

	function formatGridCell(gNum) {
		let calc_hxw = parseFloat((boardSquares / gNum).toFixed(5));
		let hxw = calc_hxw + "px ";
		let gridTemplateValue = "";
		for (let i = 0; i < gNum; ++i) {
			gridTemplateValue += hxw;
		}
		board.style.display = "grid";
		board.style.gridTemplateColumns = gridTemplateValue;
		board.style.gridTemplateRows = gridTemplateValue;
	}
}

function setPaintColor(paintColor = "#000") {
	currPaintColor = paintColor;
	let cells = document.getElementsByClassName("gridCell")

	for (let i = 0; i < cells.length; ++i)
	{
		cells.item(i).addEventListener("mouseenter", function() {
			cells.item(i).style.backgroundColor = currPaintColor;
		});
	}
}

function eraserMode() {
	setPaintColor(board.style.backgroundColor);
}

function clearGrid() {
	let cells = document.getElementsByClassName("gridCell")

	for (let i = 0; i < cells.length; ++i)
	{
		cells.item(i).style.backgroundColor = gridBackgroundColor;
	}
}

function resizeGrid() {
	clearGrid();
	gridNumber = prompt("Please enter the new pixel number"); 
	createGridBoard(gridNumber);
	setPaintColor(currPaintColor);
}