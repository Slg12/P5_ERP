import StoreHouse from './storehouse.js';
import StorehouseController from './storehouseController.js';
import StorehouseView from './storehouseView.js';

$(function(){
	const StorehouseApp = new StorehouseController(
		StoreHouse.getInstance(), new StorehouseView()
	);
});
