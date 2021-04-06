async function load() {
	const response = await axios.get("/getProducts");
	const data = response.data;

	let body = document.getElementById("t-body");
	body.innerHTML = "";

	data.forEach((element) => {
		makeRow(element, body);
	});
}

const makeRow = (element, body) => {
	let tr = document.createElement("tr");
	tr.classList.add("text-center");

	makeCell(tr, element, "name");
	makeCell(tr, element, "price");
	makeCell(tr, element, "quantity");
	makeCell(tr, element, "description");
	makeCell(tr, element, "comments");
	makeCell(tr, element, "rating");
	makeForm(tr, element);

	body.append(tr);
};

const makeCell = (tr, element, property) => {
	let td = document.createElement("td");
	if (element.hasOwnProperty(property)) {
		td.innerText = element[property];
	}
	tr.append(td);
};

const makeForm = (tr, element) => {
	let tdForm = document.createElement("td");
	tdForm.innerHTML = `<div class="d-flex justify-content-center">
							<form action="edit.html" method="GET">
						    	<input type="hidden" name="id" value=${element.id} />
								<input type="submit" class="btn font-weight-bold text-white" value="Edit" />
							</form>
							<button onclick="deleteProduct(${element.id})" class="btn font-weight-bold text-white">Delete</button>
						</div>`;
	tr.append(tdForm);
};

function deleteProduct(index) {
	axios.delete(`/deleteProduct/${index}`).then(() => {
		toastr.success("Product deleted");
		load();
	});
}

const search = async () => {
	let order = document.getElementById("select").value;
	let name = document.getElementById("name").value;

	console.log(order, name);

	let url = "/getProducts";
	if (order || name) {
		url += "/?";
		order ? (url += `order=${order}`) : 0;
		order && name ? (url += "&") : 0;
		name ? (url += `name=${name}`) : 0;
	}

	console.log(url);

	const response = await axios.get(url);
	const data = response.data;

	let body = document.getElementById("t-body");
	body.innerHTML = "";

	data.forEach((element) => {
		makeRow(element, body);
	});
};

document.addEventListener("DOMContentLoaded", load);
