import { useMatches, type CustomRouteObject, type RouteObject } from "react-router-dom";
import type { Crumb } from '../../context/BreadcrumbsContext';

export function useCurrentRoute(): Crumb {
  const matches: CustomRouteObject[] = useMatches() as CustomRouteObject[];

  const crumbs: Crumb[] = matches
    .filter((m: RouteObject) => m.handle?.title)
    .map((m: CustomRouteObject) => ({
      icon: m.handle!.icon,
      label: m.handle!.title!,
      to: m.pathname,
    }));

  return crumbs[crumbs.length - 1];
}
