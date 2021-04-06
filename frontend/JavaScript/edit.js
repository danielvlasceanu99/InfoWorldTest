let nameP;
let price;
let quantity;
let rating;
let description;
let comments;
let save;
let id;

const load = async () => {
	const urlParams = new URLSearchParams(window.location.search);
	id = urlParams.get("id");

	const response = await axios.get(`/getproduct/${id}`);
	const data = response.data;

	getElements();
	write(data);
};

const write = (element) => {
	nameP.value = element.name;
	price.value = element.price;
	quantity.value = element.quantity;
	rating.value = element.rating;
	description.value = element.description;
	comments.value = element.comments;

	document.getElementById("title").innerText += ` ${element.name}`;
};

const getElements = () => {
	nameP = document.getElementById("name");
	price = document.getElementById("price");
	quantity = document.getElementById("quantity");
	rating = document.getElementById("rating");
	description = document.getElementById("description");
	comments = document.getElementById("comments");
	save = document.getElementById("save").onclick = edit;
};

const edit = () => {
	toastr.remove();
	const product = {
		name: nameP.value,
		price: price.value,
		quantity: quantity.value,
		description: description.value,
		comments: comments.value,
		rating: rating.value,
	};

	axios
		.put(`/updateProduct/${id}`, product)
		.then((response) => {
			toastr.success(response.data.message);
		})
		.catch((error) => {
			if (error.response) {
				const errors = error.response.data;

				Object.keys(errors).forEach((key) => {
					toastr.error(errors[key]);
				});
			}
		});
};

document.addEventListener("DOMContentLoaded", load);
