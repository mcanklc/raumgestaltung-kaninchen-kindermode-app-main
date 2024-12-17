import { defineStore } from "pinia";
import isEqual from "lodash.isequal";
import currency from "currency.js";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    showBasket: false,
    showBasketAddedBanner: false,
    basketId: null,
    basketItems: [] as API.Kaninchen.OrderItem[],
  }),
  getters: {
    numberOfBasketItems: (state) => {
      return state.basketItems.reduce((acc, item) => {
        return acc + (item.type === "fabric" ? 1 : item.quantity);
      }, 0);
    },
    basketTax: (state) => {
      return state.basketItems.reduce((acc, item) => {
        return (
          acc +
          currency(item.price).multiply(item.quantity).multiply(0.19).value
        );
      }, 0);
    },
    basketTotal: (state) => {
      return state.basketItems.reduce(
        (acc, item) => acc + currency(item.price).multiply(item.quantity).value,
        0
      );
    },
  },
  actions: {
    addBasketItem(basketItem: API.Kaninchen.OrderItem) {
      const existingItem = this.basketItems.find((item) => {
        if (item.type === "fabric") {
          return item.productId === basketItem.productId;
        } else {
          return (
            item.productId === basketItem.productId &&
            item.size === basketItem.size
          );
        }
      });

      if (
        existingItem &&
        isEqual(
          { ...existingItem, quantity: 1, id: "" },
          { ...basketItem, quantity: 1, id: "" }
        )
      ) {
        existingItem.quantity += basketItem.quantity;
      } else {
        this.basketItems.push(basketItem);
      }

      this.showBasket = true;
      this.showBasketAddedBanner = true;
    },
    updateItemQuantity(basketItemId: string, quantity: number) {
      const basketItem = this.basketItems.find(
        (item) => item.itemId === basketItemId
      );
      if (basketItem) {
        if (quantity < 1 && basketItem.type !== "fabric") {
          return;
        } else if (quantity < 0.5 && basketItem.type === "fabric") {
          return;
        }
        basketItem.quantity = quantity;
      }
    },
    removeBasketItem(basketItemId: string) {
      this.basketItems = this.basketItems.filter(
        (item) => item.itemId !== basketItemId
      );
    },
    clearBasket() {
      this.basketItems = [];
    },
  },
  persist: {
    paths: ["basketItems"],
  },
});
