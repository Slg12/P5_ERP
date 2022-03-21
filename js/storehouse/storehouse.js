"use strict";
import {
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException,
} from "../exceptions.js";

import { Product, Book, Music, Monitor } from "../entities/products.js";
import { Store } from "../entities/store.js";
import { Coords } from "../entities/store.js";
import { Category } from "../entities/category.js";

class CategoryExistException extends BaseException {
	constructor(category, fileName, lineNumber) {
		super(
			"Error: The category exist in the store house. " + category.title,
			fileName,
			lineNumber
		);
		this.name = "CategoryExistException";
		this.category = category;
	}
}

class CategoryNotExistException extends BaseException {
	constructor(category, fileName, lineNumber) {
		super(
			"Error: The category doesn't exist in the store house. " + category.title,
			fileName,
			lineNumber
		);
		this.name = "CategoryNotExistException";
		this.category = category;
	}
}

class CategoryRemoveDefault extends BaseException {
	constructor(category, fileName, lineNumber) {
		super(
			"Error: The category cannot be removed. " + category.title,
			fileName,
			lineNumber
		);
		this.name = "CategoryRemoveDefault";
		this.category = category;
	}
}

class ProductExistException extends BaseException {
	constructor(product, fileName, lineNumber) {
		super(
			"Error: The product exist in the store house. " + product.serial,
			fileName,
			lineNumber
		);
		this.name = "ProductExistException";
		this.product = product;
	}
}

class ProductNotExistException extends BaseException {
	constructor(product, fileName, lineNumber) {
		super(
			"Error: The product doesn't exist in the store house. " + product.serial,
			fileName,
			lineNumber
		);
		this.name = "ProductNotExistException";
		this.product = product;
	}
}

class StoreExistException extends BaseException {
	constructor(store, fileName, lineNumber) {
		super(
			"Error: The store exist in the store house. " + store.name,
			fileName,
			lineNumber
		);
		this.name = "StoreExistException";
		this.store = store;
	}
}

class StoreNotExistException extends BaseException {
	constructor(store, fileName, lineNumber) {
		if (store instanceof Store) store = store.cif;
		super(
			"Error: The store doesn't exist in the store house. " + store,
			fileName,
			lineNumber
		);
		this.name = "StoreNotExistException";
		this.store = store;
	}
}

class NegativeStock extends BaseException {
	constructor(stock, fileName, lineNumber) {
		super(
			"Error: The stock cannot be negative. " + stock,
			fileName,
			lineNumber
		);
		this.name = "NegativeStock";
	}
}

//Declaración objeto StoreHouse mediante patrón Singleton
let StoreHouse = (function () {
	let instantiated;
	function init() {
		//Definimos la clase StoreHouse
		class StoreHouse {
			//Atributos privados
			#name = "Default Name";
			#defaultCategory = new Category("Default");

			//Solución 2

			/*Array de productos
			[{
				produtc: Product
				categories: [Category]
			}]
			*/
			#_products = [];

			/*Array de Categorias
			[Category]
			*/
			#_categories = [];

			/*Array de Tiendas
			[{
				store: Store
				products: [{
					product: Product
					categories: [Category]
					stock: Number
				}]
			}]
			*/
			#_stores = [];

			constructor() {
				//La función se invoca con el operador new
				if (!new.target) throw new InvalidAccessConstructorException();

				//Atributos privados inicializados
				this.#defaultCategory.description = "Default category";
				this.#name = "Default Name";
				this.#_categories.push(this.#defaultCategory);
			}

			//Propiedades de acceso a los atributos privados
			get name() {
				return this.#name;
			}

			set name(value) {
				if (!value) throw new EmptyValueException("name");
				this.#name = value;
			}

			// Métodos privados
			/**
			 * Busca un Category en el array #_categories
			 * @param {Category} value Category a encontrar
			 * @returns Number posicion en el array False no encontrado
			 */
			#findCategory = (value, array) => {
				if (!(value instanceof Category)) throw new InvalidObject();
				let index = 0;
				let isExist = false;
				while (!isExist && index <= array.length - 1) {
					value.title === array[index].title ? (isExist = true) : index++;
				}
				return isExist ? index : false;
			};

			/**
			 * Busca un Product en un array
			 * @param {Product} value Product a encontrar
			 * @param {Array[{product: Product}]} array Array de busqueda
			 * @returns Number posicion en el array False no encontrado
			 */
			#findProduct = (value, array) => {
				if (!(value instanceof Product)) throw new InvalidObject();
				let index = 0;
				let isExist = false;
				while (!isExist && index <= array.length - 1) {
					value.serial === array[index].product.serial
						? (isExist = true)
						: index++;
				}
				return isExist ? index : false;
			};

			/**
			 * Busca un Store en el array _stores
			 * @param {Store} value Store a encontrar
			 * @returns Number posicion en el array False no encontrado
			 */
			#findStore = (value) => {
				if (!(value instanceof Store)) throw new InvalidObject();
				let index = 0;
				let isExist = false;
				while (!isExist && index <= this.#_stores.length - 1) {
					value.cif === this.#_stores[index].store.cif
						? (isExist = true)
						: index++;
				}
				return isExist ? index : false;
			};

			// Métodos públicos
			/* -- Iteradores -- */
			//Iterador de productos
			getProducts(productType = Product) {
				if (!(productType === Product) && !(productType.__proto__ === Product))
					throw InvalidValueException("product", productType);
				let array = [];
				for (let product of this.#_products) {
					if (product.product instanceof productType) {
						let stock = 0;
						for (let store of this.getStores()) {
							let index = store.products.findIndex(
								(item) => item.product.serial === product.product.serial
							);
							if (index !== -1) stock += store.products[index].stock;
						}
						array.push({
							product: product.product,
							categories: product.categories,
							stock: stock,
						});
					}
				}

				return {
					*[Symbol.iterator]() {
						for (let product of array) {
							yield product;
						}
					},
				};
			}

			//Iterador de categorias
			getCategories() {
				let array = this.#_categories;
				return {
					*[Symbol.iterator]() {
						for (let category of array) {
							yield category;
						}
					},
				};
			}

			//Iterador de tiendas
			getStores() {
				let array = this.#_stores;
				return {
					*[Symbol.iterator]() {
						for (let store of array) {
							yield store;
						}
					},
				};
			}

			/**
			 * Pasada una Store dar Products segun Type y su stock
			 * @param {Store} store Store a iterar
			 * @param {Product.prototype} productType Type de los Products
			 * @returns Iterador de objetos {product: Product, stock: Number} Products segun Type y su stock
			 */
			getStoreProducts(store, productType = Product) {
				if (!(store instanceof Store))
					throw InvalidValueException("store", store);
				if (!(productType === Product) && !(productType.__proto__ === Product))
					throw InvalidValueException("product", productType);
				let index = this.#findStore(store);
				if (index === false) throw new StoreNotExistException(store);

				let array = [];

				for (let product of this.#_stores[index].products) {
					if (product.product instanceof productType) {
						array.push({
							product: product.product,
							categories: product.categories,
							stock: product.stock,
						});
					}
				}

				return {
					*[Symbol.iterator]() {
						for (let product of array) {
							yield product;
						}
					},
				};
			}

			/**
			 * Pasada una Category buscar todos los Products segun Type con sus stock en todas las Store
			 * @param {Category} category Category a iterar
			 * @param {Product.prototype} productType Type de los Products
			 * @returns Iterador de objetos {product: Product, stock: Number} Products segun Type y su stock
			 */
			getCategoryProducts(category, productType = Product) {
				if (!(category instanceof Category))
					throw InvalidValueException("category", category);
				if (!(productType === Product) && !(productType.__proto__ === Product))
					throw InvalidValueException("product", productType);
				let idxCtg = this.#findCategory(category, this.#_categories);
				if (idxCtg === false) throw new CategoryNotExistException(category);

				let array = [];
				for (let product of this.#_products) {
					let index = this.#findCategory(
						this.#_categories[idxCtg],
						product.categories
					);
					if (index !== false) {
						if (product.product instanceof productType) {
							let stock = 0;
							for (let store of this.getStores()) {
								index = store.products.findIndex(
									(item) => item.product.serial === product.product.serial
								);
								if (index !== -1) stock += store.products[index].stock;
							}
							array.push({
								product: product.product,
								categories: product.categories,
								stock: stock,
							});
						}
					}
				}

				return {
					*[Symbol.iterator]() {
						for (let product of array) {
							yield product;
						}
					},
				};
			}

			getStoreCategoryProducts(store, category, productType = Product) {
				if (!(store instanceof Store))
					throw InvalidValueException("store", store);
				if (!(category instanceof Category))
					throw InvalidValueException("category", category);
				if (!(productType === Product) && !(productType.__proto__ === Product))
					throw InvalidValueException("product", productType);
				let idxCtg = this.#findCategory(category, this.#_categories);
				if (idxCtg === false) throw new CategoryNotExistException(category);
				let idxStr = this.#findStore(store);
				if (idxStr === false) throw new StoreNotExistException(store);

				let array = [];
				let fullStore = this.#_stores[idxStr];
				for (let product of fullStore.products) {
					let indexCtg = this.#findCategory(this.#_categories[idxCtg], product.categories);
					if (indexCtg !== false) {
						if (product.product instanceof productType) {
							let stock = 0;
							let idxPrt = fullStore.products.findIndex(
								(item) => item.product.serial === product.product.serial
							);
							if (idxPrt !== -1) stock += fullStore.products[idxPrt].stock;
							array.push({
								product: product.product,
								categories: product.categories,
								stock: stock,
							});
						}
					}
				}

				return {
					*[Symbol.iterator]() {
						for (let product of array) {
							yield product;
						}
					},
				};
			}

			/* -- Fin Iteradores -- */

			/**
			 * Buscamos un producto solo con su serial con stock completo, por tienda con stock en propia la Store
			 * @param {String} serial Product a buscar
			 * @param {Store} store Store por la que buscar, o todas
			 * @returns un objeto literal con el producto, sus categorías y su stock
			 */
			getProduct(serial, store = false) {
				let index = this.#_products.findIndex(
					(product) => product.product.serial === serial
				);
				if (index === -1) throw new ProductNotExistException(serial);

				if (store === true) return this.#_products[index].product;

				let stock = 0;

				if (store) {
					if (!(store.store instanceof Store))
						throw InvalidValueException("store", store.store);
					let idxStore = this.#findStore(store.store);
					if (idxStore === false) throw new StoreNotExistException(store.store);

					idxStore = store.products.findIndex(
						(item) => item.product.serial === serial
					);
					stock += store.products[idxStore].stock;
				} else {
					for (let store of this.getStores()) {
						let idxStore = store.products.findIndex(
							(item) => item.product.serial === serial
						);
						if (idxStore !== -1) stock += store.products[idxStore].stock;
					}
				}

				return {
					product: this.#_products[index].product,
					categories: this.#_products[index].categories,
					stock: stock,
				};
			}

			getCategory(title) {
				let index = this.#_categories.findIndex(
					(category) => category.title === title
				);
				if (index === -1) throw new CategoryNotExistException(title);
				return this.#_categories[index];
			}

			getStore(cif) {
				let index = this.#_stores.findIndex((store) => store.store.cif === cif);
				if (index === -1) throw new StoreNotExistException(cif);
				return this.#_stores[index];
			}

			/**
			 * Añade Category
			 * @param {Category} category Category a agregar
			 * @returns tamaño del array
			 */
			addCategory(category) {
				if (!(category instanceof Category))
					throw InvalidValueException("category", category);
				if (this.#findCategory(category, this.#_categories) !== false)
					throw new CategoryExistException(category);

				this.#_categories.push(category);
				return this.#_categories.length;
			}

			/**
			 * Borra Category
			 * @param {Category} category Category a borrar
			 * @returns tamaño del array
			 */
			removeCategory(category) {
				if (!(category instanceof Category))
					throw InvalidValueException("category", category);
				//No podrá borrar Default.
				if (category.title === this.#defaultCategory.title)
					throw new CategoryRemoveDefault(category);
				//Guardar ubicacion o Excepcion
				let index = this.#findCategory(category, this.#_categories);
				if (index === false) throw new CategoryNotExistException(category);

				for (let product of this.#_products) {
					let indexProd = product.categories.findIndex(
						(item) => item.title === category.title
					);
					if (indexProd !== -1) product.categories.splice(indexProd, 1);
					if (product.categories.length === 0)
						product.categories.push(this.#defaultCategory);
				}

				this.#_categories.splice(index, 1);
				return this.#_categories.length;
			}

			/**
			 * Añadir Product
			 * @param {Product} product Product a añadir
			 * @param  {...Category} categories Category a añadir (tantas como haya en StoreHouse)
			 * @returns tamaño del array
			 */
			addProduct(product, ...categories) {
				if (!(product instanceof Product))
					throw InvalidValueException("product", product);
				if (this.#findProduct(product, this.#_products) !== false)
					throw new ProductExistException(product);

				if (Array.isArray(categories[0])) categories = categories[0];

				//Set por si repite la categoría
				let arrayCategories = new Set();

				if (categories.length === 0) {
					//No tenemos ninguna, le asignamos Default
					arrayCategories.add(this.#defaultCategory);
				} else {
					//Guardamos Categorias en el array
					for (let category of categories) {
						//Validamos todas
						if (!(category instanceof Category))
							throw InvalidValueException("category", category);
						if (this.#findCategory(category, this.#_categories) === false)
							throw new CategoryNotExistException(category);
						arrayCategories.add(category);
					}
				}

				//Pasamos el Set a un Array
				this.#_products.push({
					product: product,
					categories: Array.from(arrayCategories),
				});
				return this.#_products.length;
			}

			/**
			 * Borra un Product
			 * @param {Product} product Product a borrar
			 * @returns tamaño del array
			 */
			removeProduct(product) {
				if (!(product instanceof Product))
					throw InvalidValueException("product", product);
				//Guardar ubicacion o Excepcion
				let index = this.#findProduct(product, this.#_products);
				if (index === false) throw new ProductNotExistException(product);

				//Lo borramos tambíen de las tiendas
				for (let store of this.getStores()) {
					let indexStore = store.products.findIndex(
						(item) => item.product.serial === product.serial
					);
					if (indexStore !== -1) store.products.splice(indexStore, 1);
				}

				this.#_products.splice(index, 1);
				return this.#_products.length;
			}

			/**
			 * Añade Product a una Store
			 * @param {Product} product Product a añadir
			 * @param {Store} store Store a la que se le añade el Product
			 * @param {Number} stock Number que tiene a la venta
			 * @returns tamaño del array
			 */
			addProductInStore(product, store, stock = 0) {
				let indexStore = this.#findStore(store);
				if (indexStore === false) throw new StoreNotExistException(store);
				let indexProd = this.#findProduct(product, this.#_products);
				if (indexProd === false) throw new ProductNotExistException(product);
				if (this.#findProduct(product, this.#_stores[indexStore].products) !== false)
					throw new ProductExistException(product);

				if (stock === "") stock = 0;
				stock = parseInt(stock);
				if (stock < 0) throw new NegativeStock(stock);
				let newProd = Object.assign({}, this.#_products[indexProd]);
				newProd.stock = stock;
				this.#_stores[indexStore].products.push(newProd);
				return this.#_stores[indexStore].products.length;
			}

			/**
			 * Añadimos stock dado un Product y su Store
			 * @param {Product} product Product a amliar stock
			 * @param {Store} store Store a ampliar stock de su Product
			 * @param {Number} stock Number para aumentar Product a la venta
			 * @returns Number del nuevo stock
			 */
			addQuantityProductInStore(product, store, stock = 1) {
				let indexStore = this.#findStore(store);
				if (indexStore === false) throw new StoreNotExistException(store);
				let indexProd = this.#findProduct(
					product,
					this.#_stores[indexStore].products
				);
				if (indexProd === false) throw new ProductNotExistException(product);
				stock = parseInt(stock);
				if (stock < 0) throw new NegativeStock(stock);

				this.#_stores[indexStore].products[indexProd].stock += stock;
				return this.#_stores[indexStore].products[indexProd].stock;
			}

			/**
			 * Añadir Store
			 * @param {Store} store Store a añadir
			 * @returns tamaño del array
			 */
			addStore(store) {
				if (!(store instanceof Store))
					throw InvalidValueException("store", store);
				if (this.#findStore(store) !== false)
					throw new StoreExistException(store);

				this.#_stores.push({ store: store, products: [] });
				return this.#_stores.length;
			}

			/**
			 * Borrar Store
			 * @param {*} store Store a borrar
			 * @returns tamaño del array
			 */
			removeStore(store) {
				if (!(store instanceof Store))
					throw InvalidValueException("store", store);
				let index = this.#findStore(store);
				if (index === false) throw new StoreNotExistException(store);

				this.#_stores.splice(index, 1);
				return this.#_stores.length;
			}
		}
		Object.defineProperty(StoreHouse.prototype, "name", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "_categories", {
			enumerable: true,
		});
		Object.defineProperty(StoreHouse.prototype, "_stores", {
			enumerable: true,
		});
		Object.defineProperty(StoreHouse.prototype, "_products", {
			enumerable: true,
		});

		let sh = new StoreHouse();
		Object.freeze(sh);
		return sh;
	}

	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		},
	};
})();

export {
	CategoryExistException,
	CategoryNotExistException,
	CategoryRemoveDefault,
	ProductExistException,
	ProductNotExistException,
	StoreExistException,
	StoreNotExistException,
	NegativeStock,
};
export default StoreHouse;
export {
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException,
};
export { Product, Book, Music, Monitor };
export { Store };
export { Coords };
export { Category };
