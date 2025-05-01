import { ReactComponentElement } from "react";

export interface IRoute {
  name: string;
  layout: string;
  path: string;
  icon?: JSX.Element;
  component?: any;
  secondary?: boolean;
  subRoutes?: IRoute[];  // New property for subroutes
}
