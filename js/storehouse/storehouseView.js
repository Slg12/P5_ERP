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

	#excecuteHandler(handler, handlerArguments, scrollElement, data, url, event) {
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	constructor() {
		this.stores = $("#stores");
		this.productsTitle = $("#products-title");
		this.productList = $("#product-list");
		this.singleProduct = $("#single-product");
		this.products = $("#products");
		this.categories = $("#categories");
		this.menu = $(".navbar-nav");
		this.productWindow = null;
	}

	rename(name) {
		$(".storehouse-name").text(name);
	}

	reset() {
		this.productsTitle.empty();
		this.productList.empty();
		this.singleProduct.empty();
	}

	bindInit(handler) {
		$('#init').click((event) => {
			this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
		$('#logo').click((event) => {
			this.#excecuteHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
	}

	showStores(myStores) {
		for (let store of myStores) {
			store = store.store;
			this.stores.append(
				`<div class="main__store card" style="width: 18rem;">
					<div class="card-body">
						<h5 class="card-title">${store.name}</h5>
						<h6 class="card-subtitle mb-2 text-muted">${store.cif}</h6>
						<p class="card-text">${store.address}</p>
						<p class="card-text">Tel: ${store.phone}</p>
						<a class="card-link" data-type="${store.cif}" href="#products-title">Ver Productos</a>
					</div>
				</div>`);
		}
	}

	bindProductsStoreList(handler) {
		$('#stores').find('a').click(event => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			this.#excecuteHandler(
				handler, [type],
				'#products-title',
				{ action: 'productsStoreList', type: type },
				'#stores', event
			);
		});
	}

	showProductsInMenu() {
		this.products.empty();
		for (let product of arguments) {
			this.products.append(`<a class="nav__container__items__link nav-link" data-type="${product}" href="#products-title">${product}</a>`);
		}
	}

	bindProductsTypeList(handler) {
		$('#products').find('a').click(event => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			this.#excecuteHandler(
				handler, [type],
				'#products-title',
				{ action: 'productsTypeList', type: type },
				'#products', event
			);
		});
	}

	showCategoriesInMenu(myCategories) {
		this.categories.empty();
		for (let category of myCategories) {
			this.categories.append(`<a class="nav__container__items__link nav-link" data-type="${category.title}" href="#products-title">${category.title}</a>`);
		}
	}

	bindProductsCategoryList(handler) {
		$('#categories').find('a').click(event => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			this.#excecuteHandler(
				handler, [type],
				'#products-title',
				{ action: 'productsCategoryList', type: type },
				'#categories', event
			);
		});
	}

	listProducts(products, type, store = false) {
		this.productList.empty();
		this.singleProduct.empty();
		this.productsTitle.text(type);

		let isProduct = (type === "Libro" || type === "Música" || type === "Monitor");
		let divCatg = $(`<div id="filter" class="card-text tags"><span>Filtro:</span></div>`)
		let catgStore = new Set();
		let cif = "NaN";
		let bookProducts = $(`<div class="row d-flex justify-content-center"></div>`);
		let existBook = false;
		let musicProducts = $(`<div class="row d-flex justify-content-center"></div>`);
		let existMusic = false;
		let monitorProducts = $(`<div class="row d-flex justify-content-center"></div>`);
		let existMonitor = false;

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

			if (store && store.store instanceof Store) {
				for (let productStr of store.products) {
					for (let category of productStr.categories) {
						catgStore.add(category.title);
					}
				}
				for (let category of catgStore) {
					divCatg.append(`<a class="tags__link" data-type="${category}" data-cif="${store.store.cif}" href="#products-title">${category}</a>`);
				}

				this.productList.append(divCatg);

				store = store.store.cif;
			}

			product = product.product;

			let divProduct;
			divProduct = $(
				`<div class="card lite">
					<a href="#products-title" class="card__img" data-serial="${product.serial}" data-cif="${store}">
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

			if (product instanceof Book) {
				existBook = true;
				bookProducts.append(divProduct);
			} else if (product instanceof Music) {
				existMusic = true;
				musicProducts.append(divProduct);
			} else if (product instanceof Monitor) {
				existMonitor = true;
				monitorProducts.append(divProduct);
			}
		}


		if (existBook) {
			if (!isProduct) this.productList.append(`<h3 class="text-muted">- Libro</h3>`);
			this.productList.append(bookProducts);
		}

		if (existMusic) {
			if (!isProduct) this.productList.append(`<h3 class="text-muted">- Música</h3>`);
			this.productList.append(musicProducts);
		}

		if (existMonitor) {
			if (!isProduct) this.productList.append(`<h3 class="text-muted">- Monitor</h3>`);
			this.productList.append(monitorProducts);
		}
	}

	showProduct(product, cif, instance) {
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

			let linkCategories = "";
			for (let category of product.categories) {
				linkCategories += `<a class="tags__link-circle" data-type="${category.title}" href="#products-title">${category.title}</a>`;
			}

			product = product.product;

			let imagenes =
				`<div class="card__product carousel-item active">
					<img src="./img/products/${product.images[0]}" class="card__product__img" alt="Product">
				</div>`;
			if (product.images.length > 1) {
				for (let i = 1; i < product.images.length; i++) {
					imagenes +=
						`<div class="card__product carousel-item">
						<img src="./img/products/${product.images[i]}" class="card__product__img" alt="Product">
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
					`<h5 class="card-title">${product.name} Vol: ${product.volume} - ${product.editorial}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
					<h6 class="card-subtitle mb-2 text-muted">ISBN: ${product.serial}</h6>
					<p class="card-text">Autor: ${product.author}</p>
					<p class="card-text">Idioma: ${product.lenguage}</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${linkCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
					<button id="b-close" class="btn btn-danger">Cerrar Ventana</button>
					<a href="#" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
			}
			if (product instanceof Music) {
				content =
					`<h5 class="card-title">${product.name} - ${product.band}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
					<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
					<p class="card-text">Duración: ${product.length} min.</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${linkCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
					<button id="b-close" class="btn btn-danger">Cerrar Ventana</button>
					<a href="#" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
			}
			if (product instanceof Monitor) {
				content =
					`<h5 class="card-title">${product.name} [${product.screenType}] - ${product.brand}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
					<p class="card-text">Tasa de Refresco: ${product.refreshRate}</p>
					<p class="card-text">Tamaño: ${product.size}</p>
					<p class="card-text">Color: ${product.color}</p>
					<p class="card-text">Conectores: ${product.inputType}</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${linkCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<a href="#" class="boton__comprar btn btn-primary">Comprar</a>
					<button id="b-close" class="btn btn-danger">Cerrar Ventana</button>
					<a href="#" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
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
						<div class="col-md-8">
							<div class="card-body">
								${content}
							</div>
						</div>
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
		$('#product-list').find('a.card__img').click(event => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let cif = $(event.target).closest($('a')).get(0).dataset.cif;
			this.#excecuteHandler(
				handler, [serial, cif],
				'#products-title',
				{ action: 'ShowProduct', serial: serial, cif: cif },
				'#product-list', event
			);
		});
	}

	bindProductToCategory(handler) {
		$('#tags').find('a').click(event => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			this.#excecuteHandler(
				handler, [type],
				'#products-title',
				{ action: 'ProductToCategory', type: type },
				'#tags', event
			);
		});
	}

	bindFilterStoreCategory(handler) {
		$('#filter').find('a').click(event => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			let cif = $(event.target).closest($('a')).get(0).dataset.cif;
			this.#excecuteHandler(
				handler, [type, cif],
				'#products-title',
				{ action: 'FilterStoreCategory', type: type, cif: cif },
				'#filter', event
			);
		});
	}

	showProductInNewWindow(product, instance) {
		let main = $(this.productWindow.document).find('main');
		main.empty();

		let title = $(`<p class="h2 product__title">${this.productsTitle.text()}</p>`);
		main.append(title);

		let container;
		console.log(product)
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
				spanCategories += `<span class="tags__link-circle">${category.title}</span>`;
			}

			product = product.product;

			let imagenes =
				`<div class="card__product carousel-item active">
					<img src="./img/products/${product.images[0]}" class="card__product__img" alt="Product">
				</div>`;
			if (product.images.length > 1) {
				for (let i = 1; i < product.images.length; i++) {
					imagenes +=
						`<div class="card__product carousel-item">
						<img src="./img/products/${product.images[i]}" class="card__product__img" alt="Product">
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
					`<h5 class="card-title">${product.name} Vol: ${product.volume} - ${product.editorial}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
					<h6 class="card-subtitle mb-2 text-muted">ISBN: ${product.serial}</h6>
					<p class="card-text">Autor: ${product.author}</p>
					<p class="card-text">Idioma: ${product.lenguage}</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${spanCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<button class="btn btn-danger text-uppercase m-2 px-4" onClick="window.close()">CERRAR</button>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
			}
			if (product instanceof Music) {
				content =
					`<h5 class="card-title">${product.name} - ${product.band}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Género: ${product.genre}</h6>
					<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
					<p class="card-text">Duración: ${product.length} min.</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${spanCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<button class="btn btn-danger text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
			}
			if (product instanceof Monitor) {
				content =
					`<h5 class="card-title">${product.name} [${product.screenType}] - ${product.brand}</h5>
					<h6 class="card-subtitle mb-2 text-muted">Serial: ${product.serial}</h6>
					<p class="card-text">Tasa de Refresco: ${product.refreshRate}</p>
					<p class="card-text">Tamaño: ${product.size}</p>
					<p class="card-text">Color: ${product.color}</p>
					<p class="card-text">Conectores: ${product.inputType}</p>
					<p class="card-text">Categorías:</p>
					<div id="tags" class="card-text tags">${spanCategories}</div>
					${h6Stock}
					<p class="card-text h4">Precio: ${product.price} €</p>
					<button class="btn btn-danger text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>`;
			}

			container = $(
				`<div class="product card mb-3" style="max-width: 100%;">
					<div class="row g-0">
						<div class="col-md-4">
							<div id="carouselExampleSlidesOnly${instance}" class="carousel slide" data-bs-ride="carousel">
								<div class="carousel-inner">
									${imagenes}
								</div>
							</div>
						</div>
						<div class="col-md-8">
							<div class="card-body">
								${content}
							</div>
						</div>
					</div>
				</div>`);

			container.find('small').text(this.#instance[product.constructor.name]);
		} else {
			container = $(
				`<div class="container mt-5 mb-5">
					<div class="row d-flex justify-content-center">${product}</div>
				</div>`);
		}
		main.append(container);
		this.productWindow.document.body.scrollIntoView();
	}

	bindShowProductInNewWindow(handler) {
		$('#b-open').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let cif = $(event.target).closest($('a')).get(0).dataset.cif;
			if (!this.productWindow || this.productWindow.closed) {
				this.productWindow = window.open("product.html", "ProductWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
				this.productWindow.addEventListener('DOMContentLoaded', () => {
					handler(serial, cif);
				});
			} else {
				handler(serial, cif);
				this.productWindow.focus();
			}
		});
		$('#b-close').click((event) => {
			if (this.productWindow && !this.productWindow.closed) {
				this.productWindow.close();
			}
		});
	}
}

export default StorehouseView;
