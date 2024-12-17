export const usePagination = () => {
  const router = useRouter();

  const handleNavigation = (page: number) => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page,
      },
    });
  };

  return {
    handleNavigation,
  };
};
