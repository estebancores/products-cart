
/*
  Productos que van a aparecer en la lista de opciones para seleccionar
*/
const products = [
  {
    "name": "Fresas Pequeñas (9 Oz)",
    "size": "9 Onz",
    "description": "Deliciosas fresas troceadas con la más deliciosa crema de leche, con las adiciones que desees",
    "price": 6000,
    "toppings": true
  },
  {
    "name": "Fresas Medianas (12 Oz)",
    "size": "12 Onz",
    "description": "Deliciosas fresas troceadas con la más deliciosa crema de leche, con las adiciones que desees",
    "price": 9000,
    "toppings": true
  },
  {
    "name": "Fresas Grandes (14 Oz)",
    "size": "14 Onz",
    "description": "Deliciosas fresas troceadas con la más deliciosa crema de leche, con las adiciones que desees",
    "price": 12000,
    "toppings": true     
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



export {
  products,
  toppings,
  whatsappNumber
}