// import * as StoreHouseTest from "./test.js";

// StoreHouseTest.callAllTests();

import StorehouseApp from "./storehouse/storehouseApp.js";

const historyActions = {
	init: () => {
		StorehouseApp.handleInit();
	},
	productsStoreList: (event) => StorehouseApp.handleProductsStoreList(event.state.type),
	productsTypeList: (event) => StorehouseApp.handleProductsTypeList(event.state.type),
	productsCategoryList: (event) => StorehouseApp.handleProductsCategoryList(event.state.type),
	ShowProduct: (event) => StorehouseApp.handleShowProduct(event.state.serial, event.state.cif),
	ProductToCategory: (event) => StorehouseApp.handleProductsCategoryList(event.state.type),
	FilterStoreCategory: (event) => StorehouseApp.handleFilterStoreCategory(event.state.type, event.state.cif),
	newCategory: () => StorehouseApp.handleNewCategoryForm(),
	removeCategory: () => StorehouseApp.handleRemoveCategoryForm(),
	newProduct: () => StorehouseApp.handleNewProductForm(),
	removeProduct: () => StorehouseApp.handleRemoveProductForm(),
	newStore: () => StorehouseApp.handleNewStoreForm(),
	removeStore: () => StorehouseApp.handleRemoveStoreForm()
}

window.addEventListener('popstate', function (event) {
	if (event.state) {
		historyActions[event.state.action](event);
	}
});

history.replaceState({ action: 'init' }, null);
