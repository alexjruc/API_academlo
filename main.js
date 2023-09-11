function load() {
	const loading = document.querySelector(".loading_page");
	loading.classList.add("loading_page--hidden");
}

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
			document.querySelector(".filter_all").classList.add("filter--show")
			document.querySelector(".filter_shirt").classList.remove("filter--show")
			document.querySelector(".filter_hoddie").classList.remove("filter--show")
			document.querySelector(".filter_sweater").classList.remove("filter--show")
			printProducts(allProducts);
		}
		if(e.target.closest(".filter_shirt")) {
			document.querySelector(".filter_shirt").classList.add("filter--show")
			document.querySelector(".filter_all").classList.remove("filter--show")
			document.querySelector(".filter_hoddie").classList.remove("filter--show")
			document.querySelector(".filter_sweater").classList.remove("filter--show")
			printFilterProducts(allProducts, "shirt")
		}
		if(e.target.closest(".filter_hoddie")) {
			document.querySelector(".filter_hoddie").classList.add("filter--show")
			document.querySelector(".filter_all").classList.remove("filter--show")
			document.querySelector(".filter_shirt").classList.remove("filter--show")
			document.querySelector(".filter_sweater").classList.remove("filter--show")
			printFilterProducts(allProducts, "hoddie")
		}
		if(e.target.closest(".filter_sweater")) {
			document.querySelector(".filter_sweater").classList.add("filter--show")
			document.querySelector(".filter_all").classList.remove("filter--show")
			document.querySelector(".filter_shirt").classList.remove("filter--show")
			document.querySelector(".filter_hoddie").classList.remove("filter--show")
			printFilterProducts(allProducts, "sweater")
		}
		
	})
}


async function main() {
	
	const allProducts = await getProducts();
	console.log(allProducts);
	printProducts(allProducts);
	handleFilter(allProducts);
	load()
}


window.addEventListener("load", main);

