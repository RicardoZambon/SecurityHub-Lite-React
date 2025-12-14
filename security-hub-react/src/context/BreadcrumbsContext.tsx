import { createContext, useContext, useState } from "react";
import { useMatches, type CustomRouteObject, type RouteObject } from 'react-router-dom';

export type Crumb = {
  label: string,
  to: string,
  icon?: any,
}

type BreadcrumbsContextState = {
  breadcrumbs: Crumb[];
  extraBreadcrumbs?: Crumb[];
  setExtraBreadcrumbs: (crumbs: Crumb[]) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextState | undefined>(undefined);

export function BreadcrumbsProvider({ children }: { children: React.ReactNode }) {

  const matches: CustomRouteObject[] = useMatches() as CustomRouteObject[];
  const crumbs: Crumb[] = matches
    .filter((m: RouteObject) => m.handle?.title)
    .map((m: CustomRouteObject) => ({
      label: m.handle!.title!,
      to: m.pathname,
    }));

  const [extraBreadcrumbs, setExtraBreadcrumbs] = useState<Crumb[] | undefined>(undefined);

  function handleSetExtraBreadcrumbs(crumbs: Crumb[]) {
    setExtraBreadcrumbs(crumbs);
  }

  return (
    <BreadcrumbsContext.Provider value={{
      breadcrumbs: crumbs,
      extraBreadcrumbs,
      setExtraBreadcrumbs: handleSetExtraBreadcrumbs
    }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbs() {
  const ctx: BreadcrumbsContextState | undefined = useContext(BreadcrumbsContext);
  if (!ctx) {
    throw new Error("useBreadcrumbs must be used inside BreadcrumbsProvider");
  }
  return ctx;
}
