import { useMatches, type CustomRouteObject, type RouteObject } from "react-router-dom";
import type { Crumb } from '../components/Breadcrumbs';

export function useBreadcrumbs(extraCrumbs?: Crumb[]): Crumb[] {
  const matches: CustomRouteObject[] = useMatches() as CustomRouteObject[];

  const crumbs: Crumb[] = matches
    .filter((m: RouteObject) => m.handle?.breadcrumb)
    .map(m => ({
      label: m.handle!.breadcrumb!,
      to: m.pathname,
      icon: m.handle!.icon,
    }));

  if (extraCrumbs) {
    return [...crumbs, ...extraCrumbs];
  }

  return crumbs;
}
