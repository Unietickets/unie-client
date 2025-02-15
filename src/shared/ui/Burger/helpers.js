import { ROUTES } from "@/core/routes";

export const cutHelpPages = (routes) => {
  return routes.filter(
    (page) => page.href !== ROUTES.FAQ.href
      && page.href !== ROUTES.support.href
  );
}
