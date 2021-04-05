const load = async (abc, def) => {
	console.log(abc, def);
	const response = await axios.get("/getProducts");
	const data = response.data;

	let body = document.getElementById("t-body");
	body.innerHTML = "";

	let i = 0;

	data.forEach((element) => {
		makeRow(element, body, i++);
	});
};

const makeRow = (element, body, index) => {
	let tr = document.createElement("tr");
	tr.classList.add("text-center");

	let tdName = document.createElement("td");
	tdName.innerText = element.name;
	tr.append(tdName);

	let tdPrice = document.createElement("td");
	tdPrice.innerText = element.price;
	tr.append(tdPrice);

	let tdQuantity = document.createElement("td");
	tdQuantity.innerText = element.quantity;
	tr.append(tdQuantity);

	let tdDescription = document.createElement("td");
	if (element.hasOwnProperty("description")) {
		tdDescription.innerText = element.description;
	}
	tr.append(tdDescription);

	let tdComments = document.createElement("td");
	if (element.hasOwnProperty("comments")) {
		tdComments.innerText = element.comments;
	}
	tr.append(tdComments);

	let tdRating = document.createElement("td");
	if (element.hasOwnProperty("rating")) {
		tdRating.innerText = element.rating;
	}
	tr.append(tdRating);

	makeForm(tr, index);

	body.append(tr);
};

const makeForm = (tr, index) => {
	let tdForm = document.createElement("td");
	tdForm.innerHTML = `<div class="d-flex justify-content-center">
						<form action="edit.html" method="GET">
						    <input type="hidden" name="id" value="${index}" />
							<input type="submit" class="btn font-weight-bold" value="Edit" />
						</form>
						<button href="#" class="btn font-weight-bold">Delete</button>
					</div>`;
	tr.append(tdForm);
};

document.addEventListener("DOMContentLoaded", load);
