let nameP;
let price;
let quantity;
let rating;
let description;
let comments;
let save;

const load = async () => {
	getElements();
};

const getElements = () => {
	nameP = document.getElementById("name");
	price = document.getElementById("price");
	quantity = document.getElementById("quantity");
	rating = document.getElementById("rating");
	description = document.getElementById("description");
	comments = document.getElementById("comments");
	save = document.getElementById("save").onclick = create;
};

const create = () => {
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
		.post(`/addProduct`, product)
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
