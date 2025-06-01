import { IRoute } from "@/types/navigation";

export const isWindowAvailable = () => typeof window !== "undefined";

const findRouteByPathname = (routes: IRoute[], pathname: string): IRoute | null => {
  for (const route of routes) {
    const fullPath = `${route.layout || ""}${route.path}`;
    if (fullPath === pathname) {
      return route;
    }
    if (route.subRoutes && route.subRoutes.length > 0) {
      const nested = findRouteByPathname(route.subRoutes, pathname);
      if (nested) return nested;
    }
  }
  return null;
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findRouteByPathname(routes, pathname);
  return route?.name || "Dashboard";
};

export const getActiveNavbar = (routes: IRoute[], pathname: string): boolean => {
  const route = findRouteByPathname(routes, pathname);
  return route?.secondary || false;
};

export const getActiveNavbarText = (routes: IRoute[], pathname: string): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};