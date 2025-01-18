import { Header as UiHeader } from '../ui';

const ROUTES = [
    {
        href: '/profile',
        label: 'Profile'
    },
    {
        href: '/events',
        label: 'Events'
    },
    {
        href: '/balance/withdraw',
        label: 'Withdraw'
    },
    {
        href: '/balance/deposit',
        label: 'Deposit'
    },
    {
        href: '/auth/signup',
        label: 'Sign Up'
    },
];

export const Header = () => <UiHeader routes={ROUTES} />
