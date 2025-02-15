export const ROUTES = {
  home: {
    href: '/',
    label: 'Home'
  },
  profile: {
      href: '/profile',
      label: 'Profile'
  },
  events: {
      href: '/events',
      label: 'Events'
  },
//   event: {
//     href: '/events/[id]',
//     label: 'Events'
// },
  withdraw: {
      href: '/balance/withdraw',
      label: 'Withdraw'
  },
  deposit: {
      href: '/balance/deposit',
      label: 'Deposit'
  },
  signUp: {
      href: '/auth/sign-up',
      label: 'Sign Up'
  },
  signIn: {
      href: '/auth/sign-in',
      label: 'Sign In'
  },
}

export const PROTECTED_ROUTES = [
  ROUTES.profile,
  ROUTES.deposit,
  ROUTES.withdraw
];

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.signIn,
  ROUTES.signUp,
  ROUTES.events,
  // ROUTES.event,
];

export const AUTHORIZED_ROUTES = [
  ...PROTECTED_ROUTES,
  ROUTES.home,
  ROUTES.events,
];

export const ALL_ROUTES = [
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES
];
