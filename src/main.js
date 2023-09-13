function loading() {
	document.querySelector(".loading_page").classList.add("loading_page--hidden");
	
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

function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function printProducts(arr) {
	const products = document.querySelector(".products");

	
	htmlAdd = "";
	for (const product of arr) {
		if (product.quantity) {
			iconAdd = `<i class='bx bx-plus' id="${product.id}"></i>`
		}else {
			iconAdd = `<img class="sold_out" src="./src/assets/soldout.png" alt="">`
		}
		htmlAdd += `<div class="product">
						<div class="container_product_img">
							<img class="product_img" src="${product.image}" alt="${product.category}">
						</div>
						<div class="product_info">
							${iconAdd}
							<h3>$${product.price}.00 <span>Stock: ${product.quantity}</span></h3>
							<p class="product_name" id="${product.id}">${product.name}</p>
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
	const homeNavBar = document.querySelector("#homeNavBar")
	const productsNavBar = document.querySelector("#productsNavBar")	
	homeNavBar.addEventListener("click", function () {
		closeMenu.style.display = "none"
		openMenu.style.display = "block"
		menu.classList.remove("navbar_menu--show")
	})

	productsNavBar.addEventListener("click", function () {
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
							<p>stock: ${productCart.quantity} | <span>$${productCart.price}.00</span></p>
							<h4 class="subtotal">Subtotal: $${productCart.price * productCart.amount}.00</h4>
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

	const totalAmount = document.querySelector(".totalAmount")
	totalAmount.textContent = `${items}`
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

function handleBuyCart(db) {
	const buy = document.querySelector(".button_buy");
	
	buy.addEventListener("click", () => {
		if(Object.values(db.cart).length === 0) return alert("Elige algun articulo que desees comprar, por favor!");

		const response = confirm("Seguro deseas comprar?");
		if(!response) return;

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

function printDescription(db) {
	const products = document.querySelector(".products")
	const description = document.querySelector(".description")
	const descriptionProduct = document.querySelector(".description_product")

	products.addEventListener("click", (e) => {
		if(e.target.classList.contains("product_name")){
			description.classList.add("description--show")

			const id = Number(e.target.id);
			let productFound = db.allProducts.find((product) => product.id === id);

			if (productFound.quantity) {
				iconAdd = `<i class='bx bxs-plus-circle add_from_description' id="${productFound.id}"></i>`
			}else {
				iconAdd = `<img class="sold_out_description" src="./src/assets/soldout.png" alt="">`
			}
			
			html = `<div class="description_close">
						<i class='bx bx-x'></i>
					</div>
					<img src="${productFound.image}" alt="">
					<h3>${productFound.name}</h3>
					<p>${productFound.description}</p>
					<div class="description_product_options">
						<div class="add_product">
							<span>$${productFound.price}.00</span>
							${iconAdd}
						</div>
						<span>Stock:${productFound.quantity}</span>
					</div>`
			descriptionProduct.innerHTML = html
		}
	})
	description.addEventListener("click", (e) => {
		if(e.target.classList.contains("bx-x")){
			description.classList.remove("description--show")
		}
	})
}

function handleAddFromDescription(db) {
	document.querySelector(".description_product").addEventListener("click" , (e) => {
		if(e.target.classList.contains("add_from_description")){
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

function darkLightMode() {

	const sun = document.querySelector(".bx-sun")
	const moon = document.querySelector(".bx-moon")

	if(JSON.parse(localStorage.getItem("theme")) === "dark"){
		moon.style.display = "none";
		sun.style.display = "block";
		document.body.classList.add("dark-mode");
	}
	if(JSON.parse(localStorage.getItem("theme")) === "light"){
		document.body.classList.remove("dark-mode");
	}

	moon.addEventListener("click", () => {
		moon.style.display = "none";
		sun.style.display = "block"
		document.body.classList.add("dark-mode");
		setLocalStorage("theme", "dark")
	})
	sun.addEventListener("click", () => {
		sun.style.display = "none";
		moon.style.display = "block"
		document.body.classList.remove("dark-mode");
		setLocalStorage("theme", "light")
	})
	
	
}

function handleNavbarAnimtion() {

	window.addEventListener("scroll", () => {
		if(window.scrollY > 60){
			document.querySelector(".header").classList.add("header--show");
		}else {
			document.querySelector(".header").classList.remove("header--show");
		}
	})
	
}

async function main() {
	const db = {
		allProducts:  JSON.parse(localStorage.getItem("products")) || await getProducts(),
		cart: JSON.parse(localStorage.getItem("cart")) || {},
	};
	
	darkLightMode();
	printProducts(db.allProducts);
	openCloseMenu();
	printDescription(db);
	handleAddFromDescription(db);
	handleFilter(db.allProducts);
	handleShowCart();
	handlerCartProdcuts(db);
	printCartProducts(db);
	handleOptionsCart(db);
	printTotal(db);
	handleBuyCart(db);
	handleNavbarAnimtion();
	

	loading();
}


window.addEventListener("load", main);

