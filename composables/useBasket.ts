import { nanoid } from "nanoid";
import { useCheckoutStore } from "~~/store/checkout";

export const useBasket = (itemType: API.Kaninchen.OrderItemType) => {
  const checkoutStore = useCheckoutStore();

  const quantity = ref(1);

  const addItem = (
    item: Omit<API.Kaninchen.OrderItem, "itemId" | "type" | "quantity">
  ) => {
    checkoutStore.addBasketItem({
      ...item,
      itemId: nanoid(),
      type: itemType,
      quantity: quantity.value,
    });
  };

  return {
    quantity,
    addItem,
  };
};
