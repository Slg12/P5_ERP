"use strict";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "./exceptions.js";

import {Product, Book, Music, Monitor} from "./products.js";
import {Store} from "./store.js";
import {Coords} from "./store.js";
import {Category} from "./category.js";

//Singleton
let StoreHouse = (function () {
  let instantiated;
  function init() {
    //Definimos la clase StoreHouse
    class StoreHouse {
      #name;
      #_products = [];
      #_categories = [];
      #_stores = [];
      #_stock = [];
      constructor(name) {
        //La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de parámetros obligatorios
        if (!name) throw new EmptyValueException("name");

        //Atributos privados
        this.#name = name;
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
      #findCategory = (value) => {
        if (!(value instanceof Category)) throw new InvalidObject();
        let index = 0;
        let isExist = false;
        while (!isExist && index <= this.#_categories.length - 1) {
          value.title === this.#_categories[index].title
            ? (isExist = true)
            : index++;
        }
        return isExist ? index : false;
      };

      // Métodos públicos
      get categories() {
        let nextIndex = 0;
        return {
          next: function () {
            return nextIndex < this.#_categories.length
              ? { value: this.#_categories[nextIndex++], done: false }
              : { done: true };
          },
        };
      }

      get stores() {
        let nextIndex = 0;
        return {
          next: function () {
            return nextIndex < this.#_stores.length
              ? { value: this.#_stores[nextIndex++], done: false }
              : { done: true };
          },
        };
      }

      addCategory(value) {
        if (!(value instanceof Category))
          throw InvalidValueException("category", value);
        if (this.#findCategory(value) === false) throw new ExistInArray();

        this.#_categories.push(value);
      }

      removeCategory(value) {
        if (!(value instanceof Category))
          throw InvalidValueException("category", value);
        let index = this.#findCategory(value);
        if (index !== false) throw new NotExistInArray();

        this.#_categories.splice(index, 1);
      }

      addProduct()

      toString() {
        return `Name: ${this.name}`;
      }
    }

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

//export { Errores };
export default StoreHouse;
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException} from "./exceptions.js"
export {Product, Book, Music, Monitor} from "./products.js";
export {Store} from "./store.js";
export {Coords} from "./store.js";
export {Category} from "./category.js";