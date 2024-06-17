import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    cart: {
      products: [],
      total: 0
    },
  }),
  getters: {
    getCartProducts: (state) => state.cart.products,
    getCartTotal: (state) => {
      const options = {
        style: 'currency', currency: 'COP',
        maximumFractionDigits: 0
      }
      return state.cart.total.toLocaleString('es-CO', options)
    }
  }, 
  actions: {
    clearCart() {
      this.cart.products = []
      this.cart.total = 0
    },
    addProductToCart(product) {
      const addingProductId = this.cart.products.length + 1
      const addingProduct = Object.assign({}, { ...product });
      this.cart.products.push({id: addingProductId, ...addingProduct})
      this.cart.total = this.cart.total + product.totalPrice
    },
    deleteProductFromCart(productId) {
      const index = this.cart.products.findIndex((product) => product.id === productId)
      if (index > -1) {
        this.cart.total = this.cart.total - this.cart.products[index].totalPrice
        this.cart.products.splice(index, 1)
      }
    },
  }
})