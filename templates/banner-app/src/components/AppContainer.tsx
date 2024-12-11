import { createContext } from 'react';
import _concat from 'lodash/concat';

import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';
import App, { AppHeader, AppContent, AppBody } from '@nokia-csf-uxr/ccfk/App';
import AppBanner, {
	AppBannerLogo,
	AppBannerName,
	AppBannerNameSecondary,
	AppBannerContent,
} from '@nokia-csf-uxr/ccfk/AppBanner';

import UserAccountPanel from './UserAccountPanel';
import QuickHelpPanel from './QuickHelpPanel';
import NotificationsPanel from './NotificationsPanel';

type THEME =
	| 'CCFK FreeForm - Light'
	| 'CCFK FreeForm - Dark'
	| 'CCFK FreeForm - High contrast dark'
	| 'CCFK FreeForm - High contrast light';

const appTheme: THEME =
	import.meta.env.VITE_REACT_APP_THEME ?? 'CCFK FreeForm - Light';
const productName: THEME = import.meta.env.VITE_REACT_APP_NAME ?? 'ProductName';
const productDescription: THEME =
	import.meta.env.VITE_REACT_APP_DESCRIPTION ?? 'ProducDescription';

type AppContainerContext = {
	productName: string;
	productDescription: string;
};

export const AppContainerContext = createContext<AppContainerContext>({
	productName,
	productDescription,
});

const AppContainer = () => {
	return (
		<AdvancedTheme advancedTheme={appTheme}>
			<App>
				<AppHeader>
					<AppBanner>
						<AppBannerLogo />
						<AppBannerName>{productName}</AppBannerName>
						<AppBannerNameSecondary>
							{productDescription}
						</AppBannerNameSecondary>
						<AppBannerContent>
							<UserAccountPanel />
							<NotificationsPanel />
							<QuickHelpPanel />
						</AppBannerContent>
					</AppBanner>
				</AppHeader>
				<AppBody>
					<AppContent>Your App content Here</AppContent>
				</AppBody>
			</App>
		</AdvancedTheme>
	);
};

export default AppContainer;
