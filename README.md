# P5_ERP
Proyecto Gestión de un Almacén

Estructura del StoreHouse:
#_products = 
  [{
    produtc: Product,
    categories: [Category]
  }]

#_categories = [Category];

#_stores = 
  [{
    store: Store,
    products: [{
                product: Product,
                categories: [Category],
                stock: Number
              }]
  }]
