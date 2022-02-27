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

	#loadStorehouseObjects() {
		let storeHouse = this.#storehouse;

		//Nombre
		storeHouse.name = "Almacén Sergio";

		//10 Category nuevas
		let category1 = new Category("Super Ventas");
		let category2 = new Category("+3");
		let category3 = new Category("Digital");
		let category4 = new Category("Vintage");
		let category5 = new Category("Gran obra");
		let category6 = new Category("Bajo Precio");
		let category7 = new Category("Juvenil");
		let category8 = new Category("Novedad");
		let category9 = new Category("Utilidad");
		let category10 = new Category("Pasa Tiempo");
		category1.description = "Los más vendido";
		category2.description = "Para todos los publicos";
		category3.description = "Moderno";
		category4.description = "Antiguo";
		category5.description = "Muy premiado";
		category6.description = "Baratos";
		category7.description = "Difundido entre los adolescentes";
		category8.description = "Nuevo";
		category9.description = "Calidad de vida";
		category10.description = "Ocio";

		storeHouse.addCategory(category1);
		storeHouse.addCategory(category2);
		storeHouse.addCategory(category3);
		storeHouse.addCategory(category4);
		storeHouse.addCategory(category5);
		storeHouse.addCategory(category6);
		storeHouse.addCategory(category7);
		storeHouse.addCategory(category8);
		storeHouse.addCategory(category9);
		storeHouse.addCategory(category10);

		//15 Products nuevos
		//5 Book nuevos
		let book1 = new Book("111-11-1111-111-1", "Biblie", 55, null, ["book1Front.jpg", "book1Reverse.jpg"], "San Pablo", "Marcos el Evangelista", "EN", "Libro Sagrado", 1);
		let book2 = new Book("222-22-2222-222-2", "Don Quijote de la Mancha", 34.99, null, ["book2Front.jpg", "book2Reverse.jpg"], "Cátedra", "Miguel de Cerbantes", "ES", "Novela", 1);
		let book3 = new Book("333-33-3333-333-3", "Harry Potter y el Prisionero de Azkaban", 17, null, ["book3Front.jpg"], "Salamandra", "J.K. Rowling", "ES", "Ciencia Ficción", 3);
		let book4 = new Book("444-44-4444-444-4", "Viaje en el tiempo 5 (Geronimo Stilton)", 18.95, null, ["book4Front.jpg", "book4Reverse.jpg"], "Destino", "Elisabetta Dami", "ES", "Humor y avenura", 5);
		let book5 = new Book("555-55-5555-555-5", "La Cocina de tu Vida", 24, null, ["book5Front.jpg"], "Planeta", "Karlos Arguiñano", "ES", "Hogar", 1);

		//5 Music nuevos
		let music1 = new Music("Mc-1", "Wrecked", 3, null, ["disk1Front.jpg"], "Imagine Dragons", "Indie", "4:04", new Date());
		let music2 = new Music("Mc-2", "Rime of the Ancient Mariner", 2.5, null, ["disk2Front.jpg"], "Iron Maiden", "Heavy Metal", "13:38", new Date());
		let music3 = new Music("Mc-3", "Pigstep", 2, null, ["disk3Front.jpg", "disk3.jpg"], "Lena Raine", "Electronica", "2:29", new Date());
		let music4 = new Music("Mc-4", "Fiddler on the Green", 1.5, null, ["disk4Front.jpg"], "Demons & Wizards", "Metal progresivo", "5:56", new Date());
		let music5 = new Music("Mc-5", "Stressed Out", 3.5, null, ["disk5Front.jpg"], "Twenty One Pilots", "Hip-Hop/Rap", "3:22", new Date());

		//5 Monitor nuevos
		let monitor1 = new Monitor("Mtr-1", "Lenovo D24-20", 119.99, null, ["monitor1.jpg", "monitor1Inputs.jpg"], "Lenovo", "75Hz", '23.8"', "Negro", ["HDMI", "VGA"], "Flat");
		let monitor2 = new Monitor("Mtr-2", "MSI Optix MAG272CQR", 399, null, ["monitor2.jpg"], "MSI", "165Hz", '27"', "Negro", ["DP", "HDMI"], "Curved");
		let monitor3 = new Monitor("Mtr-3", "Xiaomi Mi GL WQHD", 490, null, ["monitor3.jpg"], "Xiaomi", "144Hz", '34"', "Negro", ["DP", "HDMI"], "Curved");
		let monitor4 = new Monitor("Mtr-4", "LG 29WN600-W", 245, null, ["monitor4.jpg"], "LG", "75Hz", '29"', "Gris", ["DP", "HDMI"], "Flat");
		let monitor5 = new Monitor("Mtr-5", "Odyssey G9", 1499, null, ["monitor5.jpg", "monitor5Inputs.jpg"], "Samsung", "240Hz", '49"', "Negro", ["HDMI"], "Curved");

		storeHouse.addProduct(book1, category1, category4, category5);
		storeHouse.addProduct(book2, category1, category4, category5, category10);
		storeHouse.addProduct(book3, category2, category6, category7, category8, category10);
		storeHouse.addProduct(book4);
		storeHouse.addProduct(book5, category1, category2, category6, category8, category9);
		storeHouse.addProduct(music1, category1, category3, category5, category7, category8, category10);
		storeHouse.addProduct(music2);
		storeHouse.addProduct(music3, category2, category3, category5, category7, category8, category10);
		storeHouse.addProduct(music4, category3, category4, category5, category6, category7, category10);
		storeHouse.addProduct(music5, category1, category2, category3, category5, category7, category8, category10);
		storeHouse.addProduct(monitor1, category6, category8, category9);
		storeHouse.addProduct(monitor2, category1, category7, category8, category9);
		storeHouse.addProduct(monitor3, category6, category8, category9);
		storeHouse.addProduct(monitor4);
		storeHouse.addProduct(monitor5, category7, category8, category9);

		//5 Store nuevas
		let store1 = new Store("A - 11111111", "Sweet Home", "C/Ejemplos 12", "111 11 11 11", new Coords(62, 72));
		let store2 = new Store("B - 22222222", "Troy-Anne", "C/Ejemplos 23", "222 222 222", new Coords(56, 0));
		let store3 = new Store("C - 33333333", "Geekpool", "Av/Ejemplo 34", "333 33 33 33", new Coords(42.6453, 45));
		let store4 = new Store("D - 44444444", "HighSound", "C/Ejemplos 45", "444 444 444", new Coords(-67, -165));
		let store5 = new Store("E - 55555555", "El Emporio", "Av/Ejemplo 56", "555 55 55 55", new Coords(-28.6783, 134));

		storeHouse.addStore(store1);
		storeHouse.addStore(store2);
		storeHouse.addStore(store3);
		storeHouse.addStore(store4);
		storeHouse.addStore(store5);

		storeHouse.addProductInStore(book1, store1, 2);
		storeHouse.addProductInStore(book2, store1, 23);
		storeHouse.addProductInStore(monitor2, store1, 45);
		storeHouse.addProductInStore(monitor4, store1);
		storeHouse.addProductInStore(music5, store1, 4);

		storeHouse.addProductInStore(book3, store2, 75);
		storeHouse.addProductInStore(music2, store2);
		storeHouse.addProductInStore(monitor1, store2, 23);

		storeHouse.addProductInStore(music1, store3, 234);
		storeHouse.addProductInStore(monitor3, store3, 54);
		storeHouse.addProductInStore(music3, store3);
		storeHouse.addProductInStore(book4, store3, 65);
		storeHouse.addProductInStore(monitor4, store3, 36);
		storeHouse.addProductInStore(music4, store3, 76);
		storeHouse.addProductInStore(monitor5, store3, 24);

		storeHouse.addProductInStore(music1, store4, 80);
		storeHouse.addProductInStore(monitor1, store4, 42);

		storeHouse.addProductInStore(book1, store5, 23);
		storeHouse.addProductInStore(book2, store5, 63);
		storeHouse.addProductInStore(book3, store5, 27);
		storeHouse.addProductInStore(book4, store5, 45);
		storeHouse.addProductInStore(book5, store5);
		storeHouse.addProductInStore(music1, store5, 34);
		storeHouse.addProductInStore(music2, store5, 75);
		storeHouse.addProductInStore(music3, store5, 3);
		storeHouse.addProductInStore(music4, store5);
		storeHouse.addProductInStore(music5, store5, 87);
		storeHouse.addProductInStore(monitor1, store5, 9);
		storeHouse.addProductInStore(monitor2, store5, 3);
		storeHouse.addProductInStore(monitor3, store5, 4);
		storeHouse.addProductInStore(monitor4, store5, 37);
		storeHouse.addProductInStore(monitor5, store5);
	}

	constructor(model, view) {
		this.#storehouse = model;
		this.#storehouseView = view;

		this.onLoad();
		this.onInit();

		this.#storehouseView.bindInit(this.handleInit);
		this.#storehouseView.bindProductsTypeList(this.handleProductsTypeList);
		this.#storehouseView.bindProductsCategoryList(this.handleProductsCategoryList);
		this.#storehouseView.bindProductsStoreList(this.handleProductsStoreList);
	}

	onLoad = () => {
		this.#loadStorehouseObjects();
		this.#storehouseView.rename(this.#storehouse.name);
		this.onAddStore();
		this.onAddCategory();
		this.onAddProduct();
	}

	onInit = () => {
		this.#storehouseView.reset();
	}

	handleInit = () => {
		this.onInit();
	}

	onAddStore = () => {
		this.#storehouseView.showStores(this.#storehouse.getStores());
	}

	onAddCategory = () => {
		this.#storehouseView.showCategoriesInMenu(this.#storehouse.getCategories());
	}

	onAddProduct = () => {
		this.#storehouseView.showProductsInMenu("Libro", "Música", "Monitor");
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

	handleShowProductInNewWindow = (serial, cif) => {
		try {
			let store = cif == "false" ? false : this.#storehouse.getStore(cif);
			let product = this.#storehouse.getProduct(serial, store);

			this.#storehouseView.showProductInNewWindow(product, this.#instance++);
		} catch (error) {
			this.#storehouseView.showProductInNewWindow(null, 'No existe este producto en la página.');
		}
	}
}

export default StorehouseController;
