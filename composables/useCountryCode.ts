export const useCountryCode = () => {
  const countries = {
    AT: "Österreich",
    BE: "Belgien",
    BG: "Bulgarien",
    CY: "Zypern",
    CZ: "Tschechien",
    DE: "Deutschland",
    DK: "Dänemark",
    EE: "Estland",
    ES: "Spanien",
    FI: "Finnland",
    FR: "Frankreich",
    GB: "Vereinigtes Königreich",
    GR: "Griechenland",
    HR: "Kroatien",
    HU: "Ungarn",
    IE: "Irland",
    IT: "Italien",
    LT: "Litauen",
    LU: "Luxemburg",
    LV: "Lettland",
    MT: "Malta",
    NL: "Niederlande",
    PL: "Polen",
    PT: "Portugal",
    RO: "Rumänien",
    SE: "Schweden",
    SI: "Slowenien",
    SK: "Slowakei",
    CH: "Schweiz",
  };

  const getCountryName = (code: string) => {
    return countries[code.toUpperCase()];
  };

  const countryOptions = Object.entries(countries)
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map(([code, name]) => ({
      value: code.toLocaleLowerCase(),
      label: name,
    }));

  return {
    getCountryName,
    countryOptions,
  };
};
