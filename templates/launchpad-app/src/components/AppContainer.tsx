import _concat from 'lodash/concat';
import { createContext } from 'react';

import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';
import AppBanner, {
	AppBannerLogo,
	AppBannerName,
	AppBannerNameSecondary,
	AppBannerContent,
} from '@nokia-csf-uxr/ccfk/AppBanner';

import LaunchPad, {
	LaunchPadHeader,
	LaunchPadFooter,
} from '@nokia-csf-uxr/ccfk/LaunchPad';
import Typography from '@nokia-csf-uxr/ccfk/Typography/Typography';
import NotificationsPanel from './NotificationsPanel';
import QuickHelpPanel from './QuickHelpPanel.tsx';
import ServicesLaunchPad from './ServicesLaunchpad.tsx';
import UserAccountPanel from './UserAccounPanel.tsx';

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
			<LaunchPad>
				<LaunchPadHeader>
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
				</LaunchPadHeader>
				<ServicesLaunchPad></ServicesLaunchPad>
				<LaunchPadFooter style={{ paddingBottom: 12 }}>
					<Typography typography="CAPTION">
						© {new Date().getFullYear()} Nokia
					</Typography>
				</LaunchPadFooter>
			</LaunchPad>
		</AdvancedTheme>
	);
};

export default AppContainer;
