"use strict";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

//Definimos la clase Category
class Category {
  #title;
  constructor(title) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Validación de parámetros obligatorios
    if (!title) throw new EmptyValueException("title");

    //Atributos privados
    this.#title = title;
  }

  //Propiedades de acceso a los atributos privados
  get title() {
    return this.#title;
  }

  set title(value) {
    if (!value) throw new EmptyValueException("title");
    this.#title = value;
  }

  // Métodos públicos
  toString() {
    return `Title: ${this.title}`;
  }
}
Object.defineProperty(Category.prototype, "title", { enumerable: true });
Object.defineProperty(Category.prototype, "description", {
  enumerable: true,
  writable: true,
});

export { Category };
