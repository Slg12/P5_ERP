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
		return 'Características de libro.';
	}
	#MusicCharacteristics(product) {
		return 'Características de disco de música.';
	}
	#MonitorCharacteristics(product) {
		return 'Características de monitor.';
	}

	constructor() {
		this.stores = $("#stores");
		this.productsTitle = $("#products-title");
		this.productList = $("#product-list");
		this.singleProduct = $("#single-product");
		this.products = $("#products");
		this.categories = $("#categories");
		this.menu = $(".navbar-nav");
	}

	bindInit(handler) {
		$('.storehouse-name').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
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
						<a class="card-link" data-type="${store.cif}" href="#product-list">Ver Productos</a>
					</div>
				</div>`);
		}
	}

	showProductsInMenu() {
		this.products.empty();
		for (let product of arguments) {
			this.products.append(`<a class="nav__container__items__link nav-link" data-type="${product}" href="#product-list">${product}</a>`);
		}
	}

	showCategoriesInMenu(myCategories) {
		this.categories.empty();
		for (let category of myCategories) {
			this.categories.append(`<a class="nav__container__items__link nav-link" data-type="${category.title}" href="#product-list">${category.title}</a>`);
		}
	}

	listProducts(products, type, first = true) {
		if (first) {
			this.productList.empty();
			this.singleProduct.empty();
			this.productsTitle.text("Productos - " + type);
		} else {
			this.productList.append($(`<h2>- ${type}</h2>`));
		}

		let allProducts = $(`<div class="d-flex"></div>`)

		for (let product of products) {
			let stock = false;
    	if (!Number.isNaN(parseInt(product.stock))) stock = parseInt(product.stock);

			let color;
			if (stock <= 0) {
				color = "text-danger";
			} else if (stock < 20) {
				color = "text-orange";
			} else {
				color = "text-success";
			}

			let h6Stock = `<h6 class="card-subtitle mb-2 ${color}">Stock: ${stock}</h6>`;

			product = product.product;

			allProducts.append(
				`<div class="card lite">
					<a href="#single-product" class="card__img" data-serial="${product.serial}">
						<img src="./img/products/${product.images[0]}" class="card-img-top" alt="${product.name}">
					</a>
					<div class="card-body">
						<h5 class="card-title">${product.name}</h5>
						<h6 class="card-subtitle mb-2 text-muted">${product.serial}</h6>
						${h6Stock}
						<p class="card-text">${product.price} €</p>
						<a href="#" class="btn btn-primary">Comprar</a>
					</div>
				</div>`
			);
		}
		this.productList.append(allProducts);
	}

	bindProductsCategoryList(handler) {
		$('#categories').find('a').click(function (event) {
			handler(this.dataset.type);
		});

		//No Funciona
		$('#tags').find('a').click(function (event) {
			handler(this.dataset.type);
		});
	}

	bindProductsStoreList(handler) {
		$('#stores').find('a').click(function (event) {
			handler(this.dataset.type);
		});
	}

	bindProductsTypeList(handler) {
		$('#products').find('a').click(function (event) {
			handler(this.dataset.type);
		});
	}

	showProduct(product, instance) {
		this.singleProduct.empty();
		this.productList.empty();
		let container;
		if (product.product instanceof Product) {

			let stock = false;
    	if (!Number.isNaN(parseInt(product.stock))) stock = parseInt(product.stock);

			let color;
			if (stock <= 0) {
				color = "text-danger";
			} else if (stock < 20) {
				color = "text-orange";
			} else {
				color = "text-success";
			}

			let h6Stock = `<h6 class="card-subtitle mb-2 ${color}">Stock: ${stock}</h6>`;

			let spanCategories = "";
			for (let category of product.categories) {
				spanCategories += `<a class="tags__link" data-type="${category.title}" href="#product-list">${category.title}</a>`;
			}

			product = product.product;

			let imagenes =
				`<div class="carousel-item active">
					<img src="./img/products/${product.images[0]}" class="d-block w-100" alt="Product">
				</div>`;
			if (product.images.length > 1) {
				for (let i = 1; i < product.images.length; i++) {
					imagenes +=
					`<div class="carousel-item">
						<img src="./img/products/${product.images[i]}" class="d-block w-100" alt="Product">
					</div>`;
				}
				imagenes +=
					`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly${instance}" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly${instance}" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>`;
			}

			let content;
			if (product instanceof Book) {
				content =
					`<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${product.name} Vol: ${product.volume} - ${product.editorial}</h5>
							<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
							<h6 class="card-subtitle mb-2 text-muted">ISBN: ${product.serial}</h6>
							<p class="card-text">Autor: ${product.author}</p>
							<p class="card-text">Idioma: ${product.lenguage}</p>
							<p class="card-text">Categorías:</p>
							<div id="tags" class="card-text tags">${spanCategories}</div>
							${h6Stock}
							<p class="card-text h4">Precio: ${product.price} €</p>
							<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
							<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>`;
			}
			if (product instanceof Music) {
				content =
					`<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${product.name} - ${product.band}</h5>
							<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
							<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
							<p class="card-text">Duración: ${product.length} min.</p>
							<p class="card-text">Categorías:</p>
							<div id="tags" class="card-text tags">${spanCategories}</div>
							${h6Stock}
							<p class="card-text h4">Precio: ${product.price} €</p>
							<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
							<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>`;
			}
			if (product instanceof Monitor) {
				content =
					`<div class="col-md-8">
						<div class="card-body">
							<h5 class="card-title">${product.name} [${product.screenType}] - ${product.brand}</h5>
							<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
							<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
							<p class="card-text">Tasa de Refresco: ${product.refreshRate}</p>
							<p class="card-text">Tamaño: ${product.size}</p>
							<p class="card-text">Color: ${product.color}</p>
							<p class="card-text">Conectores: ${product.inputType}</p>
							<p class="card-text">Categorías:</p>
							<div id="tags" class="card-text tags">${spanCategories}</div>
							${h6Stock}
							<p class="card-text h4">Precio: ${product.price} €</p>
							<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
							<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
						</div>
					</div>`;
			}

			container = $(
				`<div class="card">
					<div class="row g-0">
						<div class="col-md-4">
							<div id="carouselExampleSlidesOnly${instance}" class="carousel slide" data-bs-ride="carousel">
								<div class="carousel-inner">
									${imagenes}
								</div>
							</div>
						</div>
						${content}
					</div>
				</div>`);

			container.find('small').text(this.#instance[product.constructor.name]);
		} else {
			container = $(
				`<div class="container mt-5 mb-5">
					<div class="row d-flex justify-content-center">${product}</div>
				</div>`);
		}
		this.singleProduct.append(container);
	}

	bindShowProduct(handler) {
		$('#product-list').find('a.card__img').click(function (event) {
			handler(this.dataset.serial);
		});
	}
}

export default StorehouseView;
