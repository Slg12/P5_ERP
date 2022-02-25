import StoreHouse from './storehouse.js';
import StorehouseController from './storehouseController.js';
import StorehouseView from './storehouseView.js';

const StorehouseApp = new StorehouseController(
	StoreHouse.getInstance(), new StorehouseView()
);

export default StorehouseApp;
