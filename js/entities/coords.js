"use strict";
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  AbstractClassException,
} from "../exceptions.js";

//Definimos la clase Coords
class Coords {
  //Atributos privados
  #latitude;
  #longitude;
  constructor(latitude, longitude) {
    //La función se invoca con el operador new
    if (!new.target) throw new InvalidAccessConstructorException();

    //Validación de argumentos
    latitude = parseFloat(latitude);
    if (Number.isNaN(latitude) || latitude < -90 || latitude > 90)
      throw new InvalidValueException("latitude", latitude);
    longitude = parseFloat(longitude);
    if (Number.isNaN(longitude) || longitude < -180 || longitude > 180)
      throw new InvalidValueException("longitude", longitude);

    //Atributos privados
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }

  set latitude(value) {
    value = parseFloat(value);
    if (Number.isNaN(value) || value < -90 || value > 90)
      throw new InvalidValueException("latitude", value);
    this.#latitude = value;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(value) {
    value = parseFloat(value);
    if (Number.isNaN(value) || value < -180 || value > 180)
      throw new InvalidValueException("longitude", value);
    this.#longitude = value;
  }

  // Métodos públicos
  toString() {
    return `Latitude: ${this.latitude} Longitude: ${this.longitude}`;
  }
}
Object.defineProperty(Coords.prototype, "latitude", { enumerable: true });
Object.defineProperty(Coords.prototype, "longitude", { enumerable: true });

export { Coords };
