import StoreHouse from './storehouse.js';
import StorehouseController from './storehouseController.js';
import StorehouseView from './storehouseView.js';
import AuthenticationService from '../authentication/authentication.js';

const StorehouseApp = new StorehouseController(
	StoreHouse.getInstance(), new StorehouseView(), AuthenticationService.getInstance()
);

export default StorehouseApp;
