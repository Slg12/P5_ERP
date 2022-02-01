"use strict";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

import { Coords } from "./coords.js";

//Definimos la calse Store
class Store {
  //Atributos privados
  #cif;
  #name;
  #address;
  #phone;
  #coords;
  constructor(cif, name, address, phone, coords) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Validación de argumentos
    if (!/^([A-Z]{1}\s-\s\d{8})$/.test(cif))
      throw new InvalidValueException("CIF", cif);
    if (!name) throw new EmptyValueException("name");
    if (!address) throw new EmptyValueException("addres");
    if (!phone) throw new EmptyValueException("phone");
    if (!/^(\d{3}\s\d{2}\s\d{2}\s\d{2})||(\d{3}\s\d{3}\s\d{3})$/.test(phone))
      throw new InvalidValueException("phone", phone);
    if (!(coords instanceof Coords))
      throw new InvalidValueException("coords", coords);

    //Atributos privados
    this.#cif = cif;
    this.#name = name;
    this.#address = address;
    this.#phone = phone;
    this.#coords = coords;
  }

  get cif() {
    return this.#cif;
  }

  set cif(value) {
    if (!/^([A-Z]{1}\s-\s\d{8})$/.test(value))
      throw new InvalidValueException("CIF", value);
    this.#cif = value;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value) throw new EmptyValueException("name");
    this.#name = value;
  }

  get address() {
    return this.#address;
  }

  set address(value) {
    if (!value) throw new EmptyValueException("addres");
    this.#address = value;
  }

  get phone() {
    return this.#phone;
  }

  set phone(value) {
    if (!/^(\d{3}\s\d{2}\s\d{2}\s\d{2})||(\d{3}\s\d{3}\s\d{3})$/.test(value))
      throw new InvalidValueException("phone", value);
    this.#phone = value;
  }

  get coords() {
    return this.#coords;
  }

  set coords(value) {
    if (!(value instanceof Coords))
      throw new InvalidValueException("coords", value);
    this.#coords = value;
  }

  // Métodos públicos
  toString() {
    return `CIF: ${this.cif} Name: ${this.name} Address: ${this.address} Phone: ${this.phone} Coords[${this.coords}]`;
  }
}
Object.defineProperty(Store.prototype, "cif", { enumerable: true });
Object.defineProperty(Store.prototype, "name", { enumerable: true });
Object.defineProperty(Store.prototype, "address", { enumerable: true });
Object.defineProperty(Store.prototype, "phone", { enumerable: true });
Object.defineProperty(Store.prototype, "coords", { enumerable: true });

export { Store };
export { Coords } from "./coords.js";
