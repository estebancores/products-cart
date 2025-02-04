
/*
  Productos que van a aparecer en la lista de opciones para seleccionar
*/
const products = [
  {
    category: 'Fresas con crema',
    categoryId: 'fresas-crema',
    products: [
      {
        "name": "Fresas Pequeñas (9 Oz)",
        "size": "9 Onz",
        "description": "Vaso de 9 Onz con fresas troceadas con la más deliciosa crema",
        "price": 6000,
        "toppings": true
      },
      {
        "name": "Fresas Medianas (12 Oz)",
        "size": "12 Onz",
        "description": "Vaso de 12 Onz con fresas troceadas con la más deliciosa crema",
        "price": 9000,
        "toppings": true
      },
      {
        "name": "Fresas Grandes (14 Oz)",
        "size": "14 Onz",
        "description": "Vaso de 14 Onz con fresas troceadas con la más deliciosa crema",
        "price": 12000,
        "toppings": true     
      }
    ]
  },
  {
    category: 'Obleas',
    categoryId: 'obleas',
    products: [
      {
        "name": "Oblea",
        "description": "Base de oblea con crema, salsa de arequipe y queso rayado",
        "price": 4000,
        "toppings": true
      },
    ]
  }
]
/*
  type: [  "qty", "close_question", "multiple" ]
  "qty": se pone los options conectado a una cantidad que se multiplica por el "price"
  "question": deben pasarse las "answers" posibles, 2 opciones ya que sera un "Radio input"
  "multiple": deben pasarse las "answers" posibles, N opciones ya que es un "Checkbox input"
*/
const toppings = [
  {
    "name": "¿Que salsas deseas?",
    "price": 0,
    "type": "multiple",
    "options": ["Arequipe", "Chocolate", "Lecherita"]
  },
  {
    "name": "¿Quieres chispitas?",
    "price": 0,
    "type": "close_question",
    "options": ["Si", "No"]
  },
  {
    "name": "Más adiciones",
    "price": 1000,
    "required": false,
    "type" :"qty",
    "options": [
      "Chocorramo","Milo","Chocolatina", "Gomitas", "Oreo", "Queso rayado", "M y M"
    ]
  }
]

const whatsappNumber = "573147183836"

const googleProfileUrl = "https://deliciosasfresas.xyz"



export {
  products,
  toppings,
  whatsappNumber
}