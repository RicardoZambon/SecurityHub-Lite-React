import { useMatches, type CustomRouteObject, type RouteObject } from "react-router-dom";
import type { Crumb } from '../../components/Breadcrumbs';

export function useCurrentRoute(): Crumb {
  const matches: CustomRouteObject[] = useMatches() as CustomRouteObject[];

  const crumbs: Crumb[] = matches
    .filter((m: RouteObject) => m.handle?.title)
    .map((m: CustomRouteObject) => ({
      label: m.handle!.title!,
      to: m.pathname,
      icon: m.handle!.icon,
    }));

  return crumbs[crumbs.length - 1];
}
