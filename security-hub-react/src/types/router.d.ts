import {RouteObject } from "react-router-dom";
import type { UIMatch } from 'react-router-dom';

declare module "react-router-dom" {
  interface CustomRouteObject extends RouteObject {
    handle?: {
      icon?: any,
      title?: string,
    }
  }
}
