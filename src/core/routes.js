import {
  ArrowUpIcon,
  QuestionIcon,
  ReceiptIcon,
  SackDollarIcon,
  UserHeadsetIcon,
  UserIcon
} from "@/shared/ui";

export const ROUTES = {
  home: {
    href: '/',
    label: 'Home',
    type: 'inner',
  },
  profile: {
    Icon: UserIcon,
    href: '/profile',
    label: 'My account',
    type: 'inner',
  },
  events: {
    Icon: ArrowUpIcon,
    href: '/events',
    label: 'Events',
    type: 'outer',
  },
  withdraw: {
      href: '/balance/withdraw',
      label: 'Withdraw',
      type: 'inner',
  },
  deposit: {
      href: '/balance/deposit',
      label: 'Deposit',
      type: 'inner',
  },
  signUp: {
      href: '/auth/sign-up',
      label: 'Sign Up',
      type: 'outer',
  },
  signIn: {
      href: '/auth/sign-in',
      label: 'Sign In',
      type: 'outer',
  },
  tickets: {
    href: '/tickets',
    label: 'Tickets',
    type: 'inner',
    ownList: {
      Icon: ReceiptIcon,
      href: '/tickets/own',
      label: 'My tickets',
      type: 'inner',
    },
    create: {
      Icon: SackDollarIcon,
      href: '/tickets/create',
      label: 'Cell tickets',
      type: 'inner',
    }
  },
  support: {
    Icon: UserHeadsetIcon,
    href: '/support',
    label: 'Support',
    type: 'outer',
  },
  FAQ: {
    Icon: QuestionIcon,
    href: '/FAQ',
    label: 'FAQ',
    type: 'outer',
  },
  termsAndConditions: {
    href: '/terms-and-conditions',
    label: 'Terms and Conditions',
    type: 'outer',
  },
  payment: {
    href: '/payment',
    label: 'Payment',
    type: 'inner',
  }
}

export const PROTECTED_ROUTES = [
  ROUTES.profile,
  ROUTES.deposit,
  ROUTES.withdraw,
  ROUTES.tickets.ownList,
];

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.signIn,
  ROUTES.signUp,
  ROUTES.events,
  ROUTES.tickets.create,
  ROUTES.support,
  ROUTES.FAQ,
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
