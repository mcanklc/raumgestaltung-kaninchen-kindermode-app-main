export const usePriceFilter = (price: string | number): string => {
  return typeof price === "number"
    ? price.toFixed(2).replace(".", ",") + " €"
    : price + " €";
};
