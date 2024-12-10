import LaunchpadAssureOptimizeIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationAssureAndOptimizeIcon';
import LaunchpadAutomateIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationAutomationIcon';
import LaunchpadCareIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationCareIcon';
// FF theme icons
import LaunchpadConfigurationIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationConfigurationIcon';
import LaunchpadUserAssitanceIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationHelpIcon';
import LaunchpadInsightsIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationInsightsIcon';
import LaunchpadInventoryIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationInventoryIcon';
import LaunchpadMonitoringIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationMonitoringIcon';
import LaunchpadOpticalIonIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationOpticalNiIcon';
import LaunchpadOrchestrateFulfillIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationOrchestrateAndFullfillIcon';
import LaunchpadSecurityIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationSecurityIcon';
import LaunchpadAdministrationIcon from '@nokia-csf-uxr/ccfk-assets/latest/ApplicationUserAndRoleManagementIcon';

import {
	LaunchPadContent,
	LaunchPadTile,
	LaunchPadTileIcon,
	LaunchPadTileSubtitle,
	LaunchPadTileTitle,
} from '@nokia-csf-uxr/ccfk/LaunchPad';

const ICON_SIZE = 50;

const ServicesLaunchPad = () => {
	return (
		<LaunchPadContent>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK assure & optimize');
				}}
				aria-label="Assure & Optimize"
			>
				<LaunchPadTileIcon>
					<LaunchpadAssureOptimizeIcon
						size={ICON_SIZE}
						color="var(--g-color-assure-and-optimize)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Assure & Optimize</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Automation');
				}}
				aria-label="Automation"
			>
				<LaunchPadTileIcon>
					<LaunchpadAutomateIcon
						size={ICON_SIZE}
						color="var(--g-color-automate)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Automation</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK User and Role Management');
				}}
				aria-label="User and Role Management"
			>
				<LaunchPadTileIcon>
					<LaunchpadAdministrationIcon
						size={ICON_SIZE}
						color="var(--g-color-administration)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>User and Role Management</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Care');
				}}
				aria-label="Care"
			>
				<LaunchPadTileIcon>
					<LaunchpadCareIcon size={ICON_SIZE} color="var(--g-color-care)" />
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Care</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Help');
				}}
				aria-label="Help"
			>
				<LaunchPadTileIcon>
					<LaunchpadUserAssitanceIcon
						size={ICON_SIZE}
						color="var(--g-color-user-assistance)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Help</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Inventory');
				}}
				aria-label="Inventory"
			>
				<LaunchPadTileIcon>
					<LaunchpadInventoryIcon
						size={ICON_SIZE}
						color="var(--g-color-inventory)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Inventory</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Monitoring');
				}}
				aria-label="Monitoring"
			>
				<LaunchPadTileIcon>
					<LaunchpadMonitoringIcon
						size={ICON_SIZE}
						color="var(--g-color-monitoring)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Monitoring</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Orchestrate & Fulfill');
				}}
				ria-label="Orchestrate & Fulfill"
			>
				<LaunchPadTileIcon>
					<LaunchpadOrchestrateFulfillIcon
						size={ICON_SIZE}
						color="var(--g-color-orchestrate-and-fulfill)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Orchestrate & Fulfill</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Security');
				}}
				aria-label="Security"
			>
				<LaunchPadTileIcon>
					<LaunchpadSecurityIcon
						size={ICON_SIZE}
						color="var(--g-color-security)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Security</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Optical');
				}}
				aria-label="Optical"
			>
				<LaunchPadTileIcon>
					<LaunchpadOpticalIonIcon
						size={ICON_SIZE}
						color="var(--g-color-optical)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Optical (ION)</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Configuration');
				}}
				aria-label="Configuration"
			>
				<LaunchPadTileIcon>
					<LaunchpadConfigurationIcon
						size={ICON_SIZE}
						color="var(--g-color-sam)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileTitle>Configuration</LaunchPadTileTitle>
			</LaunchPadTile>
			<LaunchPadTile
				onClick={() => {
					console.log('CLICK Insights');
				}}
				aria-label="Insights"
			>
				<LaunchPadTileIcon>
					<LaunchpadInsightsIcon
						size={ICON_SIZE}
						color="var(--g-color-insights)"
					/>
				</LaunchPadTileIcon>
				<LaunchPadTileSubtitle>Key Suite</LaunchPadTileSubtitle>
				<LaunchPadTileTitle>Insights</LaunchPadTileTitle>
			</LaunchPadTile>
		</LaunchPadContent>
	);
};

export default ServicesLaunchPad;
