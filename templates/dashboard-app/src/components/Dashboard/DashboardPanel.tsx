import { useState } from 'react';
import { SimpleCard } from '@nokia-csf-uxr/ccfk/Card';
import { Typography } from '@nokia-csf-uxr/ccfk';

import ExpandableSearchBar from './ExpandableSearchBar';
import SimpleList from './SimpleList';
import SimpleTable from './SimpleTable';
import './styles.css';
import AlarmCountsPanel from './AlarmCountsPanel';

const CIRCLE_NUMBER_STYLE = (
	colour: string,
	background: string | undefined,
) => {
	const COLOR = colour ? colour : 'var(--color-brand-primary)';
	const BACKGROUND = background ? background : undefined;
	const STYLE = {
		border: `2px solid ${COLOR}`,
		color: `${COLOR}`,
		backgroundColor: `${BACKGROUND}`,
		borderRadius: 'var(--radius-circle)',
		height: '80px',
		width: '80px',
		textAlign: 'center',
		lineHeight: 'var(--font-line-height-large)',
		opacity: 'var(--opacity-mid)',
		display: 'flex',
		alignItems: 'center',
	};
	return STYLE;
};

export const CircleNumber = (props) => (
	// @ts-ignore
	<div style={{ ...CIRCLE_NUMBER_STYLE(props.colour, props.background) }}>
		<Typography
			typography="BODY"
			style={{
				fontSize: 'var(--font-size-large)',
				lineHeight: 'var(--font-line-height-large)',
			}}
		>
			{props.children}
		</Typography>
	</div>
);

const CardContents = (props) => (
	<SimpleCard
		style={{ padding: 'var(--spacing-large)', height: 195, width: 358 }}
		hoverEffect
		focusEffect
	>
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: 'var(--spacing-large)',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--spacing-small)',
				}}
			>
				<Typography
					typography="TITLE_16"
					style={{ color: 'var(--g-color-global-secondary-text)' }}
				>
					{props.title}
				</Typography>
				<CircleNumber colour="var(--g-color-status-minor)">
					{props.circle1Inner}
				</CircleNumber>
				<Typography
					typography="MICRO"
					style={{
						color: 'var(--g-color-global-secondary-text)',
						alignSelf: 'center',
					}}
				>
					{props.circle1}
				</Typography>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--spacing-small)',
				}}
			>
				<Typography
					typography="TITLE_16"
					style={{ color: 'var(--g-color-global-secondary-text)' }}
				></Typography>
				<CircleNumber
					colour="var(--color-status-fault-dark)"
					background="var(--g-color-status-minor)"
				>
					{props.circle2Inner}
				</CircleNumber>
				<Typography
					typography="MICRO"
					style={{
						color: 'var(--g-color-global-secondary-text)',
						alignSelf: 'center',
					}}
				>
					{props.circle2}
				</Typography>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 'var(--spacing-small)',
				}}
			>
				<Typography
					typography="TITLE_16"
					style={{ color: 'var(--g-color-global-secondary-text)' }}
				></Typography>
				<CircleNumber
					colour="var(--g-color-global-secondary-disabled-content)"
					background="var(--g-color-status-minor-disabled)"
				>
					{props.circle3Inner}
				</CircleNumber>
				<Typography
					typography="MICRO"
					style={{
						color: 'var(--g-color-global-secondary-text)',
						alignSelf: 'center',
					}}
				>
					{props.circle3}
				</Typography>
			</div>
		</div>
	</SimpleCard>
);

export type AlarmCounts = {
	critical: number;
	major: number;
	minor: number;
	warning: number;
	normal: number;
};

const defaultCounter = {
	critical: 0,
	major: 0,
	minor: 0,
	warning: 0,
	normal: 0,
};

const DashboardPanel = () => {
	const [selectedTypes, setSelectedTypes] = useState<string[]>(null);
	const [selectedRegion, setSelectedRegion] = useState('');
	const [selectedAlarmLevel, setSelectedAlarmLevel] = useState('');
	const [alarmCounts, setAlarmCounts] = useState<AlarmCounts>(defaultCounter);

	const handleTypeSelection = (selection: string[]) => {
		setSelectedTypes(selection);
	};

	const handleRegionSelection = (selection: string) => {
		setSelectedRegion(selection);
	};

	const handleAlarmLevelSelection = (selection: string) => {
		setSelectedAlarmLevel(selection);
	};

	// number of each alarm type in the dataset
	const collectAlarmCounts = (alarmCountArray) => {
		setAlarmCounts(alarmCountArray);
	};

	return (
		<div style={{ width: '100%', height: 'inherit' }}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '2rem',
					justifyContent: 'flex-start',
					margin:
						'0 var(--spacing-xx-small) var(--spacing-small) var(--spacing-xx-small)',
				}}
			>
				<CardContents
					title="Overall"
					circle1="Quality of Service"
					circle1Inner="73"
					circle2="Change"
					circle2Inner="-1%"
					circle3="6h prediction"
					circle3Inner="72"
				/>
				<CardContents
					title="Regions"
					circle1="Quality of Service"
					circle1Inner="73"
					circle2="Change"
					circle2Inner="-1%"
					circle3="6h prediction"
					circle3Inner="72"
				/>
				<CardContents
					title="Services"
					circle1="Quality of Service"
					circle1Inner="96"
					circle2="Change"
					circle2Inner="-1%"
					circle3="6h prediction"
					circle3Inner="95"
				/>
				<CardContents
					title="Customers"
					circle1="Quality of Service"
					circle1Inner="75"
					circle2="Change"
					circle2Inner="+2%"
					circle3="6h prediction"
					circle3Inner="77"
				/>
			</div>

			<div className="dashboard-content">
				<div className="dashboard-columm">
					<ExpandableSearchBar
						typeSelectionHandler={handleTypeSelection}
						regionSelectionHandler={handleRegionSelection}
					/>
					<SimpleTable
						selectedTypes={selectedTypes}
						selectedRegion={selectedRegion}
					/>
				</div>
				<div className="dashboard-columm">
					<AlarmCountsPanel
						alarmSelectionHandler={handleAlarmLevelSelection}
						alarmCounts={alarmCounts}
					></AlarmCountsPanel>
					<SimpleList
						selectedAlarmLevel={selectedAlarmLevel}
						alarmCounts={collectAlarmCounts}
					/>
				</div>
			</div>
		</div>
	);
};

DashboardPanel.displayname = 'DashboardPanel';
export default DashboardPanel;
