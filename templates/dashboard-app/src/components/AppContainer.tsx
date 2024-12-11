import { createContext, useEffect, useRef, useState } from 'react';
import _concat from 'lodash/concat';

import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';
import App, { AppHeader, AppContent, AppBody } from '@nokia-csf-uxr/ccfk/App';
import AppBanner, {
	AppBannerLogo,
	AppBannerName,
	AppBannerNameSecondary,
	AppBannerContent,
} from '@nokia-csf-uxr/ccfk/AppBanner';

import SideDrawer, {
	SideDrawerButton,
	SideDrawerList,
	SideDrawerItem,
	SideDrawerItemDivider,
} from '@nokia-csf-uxr/ccfk/SideDrawer';

import DashboardIcon from '@nokia-csf-uxr/ccfk-assets/latest/DashboardIcon';
import ToolIcon from '@nokia-csf-uxr/ccfk-assets/latest/ToolIcon';
import ReportsIcon from '@nokia-csf-uxr/ccfk-assets/latest/ReportsIcon';
import SettingsIcon from '@nokia-csf-uxr/ccfk-assets/latest/SettingsIcon';

import UserAccountPanel from './UserAccountPanel';
import QuickHelpPanel from './QuickHelpPanel';
import NotificationsPanel from './NotificationsPanel';
import TasksPanel from './TasksPanel';
import ReportsPanel from './ReportsPanel';
import SettingsPanel from './SettingsPanel';
import DashboardPanel from './Dashboard/DashboardPanel';

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
	const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const SideDrawerButtonRef = useRef<any>(null);
	const sideDrawerRef = useRef<any>(null);

	const SideDrawerButtonProps = {
		buttonProps: {
			ref: SideDrawerButtonRef,
			onClick: () => {
				setIsSideDrawerVisible(!isSideDrawerVisible);
			},
			onKeyUp: (event: React.KeyboardEvent) => {
				event.key === 'ArrowDown' && sideDrawerRef.current?.focus();
			},
			'aria-label': 'Side Navigation Menu',
		},
	};

	const itemProps = (index: number, label: string) => {
		const selected = selectedIndex === index;
		let ariaLabel = selected ? `${label} selected` : label;
		ariaLabel = ariaLabel;
		return {
			onKeyPress: (event: React.KeyboardEvent) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					setSelectedIndex(index);
				}
			},
			onClick: () => {
				setSelectedIndex(index);
			},
			selected,
			'aria-label': ariaLabel,
		};
	};

	const SideDrawerProps = {
		modalMaskProps: {
			onClick: () => {
				setIsSideDrawerVisible(false);
			},
		},
		trapFocus: false,
		onKeyDown: (event: React.KeyboardEvent) => {
			event.key === 'Escape' && setIsSideDrawerVisible(false);
			event.key === 'Escape' && SideDrawerButtonRef.current?.focus(); // focus on SideDrawerButton when ESC is pressed
		},
		visible: isSideDrawerVisible,
		variant: 'compact',
	};

	useEffect(() => {
		if (!isSideDrawerVisible) {
			SideDrawerButtonRef.current?.focus();
		}
	}, [isSideDrawerVisible]);

	return (
		<AdvancedTheme advancedTheme={appTheme}>
			<App>
				<AppHeader>
					<AppBanner>
						<SideDrawerButton {...SideDrawerButtonProps} />
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
					<SideDrawer {...SideDrawerProps}>
						<SideDrawerList>
							<SideDrawerItem
								ref={sideDrawerRef}
								icon={<DashboardIcon />}
								label="Dashboard"
								{...itemProps(0, 'Dashboard')}
							/>
							<SideDrawerItem
								icon={<ToolIcon />}
								label="My tasks"
								{...itemProps(1, 'My tasks')}
							/>
							<SideDrawerItem
								icon={<ReportsIcon />}
								label="Reports"
								{...itemProps(2, 'Reports')}
							/>
						</SideDrawerList>
						<SideDrawerList style={{ height: '3.25rem' }}>
							<SideDrawerItemDivider />
							<SideDrawerItem
								icon={<SettingsIcon />}
								label="Settings"
								{...itemProps(3, 'Settings')}
							/>
						</SideDrawerList>
					</SideDrawer>
					<AppContent>
						{selectedIndex === 0 && <DashboardPanel />}
						{selectedIndex === 1 && <TasksPanel />}
						{selectedIndex === 2 && <ReportsPanel />}
						{selectedIndex === 3 && <SettingsPanel />}
					</AppContent>
				</AppBody>
			</App>
		</AdvancedTheme>
	);
};

export default AppContainer;
