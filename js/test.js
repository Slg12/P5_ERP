"use strict";
import StoreHouse from "./storehouse/storehouse.js";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./storehouse/storehouse.js";
import {
  CategoryExistException,
  CategoryNotExistException,
  CategoryRemoveDefault,
  ProductExistException,
  ProductNotExistException,
  StoreExistException,
  StoreNotExistException,
  NegativeStock
} from "./storehouse/storehouse.js";

import { Product, Book, Music, Monitor } from "./storehouse/storehouse.js";
import { Coords } from "./storehouse/storehouse.js";
import { Store } from "./storehouse/storehouse.js";
import { Category } from "./storehouse/storehouse.js";

//Crear variables de apoyo
//Inicializar StoreHouse
let storeHouse = StoreHouse.getInstance();

//10 Category nuevas
let category1 = new Category("C1-Super Ventas");
let category2 = new Category("C2-Para todos los publicos");
let category3 = new Category("C3-Digital");
let category4 = new Category("C4-Analogico");
let category5 = new Category("C5-Gran obra");
let category6 = new Category("C6-Bajo Precio");
let category7 = new Category("C7-Juvenil");
let category8 = new Category("C8-Novedad");
let category9 = new Category("C9-Utilidad");
let category10 = new Category("C10-Pasa Tiempo");

//15 Products nuevos
//5 Book nuevos
let book1 = new Book("111-11-1111-111-1", "Biblie", 55, null, ["book1Front.jpg", "book1Reverse.jpg"], "San Pablo", "Marcos el Evangelista", "EN", "Libro Sagrado", 1);
let book2 = new Book("222-22-2222-222-2", "Don Quijote de la Mancha", 34.99, null, ["book2Front.jpg", "book2Reverse.jpg"], "Catedra", "Miguel de Cerbantes", "ES", "Novela", 1);
let book3 = new Book("333-33-3333-333-3", "Harry Potter y el Prisionero de Azkaban", 17, null, ["book3Front.jpg", "book3Reverse.jpg"], "Salamandra", "J.K. Rowling", "ES", "Ciencia Ficción", 3);
let book4 = new Book("444-44-4444-444-4", "Viaje en el tiempo 5 (Geronimo Stilton)", 18.95, null, ["book4Front.jpg", "book4Reverse.jpg"], "Destino", "Elisabetta Dami", "ES", "Humor y avenura", 5);
let book5 = new Book("555-55-5555-555-5", "La Cocina de tu Vida", 24, null, ["book5Front.jpg", "book5Reverse.jpg"], "Planeta", "Karlos Arguiñano", "ES", "Hogar", 1);

//6 Music nuevos
let music1 = new Music("Mc-1", "Wrecked", 3, null, ["disk1Front.jpg", "disk1.jpg"], "Imagine Dragons", "Indie", "4:04", new Date());
let music2 = new Music("Mc-2", "Rime of the Ancient Mariner", 2.5, null, ["disk2Front.jpg", "disk2.jpg"], "Iron Maiden", "Heavy Metal", "13:38", new Date());
let music3 = new Music("Mc-3", "Pigstep", 2, null, ["disk3Front.jpg", "disk3.jpg"], "Lena Raine", "Electronic", "2:29", new Date());
let music4 = new Music("Mc-4", "Ave María", 1.5, null, ["disk4Front.jpg", "disk4.jpg"], "David Bisbal", "Pop", "3:29", new Date());
let music5 = new Music("Mc-5", "Stressed Out", 3.5, null, ["disk5Front.jpg", "disk5.jpg"], "Twenty One Pilots", "Hip-Hop/Rap", "3:22", new Date());
let music6 = new Music("Mc-6", "Opa", 1, null, ["disk5Front.jpg", "disk5.jpg"], "El Koala", "Country", "2:32", new Date());

//5 Monitor nuevos
let monitor1 = new Monitor("Mtr-1", "Lenovo D24-20", 119.99, null, ["monitor1.jpg", "monitor1Inputs.jpg"], "Lenovo", "75Hz", '23.8"', "Negro", ["HDMI", "VGA"], "Flat");
let monitor2 = new Monitor("Mtr-2", "MSI Optix MAG272CQR", 399, null, ["monitor2.jpg", "monitor2Inputs.jpg"], "MSI", "165Hz", '27"', "Negro", ["DP", "HDMI"], "Curved");
let monitor3 = new Monitor("Mtr-3", "Xiaomi Mi GL WQHD", 490, null, ["monitor3.jpg", "monitor3Inputs.jpg"], "Xiaomi", "144Hz", '34"', "Negro", ["DP", "HDMI"], "Curved");
let monitor4 = new Monitor("Mtr-4", "LG 29WN600-W", 245, null, ["monitor4.jpg", "monitor4Inputs.jpg"], "LG", "75Hz", '29"', "Gris", ["DP", "HDMI"], "Flat");
let monitor5 = new Monitor("Mtr-5", "Odyssey G9", 1499, null, ["monitor5.jpg", "monitor5Inputs.jpg"], "Samsung", "240Hz", '49"', "Negro", ["HDMI"], "Curved");

//6 Store nuevas
let store1 = new Store("A - 11111111", "Store 1", "C/Ejemplos 12", "111 11 11 11", new Coords(62, 72));
let store2 = new Store("B - 22222222", "Store 2", "C/Ejemplos 23", "222 222 222", new Coords(56, 0));
let store3 = new Store("C - 33333333", "Store 3", "Av/Ejemplo 34", "333 33 33 33", new Coords(42.6453, 45));
let store4 = new Store("D - 44444444", "Store 4", "C/Ejemplos 45", "444 444 444", new Coords(-67, -165));
let store5 = new Store("E - 55555555", "Store 5", "Av/Ejemplo 56", "555 55 55 55", new Coords(-28.6783, 134));
let store6 = new Store("F - 66666666", "Store 6", "Av/Ejemplo 67", "666 666 666", new Coords(-8.382, 14));

// storeHouse.getStoresProducts(store1, Music);
// console.log(Music.__proto__ == Product);
// storeHouse.addCategory(category1);
// try {
//   storeHouse.addCategory(category1);
// } catch (e) {
//   console.log(e.message);
// }
// storeHouse.removeCategory(category1);
// try {
//   storeHouse.removeCategory(category1);
// } catch (e) {
//   console.log(e.message);
// }

// function testPaco() {
//   console.log("paco");
// }

// function testStore() {
//   let store = new Store(
//     "S - 12345678",
//     "Cosmos",
//     "C/ No c",
//     "123 23 23 23",
//     new Coords(20, -20)
//   );
//   console.log(store.toString());
// }

//StoreHouse

function testShName() {
  console.log("Nombre: " + storeHouse.name);

  console.log("\nRenombramos a 'Almacen de Sergio'");
  storeHouse.name = "Almecen de Sergio";
  console.log("Nombre: " + storeHouse.name);

  console.log("\nRenombramos a ''");
  try {
    storeHouse.name = "";
  } catch (e) {
    console.error(e.message);
  }
  console.log("Nombre: " + storeHouse.name);
}

function testShSingleton() {
  console.log("let storeHouse2 = StoreHouse.getInstance()");
  let storeHouse2 = StoreHouse.getInstance();
  console.log("Name: " + storeHouse2.name);
  console.log("\n(storeHouse === storeHouse2) = " + (storeHouse === storeHouse2));
}

function testShAddRemoveCategory() {
  console.log("Categorias:");
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nAñadimos 7 Categorias");
  console.log(
    storeHouse.addCategory(category1),
    storeHouse.addCategory(category2),
    storeHouse.addCategory(category4),
    storeHouse.addCategory(category5),
    storeHouse.addCategory(category7),
    storeHouse.addCategory(category8),
    storeHouse.addCategory(category10)
  );
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nBorramos C4, C5, C7, C8, C10");
  console.log(
    storeHouse.removeCategory(category4),
    storeHouse.removeCategory(category5),
    storeHouse.removeCategory(category7),
    storeHouse.removeCategory(category8),
    storeHouse.removeCategory(category10)
  );
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nAñadimos C1");
  try {
    storeHouse.addCategory(category1);
  } catch (e) {
    console.error(e.message);
  }
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nBorramos C10");
  try {
    storeHouse.removeCategory(category10);
  } catch (e) {
    console.error(e.message);
  }
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nBorramos Default");
  try {
    storeHouse.removeCategory(new Category("Default"));
  } catch (e) {
    console.error(e.message);
  }
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }

  console.log("\nAñadimos las restantes:");
  console.log(
    storeHouse.addCategory(category3),
    storeHouse.addCategory(category4),
    storeHouse.addCategory(category5),
    storeHouse.addCategory(category6),
    storeHouse.addCategory(category7),
    storeHouse.addCategory(category8),
    storeHouse.addCategory(category9),
    storeHouse.addCategory(category10)
  );
  for (let category of storeHouse.getCategories()) {
    console.log(" - " + category.title);
  }
}

function testShAddRemoveProduct() {
  console.log("Productos:");
  for (let product of storeHouse.getProducts()) {
    console.log(" - " + product.product.serial + ": " + product.product.name);
  }

  console.log("\nAñadimos 5 Productos");
  console.log(
    storeHouse.addProduct(book1),
    storeHouse.addProduct(music1),
    storeHouse.addProduct(monitor1),
    storeHouse.addProduct(book3),
    storeHouse.addProduct(music2)
  );
  for (let product of storeHouse.getProducts()) {
    console.log(" - " + product.product.serial + ": " + product.product.name);
  }

  console.log("\nBorramos 333-33-3333-333-3, Mc-2");
  console.log(
    storeHouse.removeProduct(book3),
    storeHouse.removeProduct(music2)
  );
  for (let product of storeHouse.getProducts()) {
    console.log(" - " + product.product.serial + ": " + product.product.name);
  }

  console.log("\nAñadimos Mc-1");
  try {
    storeHouse.addProduct(music1);
  } catch (e) {
    console.error(e.message);
  }
  for (let product of storeHouse.getProducts()) {
    console.log(" - " + product.product.serial + ": " + product.product.name);
  }

  console.log("\nBorramos Mc-5");
  try {
    storeHouse.removeProduct(music5);
  } catch (e) {
    console.error(e.message);
  }
  for (let product of storeHouse.getProducts()) {
    console.log(" - " + product.product.serial + ": " + product.product.name);
  }

  console.log("\nAñadimos las restantes con Categorias:");
  console.log(
    storeHouse.addProduct(monitor3, category1, category3, category6, category9, category1),
    storeHouse.addProduct(book5, category10, category2, category7),
    storeHouse.addProduct(music4),
    storeHouse.addProduct(book2, category8, category1, category3),
    storeHouse.addProduct(monitor2, category6, category9),
    storeHouse.addProduct(music3, category1),
    storeHouse.addProduct(monitor5, category2, category7),
    storeHouse.addProduct(music5, category1, category5),
    storeHouse.addProduct(book4, category10),
    storeHouse.addProduct(music2, category3, category8, category7, category9, category2),
    storeHouse.addProduct(book3, category10, category1),
    storeHouse.addProduct(monitor4, category4, category5)
  );
  for (let product of storeHouse.getProducts()) {
    let str = "";
    console.log(" - " + product.product.serial + ": " + product.product.name);
    for (let category of product.categories) {
      str += "'" + category.title + "' "
    }
    console.log(str);
  }
}

function testShAddRemoveStore() {
  console.log("Stores:");
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }

  console.log("\nAñadimos 3 Stores");
  console.log(
    storeHouse.addStore(store1),
    storeHouse.addStore(store2),
    storeHouse.addStore(store3)
  );
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }

  console.log("\nBorramos Store 2, Store 3");
  console.log(
    storeHouse.removeStore(store2),
    storeHouse.removeStore(store3)
  );
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }

  console.log("\nAñadimos Store 1");
  try {
    storeHouse.addStore(store1);
  } catch (e) {
    console.error(e.message);
  }
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }

  console.log("\nBorramos Store 5");
  try {
    storeHouse.removeStore(store5);
  } catch (e) {
    console.error(e.message);
  }
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }

  console.log("\nAñadimos las restantes:");
  console.log(
  storeHouse.addStore(store2),
  storeHouse.addStore(store3),
  storeHouse.addStore(store4),
  storeHouse.addStore(store5)
  );
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name);
  }
}

function testShAddProductInStore() {
  console.log("Stores:");
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name);
    }
  }

  console.log("\nTambien se incluye el Stock");
  console.log("Añadir 5 Productos a Store 1");
  console.log(
    storeHouse.addProductInStore(book1, store1, 2),
    storeHouse.addProductInStore(book2, store1, 23),
    storeHouse.addProductInStore(monitor2, store1, 45),
    storeHouse.addProductInStore(monitor4, store1),
    storeHouse.addProductInStore(music5, store1, 4)
  );
  console.log("Añadir 3 Productos a Store 2");
  console.log(
    storeHouse.addProductInStore(book3, store2, 75),
    storeHouse.addProductInStore(music2, store2),
    storeHouse.addProductInStore(monitor1, store2, 23)
  );
  console.log("Añadir 7 Productos a Store 3");
  console.log(
    storeHouse.addProductInStore(music1, store3, 234),
    storeHouse.addProductInStore(monitor3, store3, 54),
    storeHouse.addProductInStore(music3, store3),
    storeHouse.addProductInStore(book4, store3, 65),
    storeHouse.addProductInStore(monitor4, store3, 36),
    storeHouse.addProductInStore(music4, store3, 76),
    storeHouse.addProductInStore(monitor5, store3, 24)
  );
  console.log("Añadir 2 Productos a Store 4");
  console.log(
    storeHouse.addProductInStore(music1, store4, 80),
    storeHouse.addProductInStore(monitor1, store4, 42)
  );
  console.log("Añadir 15 Productos a Store 5");
  console.log(
    storeHouse.addProductInStore(book1, store5, 23),
    storeHouse.addProductInStore(book2, store5, 63),
    storeHouse.addProductInStore(book3, store5, 27),
    storeHouse.addProductInStore(book4, store5, 45),
    storeHouse.addProductInStore(book5, store5),
    storeHouse.addProductInStore(music1, store5, 34),
    storeHouse.addProductInStore(music2, store5, 75),
    storeHouse.addProductInStore(music3, store5, 3),
    storeHouse.addProductInStore(music4, store5),
    storeHouse.addProductInStore(music5, store5, 87),
    storeHouse.addProductInStore(monitor1, store5, 9),
    storeHouse.addProductInStore(monitor2, store5, 3),
    storeHouse.addProductInStore(monitor3, store5, 4),
    storeHouse.addProductInStore(monitor4, store5, 37),
    storeHouse.addProductInStore(monitor5, store5),
  );
  for (let store of storeHouse.getStores()) {
    console.log(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name
      + "\n          Stock: " + product.stock);
    }
  }

  console.log("\nAñadir Producto repetido a Store 4");
  try {
    storeHouse.addProductInStore(music1, store4)
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nAñadir Producto inexistente a Store 4");
  try {
    storeHouse.addProductInStore(music6, store4)
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nAñadir Producto a Store 6");
  try {
    storeHouse.addProductInStore(music1, store6)
  } catch (e) {
    console.error(e.message);
  }
}

function testShRemoveProductInStore() {
  console.log("Stores:");
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name);
    }
    console.groupEnd();
  }

  console.log("\nRemove Mc-3, Mtr-2, Mtr-3, 222-22-2222-222-2, 333-33-3333-333-3");
  console.log(
    storeHouse.removeProduct(monitor2),
    storeHouse.removeProduct(book2),
    storeHouse.removeProduct(music3),
    storeHouse.removeProduct(monitor3),
    storeHouse.removeProduct(book3)
  );
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name);
    }
    console.groupEnd();
  }
}

function testShRemoveCategoryInProduct() {
  console.groupCollapsed("Productos: ");
  for (let product of storeHouse.getProducts()) {
    let str = "     ";
    console.log(" - " + product.product.serial + ": " + product.product.name);
    for (let category of product.categories) {
      str += "'" + category.title + "' "
    }
    console.log(str);
  }
  console.groupEnd();

  console.log("\nProductos en Stores: ")
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name);
      let str = "            Cat: ";
      for (let category of product.categories) {
        str += "'" + category.title + "' "
      }
      console.log(str);
    }
    console.groupEnd();
  }

  console.log("\nRemove C-1, C-5, C-10");
  console.log(
    storeHouse.removeCategory(category1),
    storeHouse.removeCategory(category5),
    storeHouse.removeCategory(category10)
  );

  console.groupCollapsed("\nProductos: ");
  for (let product of storeHouse.getProducts()) {
    let str = "     ";
    console.log(" - " + product.product.serial + ": " + product.product.name);
    for (let category of product.categories) {
      str += "'" + category.title + "' "
    }
    console.log(str);
  }
  console.groupEnd();

  console.log("\nProductos en Stores: ")
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name);
      let str = "            Cat: ";
      for (let category of product.categories) {
        str += "'" + category.title + "' "
      }
      console.log(str);
    }
    console.groupEnd();
  }
}

function testShAddQuantityProductInStore() {
  console.log("Stores:");
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name
      + "\n            Stock: " + product.stock);
    }
    console.groupEnd();
  }

  console.log("\nAdd +100 Mc-1 en Store 3");
  console.log(
    storeHouse.addQuantityProductInStore(music1, store3, 100)
  );

  console.log("\nAdd +30 Mc-4 en Store 3");
  console.log(
    storeHouse.addQuantityProductInStore(music4, store3, 30)
  );

  console.log("\nStores:");
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("        - " + product.product.serial + ": " + product.product.name
      + "\n            Stock: " + product.stock);
    }
    console.groupEnd();
  }

  console.log("\nAdd -10 Mc-4 en Store 3");
  try {
    storeHouse.addQuantityProductInStore(music4, store3, -10)
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nAdd +100 Mc-1 en Store 2");
  try {
    storeHouse.addQuantityProductInStore(music1, store2, 100)
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nAdd +100 Mc-1 en Store 6");
  try {
    storeHouse.addQuantityProductInStore(music1, store6, 100)
  } catch (e) {
    console.error(e.message);
  }
}

function testGetCategoryProducts() {
  console.log("Stock de C2");
  for (let product of storeHouse.getCategoryProducts(category2)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nStock de C2 Music");
  for (let product of storeHouse.getCategoryProducts(category2, Music)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nStock de C8 Book");
  for (let product of storeHouse.getCategoryProducts(category8, Book)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nStock de C5");
  try {
    for (let product of storeHouse.getCategoryProducts(category5)) {
      console.log(" - " + product.product + ": " + product.stock);
    }
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nStock de C2 Store");
  try {
    for (let product of storeHouse.getCategoryProducts(category5, Store)) {
      console.log(" - " + product.product + ": " + product.stock);
    }
  } catch (e) {
    console.error(e.message);
  }
}

function testGetStoreProducts() {
  console.log("Stores:");
  for (let store of storeHouse.getStores()) {
    console.groupCollapsed(" - " + store.store.cif + ": " + store.store.name + "\n   Prod: " + store.products.length);
    for (let product of store.products) {
      console.log("      - " + product.product.name
      + "\n          Stock: " + product.stock);
    }
    console.groupEnd();
  }

  console.log("\nProductos de Store 5");
  for (let product of storeHouse.getStoreProducts(store5)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nProductos Monitor de Store 5");
  for (let product of storeHouse.getStoreProducts(store5, Monitor)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nProductos Music de Store 1");
  for (let product of storeHouse.getStoreProducts(store1, Music)) {
    console.log(" - " + product.product + ": " + product.stock);
  }

  console.log("\nProductos de Store 6");
  try {
    for (let product of storeHouse.getStoreProducts(store6)) {
      console.log(" - " + product.product + ": " + product.stock);
    }
  } catch (e) {
    console.error(e.message);
  }

  console.log("\nProductos Store de Store 3");
  try {
    for (let product of storeHouse.getStoreProducts(store3, Store)) {
      console.log(" - " + product.product + ": " + product.stock);
    }
  } catch (e) {
    console.error(e.message);
  }
}

function callAllTests() {
  console.group("- Test StoreHouse");

  console.groupCollapsed(" + Test Name");
  testShName();
  console.groupEnd();

  console.groupCollapsed(" + Test Singleton");
  testShSingleton();
  console.groupEnd();

  console.groupCollapsed(" + Test Add-Remove Category()");
  testShAddRemoveCategory();
  console.warn("Borrar relaciones en Test Remove CategoryInProduct()");
  console.groupEnd();

  console.groupCollapsed(" + Test Add-Remove Product()");
  testShAddRemoveProduct();
  console.warn("Borrar relaciones en Test Remove ProductInStore()");
  console.groupEnd();

  console.groupCollapsed(" + Test Add-Remove Store()");
  testShAddRemoveStore();
  console.groupEnd();

  console.groupCollapsed(" + Test Add ProductInStore()");
  testShAddProductInStore();
  console.groupEnd();

  console.groupCollapsed(" + Test Remove ProductInStore()");
  testShRemoveProductInStore();
  console.groupEnd();

  console.groupCollapsed(" + Test Remove CategoryInProduct()");
  testShRemoveCategoryInProduct();
  console.groupEnd();

  console.groupCollapsed(" + Test Add QuantityProductInStore()");
  testShAddQuantityProductInStore();
  console.groupEnd();

  console.groupCollapsed(" + Test GetCategoryProducts()");
  testGetCategoryProducts();
  console.groupEnd();

  console.groupCollapsed(" + Test GetStoreProducts()");
  testGetStoreProducts();
  console.groupEnd();

  console.groupEnd();
}

export { callAllTests };
