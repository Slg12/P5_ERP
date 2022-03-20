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

V1:
- Entidades Creadas y testeadas

V2:
- MVC, visualización de categorías, productos y tiendas

	V2.1:
	- Arreglo del Stock mostrado y productos con varias imagenes

V3:
- Creación del history, nueva ventana al clicar productos, nuevo filtro por categorías en tiendas

	V3.1:
	- Nueva cabecera en la ventana de productos indicando la procedencia del producto

V4:
- Nuevos formularios para crear/eliminar categorias, productos y tiendas
- Formulario para añadir Stock y o productos a tiendas
- Nuevo funcionamiento de la ventana de productos, ahora se creará una por cada producto, se actualizará la ventana dependiendo de la procedencia de este, el boton de Cerrar de cada ventana es individual, en cambio el boton Cerrar Ventanas de la pagina principal cerrará todas ventanas creadas.

V5:
- Usuario admin necesario para acceder a la administración
- Cookies
