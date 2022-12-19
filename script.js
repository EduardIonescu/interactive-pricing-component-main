const rangeInput = document.querySelector('input[type="range"]');

const pageviews = document.querySelector("#pageviews-number");
const priceAmount = document.querySelectorAll(".price-amount");
const switchButton = document.querySelector("#switch");

let val;

function handleInputChange(e) {
	let target = e.target;
	if (e.target.type !== "range") {
		target = document.getElementById("range");
	}
	const min = target.min;
	const max = target.max;
	val = target.value;

	target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
	updatePageviews(val);
	updatePrice(val);
}

const getPageviews = {
	1: "10K",
	2: "50K",
	3: "100K",
	4: "500K",
	5: "1M",
};

const getPrice = {
	1: 8,
	2: 12,
	3: 16,
	4: 24,
	5: 36,
};

rangeInput.addEventListener("input", handleInputChange);

function updatePageviews(value = 3) {
	pageviews.textContent = getPageviews[value];
}

// Switches to yearly billing and back on checkbox input
let yearlyBilling = false;
switchButton.addEventListener("input", () => {
	yearlyBilling = !yearlyBilling;
	updatePrice(val);
});

function updatePrice(value = 3) {
	const initialPrice = getPrice[value];

	if (!yearlyBilling) {
		// I could change the element based on screen width but it's not big inconvenience
		priceAmount[0].textContent = `$${initialPrice.toFixed(2)}`;
		priceAmount[1].textContent = `$${initialPrice.toFixed(2)}`;
	} else {
		const discountedPrice = (75 * initialPrice) / 100;
		priceAmount[0].textContent = `$${discountedPrice.toFixed(2)}`;
		priceAmount[1].textContent = `$${discountedPrice.toFixed(2)}`;
	}
}
