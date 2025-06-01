import { ComponentType, Element, ReactNode } from 'react';

export interface IRoute {
  path: string;
  name: string;
  layout?: string;
  exact?: boolean;

  component?: ComponentType<any>;
  icon?: JSX.Element | ComponentType<any> | string | Element;

  secondary?: boolean;
  collapse?: boolean;
  disabled?: boolean;
  invisible?: boolean;

  rightElement?: boolean;

  // Sub-navigation
  subRoutes?: IRoute[];
  items?: IRoute[];
}
