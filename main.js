async function getProducts() {
	try {
		const url_base = "https://ecommercebackend.fundamentos-29.repl.co/";
		
		const getData = await fetch(url_base);
		const response = await getData.json();
		return response
	} catch (error) {
		console.log("hay un error");
	}
	
}

function printProducts(arr) {
	const products = document.querySelector(".products")

	htmlAdd = "";
	for (const product of arr) {
		htmlAdd += `<div class="product">
						<img class="product_img" src="${product.image}" alt="${product.category}">
						<div class="product_info">
							<h3>$${product.price}.00 <span>Stock: ${product.quantity}</span></h3>
							<p>${product.name}</p>
						</div>
					</div>`
	}
	products.innerHTML = htmlAdd
}

async function main() {
	const merchandise = await getProducts();
	console.log(merchandise);
	printProducts(merchandise);
}


window.addEventListener("load", main);

