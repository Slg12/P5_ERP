'use strict';
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
  } from "./exceptions.js";

//Definimos la clase Product
class Product {
  #serial;
  #name;
  #price;
  #tax;
  #images;
  constructor(serial, name, price, tax = Product.IVA, images = []) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Clase abstacta, no se permiten instancias
    if (new.target === Product) throw new AbstractClassException("Product");

    //Validación de parámetros obligatorios
    if (!serial) throw new EmptyValueException("serial");
    if (!name) throw new EmptyValueException("name");
    price = Number.parseFloat(price);
    if (!price || price <= 0) throw new InvalidValueException("price", price);
    if (!tax || tax < 0) throw new InvalidValueException("tax", tax);
    if (!(Array.isArray(images))) throw new InvalidValueException("images", images);

    this.#serial = serial;
    this.#name = name;
    this.#price = price;
    this.#tax = tax;
    this.#images = images;
  }

  get serial() {
    return this.#serial;
  }
  //   set serial(value) {
  //     if (!value) throw new EmptyValueException("serial");
  //     this.#serial = value;
  //   }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value) throw new EmptyValueException("name");
    this.#name = value;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    value = Number.parseFloat(value);
    if (Number.isNaN(value) && value > 0)
      throw new InvalidValueException("price", value);
    this.#price = value;
  }

  get tax() {
    return this.#tax;
  }

  set tax(value = Product.IVA) {
    if (!value || value < 0)
      throw new InvalidValueException("taxPercentage", value);
    this.#tax = value;
  }

  get images() {
    return this.#images;
  }

  set images(value) {
    if (!images) throw new EmptyValueException("images");
    this.#images = value;
  }

  //Propiedades estáticas.
  static get IVA() {
    return 21;
  }

  // Métodos públicos
  toString() {
    return `Serial: ${this.serial} Name: ${this.name} Price: ${this.price}€ Tax: ${this.tax}% Images: ${this.images}`;
  }
}
Object.defineProperty(Product.prototype, "serial", { enumerable: true });
Object.defineProperty(Product.prototype, "name", { enumerable: true });
Object.defineProperty(Product.prototype, "price", { enumerable: true });
Object.defineProperty(Product.prototype, "tax", { enumerable: true });
Object.defineProperty(Product.prototype, "images", { enumerable: true });
Object.defineProperty(Product.prototype, "description", {
  enumerable: true,
  writable: true,
});

//Definimos la subclase Book
class Book extends Product {
  //Atributos privados
  #editorial;
  #author;
  #lenguage;
  #genre;
  #volume;

  constructor(
    serial,
    name,
    price,
    tax,
    images,
    editorial,
    author = "unknown",
    lenguage,
    genre = "unknown",
    volume = 1
  ) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Validación de serial en los libros ya que todos tendran la misma nomenclatura
    if (!/^\d{3}-\d{2}-\d{4}-\d{3}-\d{1}$/.test(serial))
      throw new InvalidValueException("serial: ISBN", serial);

    //Llamada al superconstructor.
    super(serial, name, price, tax = Product.IVA, images);

    //Validación de argumentos
    if (!editorial) throw new EmptyValueException("editorial");
    if (!/^((ES)|(EN))$/.test(lenguage))
      throw new InvalidValueException("lenguage", lenguage);
    volume = Number.parseInt(volume);
    if (Number.isNaN(volume) || volume <= 0)
      throw new InvalidValueException("volume", volume);

    //Atributos privados
    this.#editorial = editorial;
    this.#author = author;
    this.#lenguage = lenguage;
    this.#genre = genre;
    this.#volume = volume;
  }

  //Propiedades de acceso a los atributos privados
  get editorial() {
    return this.#editorial;
  }

  set editorial(value) {
    if (!value) throw new EmptyValueException("editorial");
    this.#editorial = value;
  }

  get author() {
    return this.#author;
  }

  set author(value) {
    if (!value) throw new EmptyValueException("author");
    this.#author = value;
  }

  get lenguage() {
    return this.#lenguage;
  }

  set lenguage(value) {
    if (!/^((ES)|(EN))$/.test(value))
      throw new InvalidValueException("lenguage", value);
    this.#lenguage = value;
  }

  get genre() {
    return this.#genre;
  }

  set genre(value) {
    if (!value) throw new EmptyValueException("genre");
    this.#genre = value;
  }

  get volume() {
    return this.#volume;
  }

  set volume(value) {
    value = Number.parseInt(value);
    if (Number.isNaN(value) || value <= 0)
      throw new InvalidValueException("volume", value);
    this.#volume = value;
  }

  // Métodos públicos
  toString() {
    return (
      super.toString() +
      ` Editorial: ${this.editorial} Author: ${this.author} Lenguage: ${this.lenguage} Genre: ${this.genre} Volume: ${this.volume}`
    );
  }
}
Object.defineProperty(Book.prototype, "editorial", { enumerable: true });
Object.defineProperty(Book.prototype, "author", { enumerable: true });
Object.defineProperty(Book.prototype, "lenguage", { enumerable: true });
Object.defineProperty(Book.prototype, "genre", { enumerable: true });
Object.defineProperty(Book.prototype, "volume", { enumerable: true });

//Definimos la subclase Music
class Music extends Product {
  //Atributos privados
  #band;
  #genre;
  #length;
  #date;
  constructor(
    serial,
    name,
    price,
    tax,
    images,
    band,
    genre = "unknown",
    length,
    date = new Date()
  ) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Llamada al superconstructor.
    super(serial, name, price, tax = Product.IVA, images);

    //Validación de argumentos
    if (!band) throw new EmptyValueException("band");
    if (!/^(\d{1,2}:\d{2})$/.test(length))
      throw new InvalidValueException("length", length);
    if (!(date instanceof Date)) throw new InvalidValueException("date", date);

    //Atributos privados
    this.#band = band;
    this.#genre = genre;
    this.#length = length;
    this.#date = date;
  }

  //Propiedades de acceso a los atributos privados
  get band() {
    return this.#band;
  }

  set band(value) {
    if (!value) throw new EmptyValueException("band");
    this.#band = value;
  }

  get genre() {
    return this.#genre;
  }

  set genre(value) {
    if (!value) throw new EmptyValueException("genre");
    this.#genre = value;
  }

  get length() {
    return this.#length;
  }

  set length(value) {
    if (!/^(\d{2}:\d{2})$/.test(value))
      throw new InvalidValueException("length", value);
    this.#length = value;
  }

  get date() {
    return this.#date;
  }

  set date(value) {
    if (!(value instanceof Date))
      throw new InvalidValueException("date", value);
    this.#date = value;
  }

  // Métodos públicos
  toString() {
    return (
      super.toString() +
      ` Band: ${this.band} Genre: ${this.genre} Length: ${this.length} Date ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`
    );
  }
}
Object.defineProperty(Music.prototype, "band", { enumerable: true });
Object.defineProperty(Music.prototype, "genre", { enumerable: true });
Object.defineProperty(Music.prototype, "length", { enumerable: true });
Object.defineProperty(Music.prototype, "date", { enumerable: true });

//Definimos la subclase Monitor
class Monitor extends Product {
  //Atributos privados
  #brand;
  #refreshRate;
  #size;
  #color;
  #inputType;
  #screenType;
  constructor(
    serial,
    name,
    price,
    tax,
    images,
    brand = "none",
    refreshRate,
    size,
    color = "none",
    inputType = [],
    screenType
  ) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Llamada al superconstructor.
    super(serial, name, price, tax = Product.IVA, images);

    //Validación de argumentos
    if (!brand) throw new EmptyValueException("brand");
    if (!/^(\d{2,3}Hz)$/.test(refreshRate))
      throw new InvalidValueException("refreshRate", refreshRate);
    if (!/^(\d{1,2}(.\d{1})?")$/.test(size)) throw new InvalidValueException("size", size);
    if (Array.isArray(inputType)) {
      for (let input of inputType) {
        if (!/^((HDMI)|(VGA)|(DVI)|(DP)|(USB-C))$/.test(input))
          throw new InvalidValueException("inputType", input);
      }
    } else throw new InvalidValueException("inputType", inputType);
    if (!/^((Flat)|(Curved))$/i.test(screenType))
      throw new InvalidValueException("screenType", screenType);

    //Atributos privados
    this.#brand = brand;
    this.#refreshRate = refreshRate;
    this.#size = size;
    this.#color = color;
    this.#inputType = inputType;
    this.#screenType = screenType;
  }

  //Propiedades de acceso a los atributos privados
  get brand() {
    return this.#brand;
  }

  set brand(value) {
    if (!value) throw new EmptyValueException("brand");
    this.#brand = value;
  }

  get refreshRate() {
    return this.#refreshRate;
  }

  set refreshRate(value) {
    if (!/^(\d+Hz)$/.test(value))
      throw new InvalidValueException("refreshRate", value);
    this.#refreshRate = value;
  }

  get size() {
    return this.#size;
  }

  set size(value) {
    if (!/^(\d+")$/.test(value)) throw new InvalidValueException("size", value);
    this.#size = value;
  }

  get color() {
    return this.#color;
  }

  set color(value) {
    if (!value) throw new EmptyValueException("brand");
    this.#color = value;
  }

  get inputType() {
    return this.#inputType;
  }

  set inputType(value) {
    if (!/^((HDMI)|(VGA)|(DVI)|(DP)|(USB-C))$/.test(value))
      throw new InvalidValueException("inputType", value);
    this.#inputType = value;
  }

  get screenType() {
    return this.#screenType;
  }

  set screenType(value) {
    if (!/^((Flat)|(Curved))$/i.test(value))
      throw new InvalidValueException("screenType", value);
    this.#screenType = value;
  }

  // Métodos públicos
  toString() {
    return (
      super.toString() +
      ` Brand ${this.brand} RefreshRate: ${this.refreshRate} Size: ${this.size} Color: ${this.color} InputType: ${this.inputType} ScreenType: ${this.screenType}`
    );
  }
}
Object.defineProperty(Monitor.prototype, "brand", { enumerable: true });
Object.defineProperty(Monitor.prototype, "refreshRate", { enumerable: true });
Object.defineProperty(Monitor.prototype, "size", { enumerable: true });
Object.defineProperty(Monitor.prototype, "color", { enumerable: true });
Object.defineProperty(Monitor.prototype, "inputType", { enumerable: true });
Object.defineProperty(Monitor.prototype, "screenType", { enumerable: true });

export {Product, Book, Music, Monitor}