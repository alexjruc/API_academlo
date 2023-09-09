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
	const products = document.querySelector(".products");

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

function printFilterProducts(allProducts, category) {
	let arr = [];
		for (const product of allProducts) {
			if(product.category === category){
				arr.push(product);
				printProducts(arr)
				}
			}
}

function handleFilter(allProducts){
		
	const filter_products = document.querySelector(".filter_products")
	filter_products.addEventListener("click", function(e){
		if(e.target.closest(".filter_all")) {
			printProducts(allProducts);
		}
		if(e.target.closest(".filter_shirt")) {
			printFilterProducts(allProducts, "shirt")
		}
		if(e.target.closest(".filter_hoddie")) {
			printFilterProducts(allProducts, "hoddie")
		}
		if(e.target.closest(".filter_sweater")) {
			printFilterProducts(allProducts, "sweater")
		}
		
	})
}


async function main() {
	const allProducts = await getProducts();
	console.log(allProducts);
	printProducts(allProducts);
	handleFilter(allProducts);
}


window.addEventListener("load", main);

