import { ROUTES } from '@core/constants';

import { Header as UiHeader } from '../ui';

export const Header = () => <UiHeader routes={Object.values(ROUTES)} />
