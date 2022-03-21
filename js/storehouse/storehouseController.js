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

class StorehouseController {
	//Campos privados
	#storehouse;
	#storehouseView;
	#instance = 0;
	#auth;
	#user;

	#loadStorehouseObjects() {
		let storeHouse = this.#storehouse;
		storeHouse.name = "Almacén Sergio";

		$.ajax({
			url: "js/data.json",
			method: 'GET',
			async: true
		}).done((data) => {
			for (let category of data.categories) {
				let auxCtgr = new Category(category.title);
				auxCtgr.description = category.description;
				storeHouse.addCategory(auxCtgr);
			}
			for (let product of data.products.Book) {
				let auxPrd = new Book(product.serial, product.name, product.price, product.tax, product.images, product.editorial, product.author, product.lenguage, product.genre, product.volume);
				let auxCtgrs = [];
				for (let title of product.categories) auxCtgrs.push(storeHouse.getCategory(title));
				storeHouse.addProduct(auxPrd, auxCtgrs);
			}
			for (let product of data.products.Music) {
				let auxPrd = new Music(product.serial, product.name, product.price, product.tax, product.images, product.band, product.genre, product.length, new Date(product.date));
				let auxCtgrs = [];
				for (let title of product.categories) auxCtgrs.push(storeHouse.getCategory(title));
				storeHouse.addProduct(auxPrd, auxCtgrs);
			}
			for (let product of data.products.Monitor) {
				let auxPrd = new Monitor(product.serial, product.name, product.price, product.tax, product.images, product.brand, product.refreshRate, product.size, product.color, product.inputType, product.screenType);
				let auxCtgrs = [];
				for (let title of product.categories) auxCtgrs.push(storeHouse.getCategory(title));
				storeHouse.addProduct(auxPrd, auxCtgrs);
			}
			for (let store of data.stores) {
				let auxStr = new Store(store.cif, store.name, store.address, store.phone, new Coords(store.coords.latitude, store.coords.longitude));
				storeHouse.addStore(auxStr);
				for (let product of store.products) storeHouse.addProductInStore(storeHouse.getProduct(product.product, true), auxStr, product.stock);
			}
		});
	}

	constructor(model, view, auth) {
		this.#storehouse = model;
		this.#storehouseView = view;
		this.#auth = auth;
		this.#user = null;

		this.onLoad();

		setTimeout(() => {
			this.onInit();
			this.#storehouseView.bindInit(this.handleInit);
		}, 100);

	}

	onLoad = () => {
		this.#loadStorehouseObjects();

		this.#storehouseView.rename(this.#storehouse.name);

		if (getCookie('mialmacenSLGCookies') !== 'true') {
			this.#storehouseView.showCookiesMessage();
		}
		let userCookie = getCookie('mialmacenSLGActiveUser');
		if (userCookie) {
			let user = this.#auth.getUser(userCookie);
			if (user) {
				this.#user = this.#auth.getUser(userCookie);
				setTimeout(() => {
					this.onOpenSession(false);
				}, 100);
			}
		} else {
			this.onCloseSession();
		}
	}

	onInit = () => {
		this.onAddStore();
		this.onAddProduct();
		this.onAddCategory();
		this.#storehouseView.reset();
	}

	handleInit = () => {
		this.onInit();
	}

	onAddStore = () => {
		this.#storehouseView.showStores(this.#storehouse.getStores());
		this.#storehouseView.bindProductsStoreList(this.handleProductsStoreList);
	}

	onAddStoreForm = () => {
		this.onAddStore();
		this.handleRemoveStoreForm();
		this.handleStockForm();
	}

	onAddCategory = () => {
		this.#storehouseView.showCategoriesInMenu(this.#storehouse.getCategories());
		this.#storehouseView.bindProductsCategoryList(this.handleProductsCategoryList);
	}

	onAddCategoryForm = () => {
		this.onAddCategory();
		this.handleRemoveCategoryForm();
		this.handleNewProductForm();
	}

	onAddProduct = () => {
		this.#storehouseView.showProductsInMenu("Libro", "Música", "Monitor");
		this.#storehouseView.bindProductsTypeList(this.handleProductsTypeList);
	}

	onAddProductForm = () => {
		this.onAddProduct();
		this.handleRemoveProductForm();
		this.handleStockForm();
	}

	onAddStockForm = () => {
		this.handleStockForm();
	}

	onAddAdminForm = () => {
		this.#storehouseView.showAdminInMenu();
		this.#storehouseView.bindAdminBackup(this.handleAdminBackup)
	}

	handleProductsCategoryList = (title) => {
		let category = this.#storehouse.getCategory(title);
		this.#storehouseView.listProducts(this.#storehouse.getCategoryProducts(category), "Categoría - " + category.title);
		this.#storehouseView.bindShowProduct(this.handleShowProduct);
	}

	handleFilterStoreCategory = (title, cif) => {
		let category = this.#storehouse.getCategory(title);
		let store = this.#storehouse.getStore(cif);
		this.#storehouseView.listProducts(this.#storehouse.getStoreCategoryProducts(store.store, category), store.store.name + " - " + category.title, store);
		this.#storehouseView.bindFilterStoreCategory(this.handleFilterStoreCategory);
		this.#storehouseView.bindShowProduct(this.handleShowProduct);
	}

	handleProductsStoreList = (cif) => {
		let store = this.#storehouse.getStore(cif);
		this.#storehouseView.listProducts(this.#storehouse.getStoreProducts(store.store), store.store.name, store);
		this.#storehouseView.bindShowProduct(this.handleShowProduct);
		this.#storehouseView.bindFilterStoreCategory(this.handleFilterStoreCategory);
	}

	handleProductsTypeList = (type) => {
		let instance = {
			Libro: Book,
			Música: Music,
			Monitor: Monitor,
		}
		if (instance[type]) {
			this.#storehouseView.listProducts(this.#storehouse.getProducts(instance[type]), type);
		} else {
			throw new Error(`${type} isn't a type of Product.`)
		}
		this.#storehouseView.bindShowProduct(this.handleShowProduct);
	}

	handleShowProduct = (serial, cif) => {
		try {
			let store = cif == "false" ? false : this.#storehouse.getStore(cif);
			let product = this.#storehouse.getProduct(serial, store);

			this.#storehouseView.showProduct(product, cif, this.#instance++);
			this.#storehouseView.bindProductToCategory(this.handleProductsCategoryList);
			this.#storehouseView.bindShowProductInNewWindow(this.handleShowProductInNewWindow);
		} catch (error) {
			this.#storehouseView.showProduct('No existe este producto en la página.');
		}
	}

	handleShowProductInNewWindow = (serial, cif, position) => {
		try {
			let store = cif == "false" ? false : this.#storehouse.getStore(cif);
			let product = this.#storehouse.getProduct(serial, store);

			this.#storehouseView.showProductInNewWindow(product, this.#instance++, position);
		} catch (error) {
			this.#storehouseView.showProductInNewWindow(null, 'No existe este producto en la página.');
		}
	}

	handleNewStoreForm = () => {
		this.#storehouseView.showStoreFroms();
		this.#storehouseView.bindNewStoreForm(this.handleCreateStore);
	}

	handleCreateStore = (cif, name, address, phone, latitude, longitude) => {
		let coords = new Coords(latitude, longitude);
		let store;
		let done, error;

		try {
			store = new Store(cif, name, address, phone, coords);
			done = true;
			try {
				this.#storehouse.addStore(store);
				done = true;
				this.onAddStoreForm();
			} catch (exception) {
				done = false;
				error = exception;
			}
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showNewStoreModal(done, store, error);
	}

	handleRemoveStoreForm = () => {
		this.#storehouseView.showRemoveStoreForm(this.#storehouse.getStores());
		this.#storehouseView.bindRemoveStoreForm(this.handleDeleteStore);
	}

	handleDeleteStore = (cif) => {
		let store = this.#storehouse.getStore(cif);
		let done, error;

		try {
			this.#storehouse.removeStore(store.store);
			done = true;
			this.onAddStoreForm();
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showRemoveStoreModal(done, cif, error);
	}

	handleNewProductForm = () => {
		this.#storehouseView.showCreateProductForm(this.#storehouse.getCategories());
		this.#storehouseView.bindNewProductForm(this.handleCreateProduct);
		this.#storehouseView.resetProductForm();
	}

	handleCreateProduct = (type, serial, name, price, tax, images, categoriesName, ...args) => {
		let product;
		let done, error;

		try {
			if (type === "Book") product = new Book(serial, name, price, tax, images, args[0], args[1], args[2], args[3], args[4]);
			else if (type === "Music") product = new Music(serial, name, price, tax, images, args[0], args[1], args[2]);
			else if (type === "Monitor") product = new Monitor(serial, name, price, tax, images, args[0], args[1], args[2], args[3], args[4]);

			let categories = [];
			for (let name of categoriesName) {
				categories.push(this.#storehouse.getCategory(name));
			}
			done = true;
			try {
				this.#storehouse.addProduct(product, categories);
				done = true;
				this.onAddProductForm();
			} catch (exception) {
				done = false;
				error = exception;
			}
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showNewProductModal(done, serial, error);
	}

	handleRemoveProductForm = () => {
		this.#storehouseView.showRemoveProductForm(this.#storehouse.getProducts());
		this.#storehouseView.bindRemoveProductForm(this.handleDeleteProduct);
	}

	handleDeleteProduct = (serial) => {
		let product = this.#storehouse.getProduct(serial);
		let done, error;

		try {
			this.#storehouse.removeProduct(product.product);
			done = true;
			this.onAddProductForm();
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showRemoveProductModal(done, serial, error);
	}

	handleNewCategoryForm = () => {
		this.#storehouseView.showCategoryFroms();
		this.#storehouseView.bindNewCategoryForm(this.handleCreateCategory);
	}

	handleCreateCategory = (title, description = title) => {
		let category;
		let done, error;

		try {
			category = new Category(title);
			category.description = description;
			done = true;
			try {
				this.#storehouse.addCategory(category);
				done = true;
				this.onAddCategoryForm();
			} catch (exception) {
				done = false;
				error = exception;
			}
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showNewCategoryModal(done, title, error);
	}

	handleRemoveCategoryForm = () => {
		this.#storehouseView.showRemoveCategoryForm(this.#storehouse.getCategories());
		this.#storehouseView.bindRemoveCategoryForm(this.handleDeleteCategory);
		this.#storehouseView.resetProductForm();
	}

	handleDeleteCategory = (title) => {
		let category = this.#storehouse.getCategory(title);
		let done, error;

		try {
			this.#storehouse.removeCategory(category);
			done = true;
			this.onAddCategoryForm();
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showRemoveCategoryModal(done, title, error);
	}

	handleAddStockForm = () => {
		this.#storehouseView.showStockFroms(this.handleStockStore);
		this.#storehouseView.bindAddStockForm(this.handleCreateStock);
		this.#storehouseView.bindRemoveStockForm(this.handleDeleteStock);
	}

	handleStockStore = (cif) => {
		let store = this.#storehouse.getStore(cif);
		this.#storehouseView.showRemoveStockForm(this.#storehouse.getStoreProducts(store.store));
	}

	handleCreateStock = (serial, cif, stock) => {
		let product, store, type;
		let isExist = false;
		let done, error;

		try {
			product = this.#storehouse.getProduct(serial);
			store = this.#storehouse.getStore(cif);
			product = product.product;
			store = store.store;

			if (product instanceof Book) type = Book;
			if (product instanceof Music) type = Music;
			if (product instanceof Monitor) type = Monitor;

			for (let productStore of this.#storehouse.getStoreProducts(store, type)) {
				productStore = productStore.product;
				if (productStore.serial == serial) isExist = true;
			}

			isExist
				? this.#storehouse.addQuantityProductInStore(product, store, stock)
				: this.#storehouse.addProductInStore(product, store, stock);

			this.onAddStockForm();
			done = true;

		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showAddStockModal(done, isExist ? "han añadido" : "han creado", store.name, product.name, stock, error);
	}

	handleDeleteStock = (serial, cif) => {
		let product, store;
		let done, error;

		try {
			product = this.#storehouse.getProduct(serial);
			store = this.#storehouse.getStore(cif);
			product = product.product;
			store = store.store;

			this.#storehouse.removeProductStore(store, product);

			this.onAddStockForm();
			done = true;
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#storehouseView.showRemoveStockModal(done, store.name, product.name, error);
	}

	handleStockForm = () => {
		this.#storehouseView.showStockStoreForm(this.#storehouse.getStores());
		this.#storehouseView.showStockProductForm(this.#storehouse.getProducts());
	}

	handleLoginForm = () => {
		this.#storehouseView.showLogin();
		this.#storehouseView.bindLogin(this.handleLogin);
	}

	handleLogin = (username, password, remember) => {
		if (this.#auth.validateUser(username, password)) {
			this.#user = this.#auth.getUser(username);
			this.onOpenSession(true);
			this.onInit();
			if (remember) {
				this.#storehouseView.setUserCookie(this.#user);
			}
		} else {
			this.#storehouseView.showInvalidUserMessage();
		}
	}

	onOpenSession(isNewSession) {
		this.handleNewStoreForm();
		this.#storehouseView.showProductFroms();
		this.handleNewCategoryForm();
		this.handleAddStockForm();
		this.onAddStoreForm();
		this.onAddProductForm();
		this.onAddCategoryForm();
		this.onAddStockForm();
		this.onAddAdminForm();
		if (isNewSession)
			this.#storehouseView.hideUserLogIn();
		this.#storehouseView.showAuthUserProfile(this.#user);
		this.#storehouseView.showValidUserMessage(this.#user, isNewSession);
		this.#storehouseView.bindCloseSession(this.handleCloseSession);
		this.#storehouseView.initHistory();
	}

	onCloseSession() {
		this.#user = null;
		this.#storehouseView.deleteUserCookie();
		this.#storehouseView.showIdentificationLink();
		this.#storehouseView.bindIdentificationLink(this.handleLoginForm);
		this.#storehouseView.removeAdminMenu();
	}

	handleCloseSession = () => {
		this.onCloseSession();
	}

	handleAdminBackup = () => {
		let string;
		let categoriesJSON = [];
		let productsJSON = [];
		let storesJSON = [];

		for (const category of this.#storehouse.getCategories()) {
			let categoryObject = {
				title: category.title,
				description: category.description
			}
			categoriesJSON.push(categoryObject);
		}
		string += JSON.stringify({ "categories": categoriesJSON });

		for (const product of this.#storehouse.getProducts()) {
			let productObject = {
				serial: product.product.serial,
				name: product.product.name,
				price: product.product.price,
				tax: product.product.tax,
				images: [],
			};

			for (let img of product.product.images) productObject.images.push(img);

			if (product.product instanceof Book) {
				productObject.editorial = product.product.editorial;
				productObject.author = product.product.author;
				productObject.lenguage = product.product.lenguage;
				productObject.genre = product.product.genre;
				productObject.volume = product.product.volume;

			} else if (product.product instanceof Music) {
				productObject.band = product.product.band;
				productObject.genre = product.product.genre;
				productObject.length = product.product.length;
				productObject.date = product.product.date;

			} else if (product.product instanceof Monitor) {
				productObject.brand = product.product.brand;
				productObject.refreshRate = product.product.refreshRate;
				productObject.size = product.product.size;
				productObject.color = product.product.color;
				productObject.inputType = [];
				productObject.screenType = product.product.screenType;
				for (let input of product.product.inputType) productObject.inputType.push(input);
			}

			productObject.categories = [];
			for (let category of product.categories) productObject.categories.push(category.title);

			productsJSON.push(productObject);
		}
		string += JSON.stringify({ "products": productsJSON });

		for (const store of this.#storehouse.getStores()) {
			let storeObject = {
				cif: store.store.cif,
				name: store.store.name,
				address: store.store.address,
				phone: store.store.phone,
				coords: {
					latitude: store.store.coords.latitude,
					longitude: store.store.coords.longitude
				},
				products: []
			};
			for (let product of store.products) {
				storeObject.products.push({
					product: product.product.serial,
					stock: product.stock
				});
			}
			storesJSON.push(storeObject);
		}
		string += JSON.stringify({ "stores": storesJSON });

		this.#storehouseView.saveDataFromStoreHouse(string);
	}

}

export default StorehouseController;
