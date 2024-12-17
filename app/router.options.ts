import { parse, stringify } from "qs";

export default {
  parseQuery: parse,
  stringifyQuery: stringify,
  scrollBehavior: () => {
    return { top: 0 };
  },
};
