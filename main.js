// function load() {
// 	const loading = document.querySelector(".loading_page");
// 	loading.classList.add("loading_page--hidden");
// }

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

function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function printProducts(arr) {
	const products = document.querySelector(".products");

	htmlAdd = "";
	for (const product of arr) {
			htmlAdd += `<div class="product">
							<img class="product_img" src="${product.image}" alt="${product.category}">
							<div class="product_info">
								<i class='bx bx-plus' id="${product.id}"></i>
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

function openCloseMenu() {
	const openMenu = document.querySelector(".bxs-dashboard");
	const closeMenu = document.querySelector(".bxs-x-circle");
	const menu = document.querySelector(".navbar_menu")

	openMenu.addEventListener("click", function () {
		openMenu.style.display = "none"
		closeMenu.style.display = "block"
		menu.classList.add("navbar_menu--show")
	})

	closeMenu.addEventListener("click", function () {
		closeMenu.style.display = "none"
		openMenu.style.display = "block"
		menu.classList.remove("navbar_menu--show")
	})
}
function handleShowCart() {
	const bagShopping = document.querySelector(".bx-shopping-bag");
	const closeBag = document.querySelector(".bx-x");
	const cart = document.querySelector(".cart")

	bagShopping.addEventListener("click", () => {
		cart.classList.add("cart--show")
	})

	closeBag.addEventListener("click", () => {
		cart.classList.remove("cart--show")
	})
}

function printCartProducts(db) {
	let html = "";
		const cart_shopping = document.querySelector(".cart_shopping")
		for (const productCart of Object.values(db.cart)) {
			html += `<div class="cart_product">
						<img class="cart_product_img" src="${productCart.image}" alt="">
						<div class="cart_product_info">
							<h4>${productCart.name}</h4>
							<p>stock: ${productCart.quantity} | $${productCart.price}.00</p>
							<h4>subtotal: ${productCart.price * productCart.amount}</h4>
							<div class="cart_shopping_options" id="${productCart.id}">
								<i class='bx bxs-plus-circle'></i>
								<span>${productCart.amount} units</span>
								<i class='bx bxs-checkbox-minus'></i>
								<i class='bx bxs-trash'></i>
							</div>

						</div>
					</div>`
		}

		cart_shopping.innerHTML = html
}

function printTotal(db) {
	const totalItems = document.querySelector("#totalItems")
		const totalCash = document.querySelector("#totalCash")

		let items = 0;
		let cash = 0;

		for (const product of Object.values(db.cart)) {
			items += product.amount;
			cash += product.amount * product.price
		}

		totalItems.textContent = `${items} items`
		totalCash.textContent = `$${cash}.00`
}

function handlerCartProdcuts(db) {
	document.querySelector(".products").addEventListener("click", (e) => {
		if(e.target.classList.contains("bx-plus")){ 
			const id = Number(e.target.id);

			let productFound = db.allProducts.find((product) => product.id === id);
			
			if(db.cart[id]){
				if(db.cart[id].amount === db.cart[id].quantity)
				return alert(`No hay mas en stock`)
				db.cart[id].amount += 1
			}else {
				db.cart[id] = {...productFound,
								amount :1
							}
			}
		}

		setLocalStorage("cart", db.cart)
		printCartProducts(db);
		printTotal(db)		
	})
}

function handleOptionsCart(db) {
	const cartShopping = document.querySelector(".cart_shopping")
	
	cartShopping.addEventListener("click", (e) => {
		if(e.target.classList.contains("bxs-plus-circle")) {
			const id = Number(e.target.parentElement.id);
			if(db.cart[id].amount === db.cart[id].quantity){
				return alert(`No hay mas en stock`)
			}else {
				db.cart[id].amount += 1
			}
		}

		if(e.target.classList.contains("bxs-checkbox-minus")) {
			const id = Number(e.target.parentElement.id)
			if (db.cart[id].amount === 1) {
				const response = confirm("seguro quieres eliminar este producto?")
				if (!response) return
				delete db.cart[id]
			} else {
				db.cart[id].amount -= 1
			}

		}
		if(e.target.classList.contains("bxs-trash")) {
			const id = Number(e.target.parentElement.id)
			const response = confirm("seguro quieres eliminar este producto?")
			if (!response) return
			delete db.cart[id]
		}
		setLocalStorage("cart", db.cart)
		printCartProducts(db)
		printTotal(db)
	})
}

function buyCart(db) {
	const buy = document.querySelector(".button_buy");
	
	buy.addEventListener("click", () => {
		let remainingProducts = [];
		
		for (const product of db.allProducts) {
			if(db.cart[product.id]){
				remainingProducts.push({
					...product,
					quantity: product.quantity - db.cart[product.id].amount
				});
			}else{
				remainingProducts.push(product);
			}
		}
		console.log(remainingProducts);

		db.allProducts = remainingProducts;
		db.cart = {}

		setLocalStorage("products", db.allProducts);
		setLocalStorage("cart", db.cart)

		printCartProducts(db)
		printProducts(db.allProducts);
		printTotal(db)		
	})
}

async function main() {
	const db = {
		allProducts:  JSON.parse(localStorage.getItem("products")) || await getProducts(),
		cart: JSON.parse(localStorage.getItem("cart")) || {},
	};
	console.log(db.allProducts);
	printProducts(db.allProducts);
	handleFilter(db.allProducts);
	openCloseMenu()
	handleShowCart()
	handlerCartProdcuts(db);
	printCartProducts(db)
	handleOptionsCart(db)
	printTotal(db)
	buyCart(db)
	
	//load()
}


window.addEventListener("load", main);

