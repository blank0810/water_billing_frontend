import { IRoute } from "types/navigation";

export const isWindowAvailable = () => typeof window !== "undefined";

export const findCurrentRoute = (routes: IRoute[]): IRoute => {
  if (!isWindowAvailable()) return {} as IRoute;

  const currentPath = window.location.pathname;

  const flatRoutes = routes;

  const foundRoute = flatRoutes.find((route) =>
    currentPath.startsWith(route.layout + route.path)
  );

  return foundRoute || ({} as IRoute);
};

export const getActiveRoute = (routes: IRoute[]): string => {
  const route = findCurrentRoute(routes);
  return route?.name || "Dashboard";
};

export const getActiveNavbar = (routes: IRoute[]): boolean => {
  const route = findCurrentRoute(routes);
  return route?.secondary || false;
};

export const getActiveNavbarText = (routes: IRoute[]): string | boolean => {
  return getActiveRoute(routes) || false;
};
