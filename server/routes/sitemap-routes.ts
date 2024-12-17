export default defineEventHandler(async (event: any) => {
  const { req, res } = event;

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }
  const config = useRuntimeConfig();
  const fetchUrls = async () => {
    const routes: string[] = [];
    const products = await $fetch<any>(`${config.public.apiUrl}/products?all`);
    const articles = await $fetch<any>(`${config.public.apiUrl}/articles?all`);
    const fabrics = await $fetch<any>(`${config.public.apiUrl}/fabrics?all`);

    if (products && products.results) {
      products.results.forEach((product: any) => {
        routes.push(`/selbst-gestalten/${product._id}`);
      });
    }

    if (articles && articles.results) {
      articles.results.forEach((article: any) => {
        routes.push(`/artikel/${article._id}`);
      });
    }

    if (fabrics && fabrics.results) {
      fabrics.results.forEach((fabric: any) => {
        routes.push(`/stoffe/${fabric._id}`);
      });
    }

    return routes;
  };

  return await fetchUrls();
});
