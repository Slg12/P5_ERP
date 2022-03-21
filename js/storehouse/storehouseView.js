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
import { newStoreValidation, removeStoreValidation, newProductValidation, removeProductValidation, newCategoryValidation, removeCategoryValidation, addStockValidation } from './validation.js';


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
		this.main = $("main");
		this.stores = $("#stores");
		this.productsTitle = $("#products-title");
		this.productList = $("#product-list");
		this.singleProduct = $("#single-product");
		this.products = $("#products");
		this.categories = $("#categories");
		this.menu = $(".navbar-nav");
		this.productWindow = [];
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

	showAdminInMenu() {
		$('#mialmacen-links').append(
			`<li class="nav__item dropdown" id="admin-tools">
				<a class="nav-link" aria-current="page" href="#">Administración</a>
				<div class="nav__container l-200">
					<div class="nav__container__items" id="admin">
						<div class="p-3">
							<h3 class="text-center">Categorias</h3>
							<a id="lnewCategory" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#createCategory" href="#products-title">Crear Categoria</a>
							<a id="ldelCategory" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#removeCategory" href="#products-title">Borrar Categoria</a>
						</div>
						<div class="p-3">
							<h3 class="text-center">Productos</h3>
							<a id="lnewProduct" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#createProduct" href="#products-title">Crear Producto</a>
							<a id="ldelProduct" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#removeProduct" href="#products-title">Borrar Producto</a>
						</div>
						<div class="p-3">
							<h3 class="text-center">Tiendas</h3>
							<a id="lnewStore" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#createStore" href="#products-title">Crear Tienda</a>
							<a id="ldelStore" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#removeStore" href="#products-title">Borrar Tienda</a>
						</div>
						<div class="p-3">
							<h3 class="text-center">Gestión Stock</h3>
							<a id="lnewStock" class="nav__container__items__link nav-link" data-bs-toggle="modal" data-bs-target="#addStock" href="#products-title">Añadir Stock</a>
						</div>
					</div>
				</div>
			</li>
			<li id="admin-backup">
				<form name="fBackup" role="form" method="post" action="backup.php">
					<input type="hidden" value="" name="backup" id="fbHiddenValue">
					<button class="nav-link bg-transparent border-0 ps-3 pe-3" type="submit" name="fbBackup" id="fbBackup">Backup</button>
				</form>
			</li>`);
	}

	bindShowInfoStoreHouse(handle) {
		$('#admin-backup').click(function () {
			handle();
		})
	};

	showDataStoreHouse(string) {
		$('#fbHiddenValue').val(string);
	};

	showStoreFroms() {
		let createStoreForm = $(
			`<div class="modal fade" id="createStore" tabindex="-1" aria-labelledby="createStoreLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="createStoreLabel">Crear Tienda</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fNewStore" role="form" novalidate>
								<div class="form-floating col-md-5">
									<input type="text" class="form-control form__controls" id="fcsCif" placeholder="A - 12345678"
										pattern="[A-Z]{1} - [0-9]{8}" required>
									<label for="fcsCif" class="form__label">Cif*</label>
									<div class="invalid-feedback">✗ A - 12345678</div>
									<div class="valid-feedback">✓</div>
								</div>
								<div class="form-floating col-md-7">
									<input type="text" class="form-control form__controls" id="fcsName" placeholder="Nombre" minlength="2"
										required>
									<label for="fcsName" class="form__label">Nombre*</label>
									<div class="invalid-feedback">✗ Min 2 Letras</div>
									<div class="valid-feedback">✓</div>
								</div>
								<div class="form-floating col-md-12">
									<input type="text" class="form-control form__controls" id="fcsAddress" placeholder="Dirección" value="C/ ">
									<label for="fcsAddress" class="form__label">Dirección*</label>
									<div class="valid-feedback">✓</div>
								</div>
								<div class="form-floating col-md-6">
									<input type="text" class="form-control form__controls" id="fcsPhone" placeholder="Telfono" pattern="([0-9]{3} [0-9]{3} [0-9]{3})||([0-9]{3} [0-9]{2} [0-9]{2} [0-9]{2})" required>
									<label for="fcsPhone" class="form__label">Teléfono*</label>
									<div class="invalid-feedback">✗ 123 123 123 | 123 12 12 12</div>
									<div class="valid-feedback">✓</div>
								</div>
								<div class="form-floating col-md-3">
									<input type="text" class="form-control form__controls" id="fcsLatitude" placeholder="0" pattern="-?([0-8]?[0-9]){1}||-?(90){1}" required>
									<label for="fcsLatitude" class="form__label">Latitud*</label>
									<div class="invalid-feedback">✗ Rango: -90 al 90</div>
									<div class="valid-feedback">✓</div>
								</div>
								<div class="form-floating col-md-3">
									<input type="text" class="form-control form__controls" id="fcsLongitude" placeholder="0" pattern="-?([0-1]?[0-7]?[0-9]){1}||-?(180){1}" required>
									<label for="fcsLongitude" class="form__label">Longitud*</label>
									<div class="invalid-feedback">✗ Rango: -180 al 180</div>
									<div class="valid-feedback">✓</div>
								</div>
								<button class="form__button col-md-6" type="submit">Guardar Tienda</button>
								<button class="form__button red col-md-6" type="reset">Borrar Formulario</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		let removeStoreForm = $(
			`<div class="modal fade" id="removeStore" tabindex="-1" aria-labelledby="removeStoreLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeStoreLabel">Borrar Tienda</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fRemStore" role="form" novalidate>
								<div class="form col-md-8">
									<select class="form-select form-select-lg mb-3" id="frsStore" required>
									</select>
								</div>
								<button class="form__button red col-md-4" type="submit">Borrar Tienda</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		this.main.append(createStoreForm);
		this.main.append(removeStoreForm);
	}

	bindNewStoreForm(handler) {
		newStoreValidation(handler);
	}

	showRemoveStoreForm(stores) {
		$('#frsStore').empty();
		$('#frsStore').append(`<option value="" disabled selected>Elige una tienda</option>`);

		for (let store of stores) {
			store = store.store;
			$('#frsStore').append(`<option value="${store.cif}">${store.name}</option>`);
		}
	}

	bindRemoveStoreForm(handler) {
		removeStoreValidation(handler);
	}

	showProductFroms() {
		let createProductForm = $(
			`<div class="modal fade" id="createProduct" tabindex="-1" aria-labelledby="createProductLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="createProductLabel">Crear Producto</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
						<div class="w-50 mt-2 m-auto">
							<label class="form__label w-100 text-center m-0 p-1" for="fcpType">Tipo de producto</label>
							<select class="form-select form__controls" name="fcpType" id="fcpType" required>
								<option value="Default" selected></option>
								<option value="Book">Libro</option>
								<option value="Music">Música</option>
								<option value="Monitor">Monitor</option>
							</select>
						</div>
							<form class="form row g-3" name="fNewProduct" role="form" novalidate>
								<div class="form row g-3 col-md-12" id="typeOfProduct">
									<p class="text-muted text-center">Seleciona el tipo de producto</p>
								</div>

								<button class="form__button col-md-6" type="submit">Guardar Producto</button>
								<button class="form__button red col-md-6" type="reset">Borrar Formulario</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		let typeProductForm = {
			Book:
				`<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpSerial" placeholder="123-12-1234-123-1"
						pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}-[0-9]{1}" required>
					<label for="fcpSerial" class="form__label">ISBN*</label>
					<div class="invalid-feedback">✗ 123-12-1234-123-1</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpName" placeholder="Nombre"
					minlength="2" required>
					<label for="fcpName" class="form__label">Nombre*</label>
					<div class="invalid-feedback">✗ Min 2 Letras</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpPrice" pattern="[0-9]{1,10}(.[0-9]{1,2})?" placeholder="12" required>
					<label for="fcpPrice" class="form__label">Precio*</label>
					<div class="invalid-feedback">✗ Minimo de 0.01€</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form col-md-4">
					<label class="form__label m-auto w-25 lh-1" for="fcpTax">IVA*</label>
					<select class="form-select form__controls" name="fcpTax" required>
						<option value="0">0 %</option>
						<option value="4">4 %</option>
						<option value="10">10 %</option>
						<option value="21" selected>21 %</option>
					</select>
					<div class="valid-feedback w-100">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpImage" placeholder="imagen.png" value="book6Front.jpg">
					<label for="fcpImage" class="form__label">Imagen</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpEditorial" placeholder="Planeta">
					<label for="fcpEditorial" class="form__label">Editorial</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpAuthor" placeholder="Planeta">
					<label for="fcpAuthor" class="form__label">Autor</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-3">
					<input type="text" class="form-control form__controls" id="fcpLenguage" pattern="(ES|EN)" placeholder="ES" required>
					<label for="fcpLenguage" class="form__label">Idioma*</label>
					<div class="invalid-feedback">✗ ES o EN</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-5">
					<input type="text" class="form-control form__controls" id="fcpGenre" placeholder="Terror">
					<label for="fcpGenre" class="form__label">Género</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="number" class="form-control form__controls" id="fcpVolume" min="1" placeholder="1" required>
					<label for="fcpVolume" class="form__label">Volumen*</label>
					<div class="invalid-feedback">✗ Mayor de 1</div>
					<div class="valid-feedback">✓</div>
				</div>`,
			Music:
				`<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpSerial" placeholder="Serial"
						minlength="4" required>
					<label for="fcpSerial" class="form__label">Nº Serie*</label>
					<div class="invalid-feedback">✗ Min 4 Letras</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpName" placeholder="Nombre"
					minlength="2" required>
					<label for="fcpName" class="form__label">Nombre*</label>
					<div class="invalid-feedback">✗ Min 2 Letras</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpPrice" pattern="[0-9]{1,10}(.[0-9]{1,2})?" placeholder="12" required>
					<label for="fcpPrice" class="form__label">Precio*</label>
					<div class="invalid-feedback">✗ Minimo de 0.01€</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form col-md-4">
					<label class="form__label m-auto w-25 lh-1" for="fcpTax">IVA*</label>
					<select class="form-select form__controls" name="fcpTax" required>
						<option value="0">0 %</option>
						<option value="4">4 %</option>
						<option value="10">10 %</option>
						<option value="21" selected>21 %</option>
					</select>
					<div class="valid-feedback w-100">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpImage" placeholder="imagen.png" value="disk6Front.jpg">
					<label for="fcpImage" class="form__label">Imagen</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpBrand" placeholder="AC/DC">
					<label for="fcpBrand" class="form__label">Artista</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpGenre" placeholder="Rock">
					<label for="fcpGenre" class="form__label">Género</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpLength"
						pattern="[0-9]{1,2}:[0-9]{2}" placeholder="00:00" required>
					<label for="fcpLength" class="form__label">Duración*</label>
					<div class="invalid-feedback">✗ 00:00 | 0:00</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form col-md-6">
					<label class="form__label m-auto w-25 lh-1" for="fcpDate">Fecha</label>
					<input type="date" class="form-control form__controls" id="fcpDate" disabled>
					<div class="invalid-feedback">✗ Fecha Obligatoria</div>
					<div class="valid-feedback w-100">✓</div>
				</div>`,
			Monitor:
				`<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpSerial" placeholder="Serial"
						minlength="4" required>
					<label for="fcpSerial" class="form__label">Nº Serie*</label>
					<div class="invalid-feedback">✗ Min 4 Letras</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-6">
					<input type="text" class="form-control form__controls" id="fcpName" placeholder="Nombre"
					minlength="2" required>
					<label for="fcpName" class="form__label">Nombre*</label>
					<div class="invalid-feedback">✗ Min 2 Letras</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpPrice" pattern="[0-9]{1,10}(.[0-9]{1,2})?" placeholder="12" required>
					<label for="fcpPrice" class="form__label">Precio*</label>
					<div class="invalid-feedback">✗ Minimo de 0.01€</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form col-md-4">
					<label class="form__label m-auto w-25 lh-1" for="fcpTax">IVA*</label>
					<select class="form-select form__controls" name="fcpTax" required>
						<option value="0">0 %</option>
						<option value="4">4 %</option>
						<option value="10">10 %</option>
						<option value="21" selected>21 %</option>
					</select>
					<div class="valid-feedback w-100">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpImage" placeholder="imagen.png" value="monitor6.jpg">
					<label for="fcpImage" class="form__label">Imagen</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-5">
					<input type="text" class="form-control form__controls" id="fcpBrand" placeholder="Samsung">
					<label for="fcpBrand" class="form__label">Marca</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-7">
					<input type="text" class="form-control form__controls" id="fcpRefresh" pattern="[1-9]?[0-9]{1,2}Hz" placeholder="00Hz" required>
					<label for="fcpRefresh" class="form__label">Tasa de Refresco*</label>
					<div class="invalid-feedback">✗ 00Hz</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpSize" pattern='[0-9]{1,2}(.[0-9]{1})?"' placeholder='00"' required>
					<label for="fcpSize" class="form__label">Pulgadas*</label>
					<div class="invalid-feedback">✗ 00" | 00.0"</div>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form-floating col-md-4">
					<input type="text" class="form-control form__controls" id="fcpColor" placeholder="Negro">
					<label for="fcpColor" class="form__label">Color</label>
					<div class="valid-feedback">✓</div>
				</div>
				<div class="form col-md-4">
				<label class="form__label text-center lh-1" for="fcpScreen">Pantalla</label>
				<select class="form-select form__controls" name="fcpScreen">
				<option value="Flat" selected>Plana</option>
				<option value="Curved">Curva</option>
				</select>
				<div class="valid-feedback w-100">✓</div>
				</div>
				<span class="form__label ms-0">Conexiones:</span>
					<div class="mt-0 d-flex flex-wrap justify-content-between"  id="checkType">
						<div>
							<input type="checkbox" class="form-check-input" id="fcpType0" value="HDMI" checked>
							<label for="fcpType0">HDMI</label>
						</div>
						<div>
							<input type="checkbox" class="form-check-input" id="fcpType1" value="VGA">
							<label for="fcpType1">VGA</label>
						</div>
						<div>
							<input type="checkbox" class="form-check-input" id="fcpType2" value="DVI">
							<label for="fcpType2">DVI</label>
						</div>
						<div>
							<input type="checkbox" class="form-check-input" id="fcpType3" value="DP">
							<label for="fcpType3">DisplayPort</label>
						</div>
						<div>
							<input type="checkbox" class="form-check-input" id="fcpType4" value="USB-C">
							<label for="fcpType4">USB-C</label>
						</div>
					</div>
				`,
			Default: '<p class="text-muted text-center">Seleciona el tipo de producto</p>'
		};

		let removeProductForm = $(
			`<div class="modal fade" id="removeProduct" tabindex="-1" aria-labelledby="removeProductLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeProductLabel">Borrar Producto</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fRemProduct" role="form" novalidate>
								<div class="form col-md-8">
									<select class="form-select form-select-lg mb-3" id="frsProduct" required>
									</select>
								</div>
								<button class="form__button red col-md-4" type="submit">Borrar Producto</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		this.main.append(createProductForm);
		this.main.append(removeProductForm);

		$('#fcpType').change(function () {
			$('#typeOfProduct').empty();
			$('#typeOfProduct').append(typeProductForm[this.value]);
			if (this.value != 'Default') {
				$('#typeOfProduct').append(
					`<span class="h5">Categorías:</span>
					<div class="mt-0 d-flex flex-wrap" id="checkCategories"></div>`);
			}
		});

	}

	showCreateProductForm(categories) {
		let checkCategories = "";
		let i = 0;

		for (let category of categories) {
			if (category.title != 'Default')
				checkCategories +=
					`<div class="w-25">
						<input type="checkbox" class="form-check-input" id="fcpCategory${i}" value="${category.title}">
						<label for="fcpCategory${i++}">${category.title}</label>
					</div>
					`;
		}

		$('#fcpType').change(function () {
			if (this.value != 'Default') {
				$('#checkCategories').empty();
				$('#checkCategories').append(checkCategories);
			}
		});
	}

	bindNewProductForm(handler) {
		newProductValidation();
		$('#fcpType').change(function () {
			newProductValidation(this.value, handler);
		});
	}

	showRemoveProductForm(products) {
		$('#frsProduct').empty();
		$('#frsProduct').append(`<option value="" disabled selected>Elige un producto</option>`);

		for (let product of products) {
			product = product.product;
			$('#frsProduct').append(`<option value="${product.serial}">${product.name} (${product.serial})</option>`);
		}
	}

	bindRemoveProductForm(handler) {
		removeProductValidation(handler);
	}

	showCategoryFroms() {
		let createCategoryForm = $(
			`<div class="modal fade" id="createCategory" tabindex="-1" aria-labelledby="createCategoryLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="createCategoryLabel">Crear Categoría</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fNewCategory" role="form" novalidate>
								<div class="form-floating col-md-12">
									<input type="text" class="form-control form__controls" id="fccTitle" placeholder="Titulo" minlength="2" required>
									<label for="fccTitle" class="form__label">Titulo*</label>
									<div class="invalid-feedback">✗ Min 2 Letras</div>
									<div class="valid-feedback">✓</div>
								</div>
								<button class="form__button col-md-6" type="submit">Guardar Categoría</button>
								<button class="form__button red col-md-6" type="reset">Borrar Formulario</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		let removeCategoryForm = $(
			`<div class="modal fade" id="removeCategory" tabindex="-1" aria-labelledby="removeCategoryLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeCategoryLabel">Borrar Categoría</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fRemCategory" role="form" novalidate>
								<div class="form col-md-8">
									<select class="form-select form-select-lg mb-3" id="frcCategory" required>
									</select>
								</div>
								<button class="form__button red col-md-4" type="submit">Borrar Categoría</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		this.main.append(createCategoryForm);
		this.main.append(removeCategoryForm);
	}

	bindNewCategoryForm(handler) {
		newCategoryValidation(handler);
	}

	showRemoveCategoryForm(categories) {
		$('#frcCategory').empty();
		$('#frcCategory').append(`<option value="" disabled selected>Elige una categoría</option>`);

		for (let category of categories) {
			if (category.title !== "Default") $('#frcCategory').append(`<option value="${category.title}">${category.title}</option>`);
		}
	}

	bindRemoveCategoryForm(handler) {
		removeCategoryValidation(handler);
	}

	showStockFroms() {
		let addStockForm = $(
			`<div class="modal fade" id="addStock" tabindex="-1" aria-labelledby="addStockLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="addStockLabel">Gestión de Stock</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fAddStock" role="form" novalidate>
								<div class="form col-md-12">
									<select class="form-select form-select-lg pt-2 pb-3" id="fasStore" required>
									</select>
								</div>
								<div class="form col-md-8">
									<select class="form-select form-select-lg pt-2 pb-3" id="fasProduct" required>
									</select>
								</div>
								<div class="form-floating col-md-4">
									<input type="number" class="form-control form__controls" id="fasStock" min="0" placeholder="1" required>
									<label for="fasStock" class="form__label">Stock*</label>
									<div class="invalid-feedback">✗ Mayor de 0</div>
									<div class="valid-feedback">✓</div>
								</div>
								<button class="form__button col-md-6" type="submit">Añadir Stock</button>
								<button class="form__button red col-md-6" type="reset">Borrar Formulario</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		this.main.append(addStockForm);
	}

	showStockStoreForm(stores) {
		$('#fasStore').empty();
		$('#fasStore').append(`<option value="" disabled selected>Elige una tienda</option>`);

		for (let store of stores) {
			store = store.store;
			$('#fasStore').append(`<option value="${store.cif}">${store.name}</option>`);
		}
	}

	showStockProductForm(products) {
		$('#fasProduct').empty();
		$('#fasProduct').append(`<option value="" disabled selected>Elige un producto</option>`);

		for (let product of products) {
			product = product.product;
			$('#fasProduct').append(`<option value="${product.serial}">${product.name}</option>`);
		}
	}

	bindAddStockForm(handler) {
		addStockValidation(handler);
	}

	showNewStoreModal(done, store, error) {
		$(document.fNewStore).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newStoreModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newStoreModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newStoreModalLabel">Tienda creada</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							La tienda <strong>${store.cif}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#createStore').modal('hide');
			let newStoreModal = $('#newStoreModal');
			newStoreModal.modal('show');
			newStoreModal.find('button').click(() => {
				newStoreModal.on('hidden.bs.modal', function (event) {
					document.fNewStore.reset();
					// document.fNewStore.fcsCif.focus();
					this.remove();
				});
				newStoreModal.modal('hide');
			})
		} else {
			$(document.fNewStore).prepend(`<div class="error text-danger p-3" id="fensError"><i class="fas fa-exclamation-triangle"></i> El Cif <strong>${store.cif}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#fensError').remove();
			}, 3000);
		}
	}

	showRemoveStoreModal(done, cif, error) {
		$(document.fRemStore).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="remStoreModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="remStoreModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="remStoreModalLabel">Tienda borrada</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							La tienda <strong>${cif}</strong> ha sido borrada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#removeStore').modal('hide');
			let remStoreModal = $('#remStoreModal');
			remStoreModal.modal('show');
			remStoreModal.find('button').click(() => {
				remStoreModal.on('hidden.bs.modal', function (event) {
					// document.fRemStore.reset();
					this.remove();
				});
				remStoreModal.modal('hide');
			})
		} else {
			$(document.fRemStore).prepend(`<div class="error text-danger p-3" id="fersError"><i class="fas fa-exclamation-triangle"></i> El Cif <strong>${cif}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#fersError').remove();
			}, 3000);
		}
	}

	showNewProductModal(done, serial, error) {
		$(document.fNewProduct).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newProductModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newProductModalLabel">Producto creado</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							El producto <strong>${serial}</strong> ha sido creado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#createProduct').modal('hide');
			let newProductModal = $('#newProductModal');
			newProductModal.modal('show');
			newProductModal.find('button').click(() => {
				newProductModal.on('hidden.bs.modal', function (event) {
					resetProductForm();
					this.remove();
				});
				newProductModal.modal('hide');
			})
		} else {
			$(document.fNewProduct).prepend(`<div class="error text-danger p-3" id="fenpError"><i class="fas fa-exclamation-triangle"></i> El Nº de Serie <strong>${serial}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#fenpError').remove();
			}, 3000);
		}
	}

	resetProductForm() {
		document.getElementById("fcpType").value = "Default";
		$('#typeOfProduct').empty();
		$('#typeOfProduct').append('<p class="text-muted text-center">Seleciona el tipo de producto</p>');
		newProductValidation();
	}

	showRemoveProductModal(done, serial, error) {
		$(document.fRemProduct).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="remProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="remProductModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="remProductModalLabel">Producto borrado</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							El producto <strong>${serial}</strong> ha sido borrado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#removeProduct').modal('hide');
			let remProductModal = $('#remProductModal');
			remProductModal.modal('show');
			remProductModal.find('button').click(() => {
				remProductModal.on('hidden.bs.modal', function (event) {
					// document.fRemProduct.reset();
					this.remove();
				});
				remProductModal.modal('hide');
			})
		} else {
			$(document.fRemProduct).prepend(`<div class="error text-danger p-3" id="ferpError"><i class="fas fa-exclamation-triangle"></i> El Cif <strong>${serial}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#ferpError').remove();
			}, 3000);
		}
	}

	showNewCategoryModal(done, title, error) {
		$(document.fNewCategory).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							La categoría <strong>${title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#createCategory').modal('hide');
			let newCategoryModal = $('#newCategoryModal');
			newCategoryModal.modal('show');
			newCategoryModal.find('button').click(() => {
				newCategoryModal.on('hidden.bs.modal', function (event) {
					document.fNewCategory.reset();
					// document.fNewCategory.fcsCif.focus();
					this.remove();
				});
				newCategoryModal.modal('hide');
			})
		} else {
			$(document.fNewCategory).prepend(`<div class="error text-danger p-3" id="fencError"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${title}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#fencError').remove();
			}, 3000);
		}
	}

	showRemoveCategoryModal(done, title, error) {
		$(document.fRemCategory).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="remCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="remCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="remCategoryModalLabel">Categoría borrada</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							La categoría <strong>${title}</strong> ha sido borrada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#removeCategory').modal('hide');
			let remCategoryModal = $('#remCategoryModal');
			remCategoryModal.modal('show');
			remCategoryModal.find('button').click(() => {
				remCategoryModal.on('hidden.bs.modal', function (event) {
					// document.fRemCategory.reset();
					this.remove();
				});
				remCategoryModal.modal('hide');
			})
		} else {
			$(document.fRemCategory).prepend(`<div class="error text-danger p-3" id="fercError"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${title}</strong> ya está en uso.</div>`);
			setTimeout(() => {
				$('#fercError').remove();
			}, 3000);
		}
	}

	showAddStockModal(done, message, store, product, stock, error) {
		$(document.fAddStock).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="addStockModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="addStockModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="addStockModalLabel">Stock añadido</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							Se ${message} <strong>${stock} ${product}</strong> a <strong>${store}</strong>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			this.main.append(modal);
			$('#addStock').modal('hide');
			let addStockModal = $('#addStockModal');
			addStockModal.modal('show');
			addStockModal.find('button').click(() => {
				addStockModal.on('hidden.bs.modal', function (event) {
					document.fAddStock.reset();
					// document.fAddStock.fcsCif.focus();
					this.remove();
				});
				addStockModal.modal('hide');
			})
		} else {
			$(document.fAddStock).prepend(`<div class="error text-danger p-3" id="fesError"><i class="fas fa-exclamation-triangle"></i>${error}</div>`);
			setTimeout(() => {
				$('#fesError').remove();
			}, 3000);
		}
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
					<button id="b-close" class="btn btn-danger">Cerrar Ventanas</button>
					<a href="#products-title" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
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
					<a href="#products-title" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
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
					<a href="#products-title" id="b-open" class="btn btn-primary" data-serial="${product.serial}" data-cif="${cif}">Abrir en nueva ventana</a>
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

	showProductInNewWindow(product, instance, position) {
		let main = $(this.productWindow[position].document).find('main');
		main.empty();

		let title = $(`<p class="h2 product__title">${this.productsTitle.text()}</p>`);
		main.append(title);

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
	}

	bindShowProductInNewWindow(handler) {
		$('#b-open').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			let cif = $(event.target).closest($('a')).get(0).dataset.cif;
			let isExist = -1;

			for (let i = 0; i < this.productWindow.length; i++) {
				if (this.productWindow[i].name === `ProductWindow ${serial}`) isExist = i;
			}

			if (isExist === -1) {
				let newProductWindow = window.open("product.html", `ProductWindow ${serial}`, "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
				newProductWindow.addEventListener('DOMContentLoaded', () => {
					handler(serial, cif, this.productWindow.length - 1);
				});

				this.productWindow.push(newProductWindow);
			} else {
				handler(serial, cif, isExist);
				this.productWindow[isExist].focus();
			}

		});
		$('#b-close').click((event) => {
			for (let window of this.productWindow) {
				if (window && !window.closed) {
					window.close();
				}
			}
		});
	}

	showCookiesMessage() {
		let layer = $(
			`<div class="fixed-bottom">
				<div id="cookiesMessage" class="toast show w-100" role="alert" data-autohide="false">
					<div class="toast-body p-4 d-flex flex-column m-0">
						<h4>Aviso de cookies <img class="cookie" src="img/cookies.png" /></h4>
						<p>Este sitio web almacena datos en cookies para su funcionalidad, entre las que se encuentra datos analíticos y personalización. Para poder utilizar este sitio, estás automáticamente aceptando que utilizamos cookies.</p>
						<div class="ml-auto">
							<button type="button" class="btn btn-warning deny" id="btnDeny">Denegar</button>
							<button type="button" class="btn btn-primary" id="btnAccept">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
		this.main.append(layer);
		$('#btnDeny').click(() => {
			$('.toast').toast('hide');
			this.main.empty();
			this.main.css({
				background: "transparent"
			})
			this.main.append(
				`<div class="text-warning p-4 bg-dark rounded" role="alert">
					<strong>Es necesario aceptar el uso de cookies para seguir navegando. Recarga la página y acepta los terminos y condiciones. Gracias.</strong>
				</div>`);
			this.menu.remove();
		})

		$('#btnAccept').click(() => {
			setCookie('mialmacenSLGCookies', 'true', 1);
			$('.toast').toast('hide');
		})
	}

	showIdentificationLink() {
		let userIdentity = $('#user-identity');
		userIdentity.empty();
		userIdentity.append(`<a id="login" class="nav-link" data-bs-toggle="modal" data-bs-target="#userLogIn" href="#products-title">Iniciar Sesión</a>`);
	}

	bindIdentificationLink(handler) {
		handler();
	}

	showLogin() {
		let userForm = $(
			`<div class="modal fade" id="userLogIn" tabindex="-1" aria-labelledby="userLogInLabel">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="userLogInLabel">Borrar Tienda</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<form class="form row g-3" name="fUserLogIn" id="fUserLogIn" role="form" novalidate>
								<div class="form-floating col-md-12">
									<input type="text" name="fulUsername" class="form-control form__controls" placeholder="Usuario">
									<label class="form__label" for="fulUsername">Usuario*</label>
								</div>
								<div class="form-floating col-md-12" id="feuErrorMessage">
									<input type="password" name="fulPassword" class="form-control form__controls" placeholder="Usuario">
									<label class="form__label" for="fulPassword">Contraseña*</label>
								</div>
								<div class="form col-md-12">
								<input name="fulRemember" type="checkbox" class="form-check-input" id="customControlInline">
								<label class="fw-bold" for="customControlInline">Recuerdame</label>
								</div>
								<button class="form__button col-md-12" type="submit">Acceder</button>
							</form>
						</div>
					</div>
				</div>
			</div>`);

		this.main.append(userForm);
	}

	bindLogin(handler) {
		let form = document.forms.fUserLogIn;
		$(form).submit((event) => {
			handler(form.fulUsername.value, form.fulPassword.value, form.fulRemember.checked);
			event.preventDefault();
		})
	}

	showInvalidUserMessage() {
		let message = `<p class="m-0 text-danger" id="feuError">Usuario o Contraseña incorrectos</p>`
		$('#feuErrorMessage').append(message);
		setTimeout(() => {
			$('#feuError').remove();
		}, 4000);
	}

	hideUserLogIn() {
		$('#userLogIn').modal('hide');
		$('#userLogIn').remove();
	}

	showAuthUserProfile(user) {
		$('#user-identity').empty();
		$('#user-identity').append(
			`<div class="account d-flex m-auto">
				<img class="user-image" src="img/user.png" alt="user">
				<sapn class="align-self-center">&nbsp;${user.username}</sapn>
			</div>
			<a id="logout" class="nav-link" href="#">Cerrar sesión</a>`);
	}

	showValidUserMessage(user) {
		let modal = $(
			`<div class="modal fade" id="authUserMessageModal" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="authUserMessageModal" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Usuario autenticado</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							Bienvendio <strong>${user.username}</strong>. Tus credenciales son correctas.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
		this.main.append(modal);
		let authUserMessageModal = $('#authUserMessageModal');
		setTimeout(() => {
			authUserMessageModal.modal('show');
			authUserMessageModal.find('button').click(() => {
				authUserMessageModal.on('hidden.bs.modal', function (event) {
					this.remove();
				});
				authUserMessageModal.modal('hide');
			})
		}, 100);
	}

	initHistory() {
		history.replaceState({ action: 'init' }, null);
	}

	setUserCookie(user) {
		setCookie('mialmacenSLGActiveUser', user.username, 1);
	}

	deleteUserCookie() {
		setCookie('mialmacenSLGActiveUser', '', 0);
	}

	bindCloseSession(handler) {
		$('#logout').click((event) => {
			handler();
			event.preventDefault();
		})
	}

	removeAdminMenu() {
		$('#admin-tools').remove();
		$('#admin-backup').remove();
	}
}

export default StorehouseView;
