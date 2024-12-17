import { generateClasses } from "@formkit/themes";
import { DefaultConfigOptions } from "@formkit/vue";
import { de } from "@formkit/i18n";

const inputClasses = {
  outer: "mb-8",
  wrapper: "relative",
  label:
    "absolute -top-2 left-2 inline-block bg-bg-primary px-1 text-xs font-medium text-gray-900 z-10 whitespace-nowrap text-ellipsis overflow-hidden max-w-[calc(100%-1rem)]",
  input:
    "form-input w-full rounded-md border-gray-300 bg-bg-primary shadow-sm focus:border-ci-primary focus:ring-ci-primary",
  suffixIcon: "absolute right-2 top-2 text-gray-900",
};

export default {
  locales: { de },
  locale: "de",
  config: {
    classes: generateClasses({
      global: {
        outer: "w-full mb-8",
        message: "mt-2 text-sm px-3 text-red-600",
      },
      text: inputClasses,
      search: inputClasses,
      email: inputClasses,
      password: inputClasses,
      number: inputClasses,
      textarea: {
        ...inputClasses,
        input: `${inputClasses.input} min-h-[120px]`,
      },
      checkbox: {
        legend: "text-sm font-medium text-gray-900 mb-2",
        wrapper: "flex items-start mb-4 w-max",
        inner: "flex h-5 items-center",
        label: "text-sm ml-2",
        input:
          "form-checkbox h-4 w-4 rounded text-ci-primary border-gray-300 p-0 focus:ring-ci-primary",
        decorator: "hidden",
        options: "flex gap-4",
      },
      radio: {
        wrapper: "flex items-start mb-4",
        inner: "flex h-5 items-center",
        label: "text-sm ml-3",
        input:
          "form-radio h-4 w-4 rounded-full text-ci-primary border-gray-300 p-0 focus:ring-ci-primary",
        decorator: "hidden",
        options: "flex gap-4",
      },
      select: {
        outer: "mb-8",
        wrapper: "relative",
        label:
          "absolute -top-2 left-2 inline-block bg-bg-primary px-1 text-xs font-medium text-gray-900 z-10 whitespace-nowrap text-ellipsis overflow-hidden max-w-[calc(100%-1rem)]",
        input:
          "form-select w-full rounded-md border-gray-300 bg-bg-primary shadow-sm focus:border-ci-primary",
      },
      submit: {
        input: "btn",
      },
    }),
  },
} as DefaultConfigOptions;
