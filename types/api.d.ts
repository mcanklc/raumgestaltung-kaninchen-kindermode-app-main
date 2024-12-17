declare namespace API {
  declare namespace Kaninchen {
    export interface ListResponse<T> {
      meta: {
        currentPage: number;
        nextPage: number | null;
        prevPage: number | null;
        totalPages: number;
        totalResults: number;
      };
      results: T[];
    }

    export interface Size {
      _id: string;
      size: string;
      price: {
        default: number;
        lined?: number;
        saleDefault?: number;
        saleLined?: number;
      };
    }

    export interface Article {
      _id: string;
      title: string;
      description: string;
      shortDescription?: string;
      category: string;
      preview: string;
      sizes: Size[];
      _meta: {
        visible: boolean;
        sale: boolean;
      };
      createdAt: string;
    }

    export interface Fabric {
      _id: string;
      title: string;
      preview: string;
      categories: string;
      material: string;
      season: string[];
      type: string;
      pattern: {
        type: "pattern" | "color";
        src?: string;
        color?: string;
      };
      _meta: {
        visible: boolean;
        sale: boolean;
        buyable: boolean;
        stock: number;
      };
    }

    export interface ProductSize {
      _id: string;
      size: string;
      price: {
        default: number;
        lined: number;
        saleDefault: number;
        saleLined: number;
      };
    }

    export interface ProductOptions {
      _id: string;
      title: string;
      type: string;
      selector: string;
      order: number;
    }

    export interface Product {
      _id: string;
      title: string;
      description: string;
      preview: string;
      categories: string[];
      season: string[];
      sizes: ProductSize[];
      gallery: string[];
      productGroup?: string;
      illustration: string;
      options: ProductOptions[];
      _meta: {
        visible: boolean;
        sale: boolean;
        lined: boolean;
      };
      createdAt: string;
    }

    export interface StaticPage {
      _id: string;
      title: string;
      slug: string;
      content: string;
      _meta: {
        visible: boolean;
      };
    }

    export type OrderItemType = "product" | "article" | "fabric" | "misc";

    export interface OrderItem {
      itemId: string;
      productId: string;
      type: OrderItemType;
      title: string;
      description: string;
      price: number;
      quantity: number;
      link: string;
      preview: string;
      size?: string;
      _meta?: {
        defaultPrice?: number;
        sale?: boolean;
      };
    }

    export interface OrderAddress {
      firstname: string;
      lastname: string;
      street: string;
      street2?: string;
      zip: string;
      city: string;
      country: string;
    }

    export interface Order {
      items: OrderItem[];
      shippingAddress: OrderAddress;
      billingAddress: OrderAddress;
      email: string;
      billingMethod: "banktransfer" | "paypal" | "invoice" | "instore";
      shippingMethod: "dhl" | "pickup";
      price: {
        subtotal: number;
        shipping: number;
        total: number;
      };
    }
  }
}
