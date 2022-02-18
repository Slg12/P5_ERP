import StoreHouse from "./storehouse.js";
import {
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException,
} from "./storehouse.js";
import {
	CategoryExistException,
	CategoryNotExistException,
	CategoryRemoveDefault,
	ProductExistException,
	ProductNotExistException,
	StoreExistException,
	StoreNotExistException,
	NegativeStock
} from "./storehouse.js";

import { Product, Book, Music, Monitor } from "./storehouse.js";
import { Coords } from "./storehouse.js";
import { Store } from "./storehouse.js";
import { Category } from "./storehouse.js";

class StorehouseView {
	#instance = {
		Book: this.#BookCharacteristics,
		Music: this.#MusicCharacteristics,
		Monitor: this.#MonitorCharacteristics,
	}
	#BookCharacteristics(product) {
		return $('<div>Características de libro.</div>');
	}
	#MusicCharacteristics(product) {
		return $('<div>Características de disco de música.</div>');
	}
	#MonitorCharacteristics(product) {
		return $('<div>Características de monitor.</div>');
	}

	constructor() {
		this.main = $("main");
		this.stores = $("#stores");
		this.products = $("#products");
		this.categories = $("#categories");
		this.menu = $(".navbar-nav");
	}

	bindInit(handler) {
		$('.storehouse-name').click((event) => {
			handler();
		});
		// $('#logo').click((event) => {
		// 	handler();
		// });
	}

	rename(name) {
		$(".storehouse-name").text(name);
	}

	showStores(myStores) {
		this.stores.empty();
		for (let store of myStores) {
			store = store.store;
			this.stores.append(
				`<div class="main__store card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">${store.name}</h5>
						<h6 class="card-subtitle mb-2 text-muted">${store.cif}</h6>
						<p class="card-text">${store.address}</p>
						<p class="card-text">Tel: ${store.phone}</p>
						<a class="card-link" data-store="${store.cif}" href="#product-list">Ver Productos</a>
					</div>
				</div>`);
		}
	}

	showProductTypes() {
		this.products.empty();
		for (let product of arguments) {
			this.products.append(`<a class="nav__container__items__link nav-link" data-product="${product}" href="#product-list">${product}</a>`);
		}
	}

	showCategories(myCategories) {
		this.categories.empty();
		for (let category of myCategories) {
			this.categories.append(`<a class="nav__container__items__link nav-link" data-category="${category.title}" href="#product-list">${category.title}</a>`);
		}
	}

	showCategoriesInMenu(categories) {
		let li = $(
			`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats"
				role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Categorías
			</a>
		</li>`);
		let container = $('<div class="dropdown-menu" arialabelledby="navCats"></div>');
		//if (!category.done) shopping
		for (let category of categories) {
			container.append(`<a data-category="${category.title}"
		class="dropdown-item" href="#productlist">${category.title}</a>`);
		}
		li.append(container);
		this.menu.append(li);
	}

	listProducts(products, title) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="product-list" class="container my3"><div class="row"> </div></div>`);
		let product = products.next();
		while (!product.done) {
			let div = $(
				`<div class="col-md-4">
					<figure class="card card-product-grid card-lg">
						<a data-serial="${product.value.serial}" href="#single-product" class="imgwrap">
							<img class="${product.value.constructor.name}-style" src="${product.value.url}">
						</a>
 						<figcaption class="info-wrap">
							<div class="row">
							<div class="col-md-8">
								<a data-serial="${product.value.serial}" href="#singleproduct" class="title">${product.value.brand} - ${product.value.model}</a> </div>
								<div class="col-md-4">
									<div class="rating text-right"> <i class="fa fastar"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
								</div>
							</div>
						</figcaption>
						<div class="bottom-wrap">
							<a href="#" data-serial="${product.value.serial}" class="btn btn-primary floatright"> Comprar </a>
							<div class="pricewrap">
								<span class="price h5">${product.value.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
								<br>
								<small class="text-success">Free shipping</small>
							</div>
						</div>
					</figure>
				</div>`);
			container.children().first().append(div);
			product = products.next();
		}
		container.prepend(`<h1>${title}</h1>`);
		this.main.append(container);
	}

	bindProductsCategoryList(handler) {
		$('#navCats').next().children().click(function (event) {
			handler(this.dataset.category);
		});
		$('#category-list').find('a').click(function (event) {
			handler(this.dataset.category);
		});
	}

	bindProductsTypeList(handler) {
		$('#products').find('a').click(function (event) {
			handler(this.dataset.type);
		});
	}

	showProduct(product, message) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container;
		if (product) {
			container = $(
				`<div id="singleproduct" class="${product.constructor.name}-style container mt-5 mb-5">
					<div class="row d-flex justify-content-center">
						<div class="col-md-10">
							<div class="card">
								<div class="row">
									<div class="col-md-6">
										<div class="images p-3">
 											<div class="text-center p-4"> <img id="mainimage" src="${product.url}"/> </div>
 										</div>
 									</div>
									<div class="col-md-6">
										<div class="product p-4">
											<div class="mt-4 mb-3">
												<span class="textuppercase text-muted brand">${product.brand}</span>
												<h5 class="text-uppercase">${product.model}</h5>
												<div class="price d-flex flex-row align-itemscenter">
													<span class="actprice">${product.price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
												</div>
											</div>
											<p class="about">${product.description}</p>
											<div class="sizes mt-5">
												<h6 class="text-uppercase">Características</h6>
											</div>
											<div class="cart mt-4 align-itemscenter">
												<button data-serial="${product.serial}" class="btn btnprimary text-uppercase mr-2 px-4">Comprar</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`);
			container.find('h6').after(this.#instance[product.constructor.name]);
		} else {
			container = $(
				`<div class="container mt-5 mb-5">
					<div class="row d-flex justify-content-center">${message}</div>
				</div>`);
		}
		this.main.append(container);
	}

	bindShowProduct(handler) {
		$('#product-list').find('a.img-wrap').click(function (event) {
			handler(this.dataset.serial);
		});
		$('#product-list').find('figcaption a').click(function (event) {
			handler(this.dataset.serial);
		});
	}
}

export default StorehouseView;
