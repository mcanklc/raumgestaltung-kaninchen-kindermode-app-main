import { defineStore } from "pinia";

interface RemoteConfigHomeSliderItem {
  title: string;
  teaser: string;
  image: {
    src: string;
    alt: string;
  };
  cta: {
    title: string;
    href: string;
  };
}

interface RemoteConfigHomeTeaserItem {
  title: string;
  subtitle: string;
  image: {
    src: string;
    alt: string;
  };
  cta: {
    title: string;
    href: string;
  };
}

interface RemoteConfigNavigationItem {
  title: string;
  href: string;
}

interface RemoteConfigCheckoutShippingMethod {
  id: string;
  title: string;
  description: string;
  price: Record<string, number>;
}

interface RemoteConfigCheckoutBillingMethod {
  id: string;
  title: string;
  description: string;
  condition: {
    shippingMethod?: string[];
    billingCountry?: string[];
  };
}

interface RemoteConfig {
  home: {
    slider: {
      autoplay: boolean;
      autoplaySpeed: number;
      items: RemoteConfigHomeSliderItem[];
    };
    teaser: RemoteConfigHomeTeaserItem[];
  };
  navigation: {
    main: RemoteConfigNavigationItem[];
    meta: RemoteConfigNavigationItem[];
    footer: RemoteConfigNavigationItem[];
    legal: RemoteConfigNavigationItem[];
  };
  checkout: {
    shipping: {
      methods: RemoteConfigCheckoutShippingMethod[];
    };
    billing: {
      methods: RemoteConfigCheckoutBillingMethod[];
    };
  };
}

export const useConfigStore = defineStore("config", {
  state: () => ({
    remoteConfigFetched: false,
    remoteConfig: {} as RemoteConfig,
  }),
  getters: {
    shippingCountries(state) {
      const countries = new Set<string>();
      state.remoteConfig.checkout.shipping.methods.forEach((method) => {
        Object.keys(method.price).forEach((country) => {
          countries.add(country);
        });
      });
      return Array.from(countries);
    },
    shippingMethods(state) {
      return state.remoteConfig.checkout.shipping.methods;
    },
    billingMethods(state) {
      return state.remoteConfig.checkout.billing.methods;
    },
  },
  actions: {
    async fetchRemoteConfig() {
      const response = await fetch(
        `${useRuntimeConfig().public.apiUrl}/settings`
      );
      const config = await response.json();
      this.remoteConfigFetched = true;
      this.remoteConfig = config;
    },
  },
});
