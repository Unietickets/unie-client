export const createMediaQueries = (breakpoints) => ({
    gt: Object.keys(breakpoints).reduce((acc, key) => ({
      ...acc,
      [key]: `@media screen and (min-width: ${breakpoints[key]}px)`,
    }), {})
});
