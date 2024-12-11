import React, { useRef, useState, useEffect } from 'react';
// icons for search bar
import SearchSearchIcon from '@nokia-csf-uxr/ccfk-assets/latest/SearchSearchIcon'; // closed
import ExpandPanelIcon from '@nokia-csf-uxr/ccfk-assets/latest/ExpandPanelIcon'; // opened
// InfoChip icon
import ic_info_latest from '@nokia-csf-uxr/ccfk-assets/icons/latest/info-circle-fill.svg';

import ExpandableSearch, {
	ExpandableSearchButton,
} from '@nokia-csf-uxr/ccfk/ExpandableSearch';
import { ButtonText } from '@nokia-csf-uxr/ccfk/Button';
import ToggleButtonGroup, {
	ToggleGroupButton,
} from '@nokia-csf-uxr/ccfk/ToggleButtonGroup';

import VerticalDivider from '@nokia-csf-uxr/ccfk/VerticalDivider';
import { ChipLabel, ChipIcon, InfoChip } from '@nokia-csf-uxr/ccfk/Chip';

import SelectItemView from './SelectItemView';
import { AlarmCounts } from './DashboardPanel';

const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const ESCAPE = 'Escape';
const TAB = 'Tab';

const TOGGLES = [
	{
		id: '2G',
		text: '2G',
	},
	{
		id: '3G',
		text: '3G',
	},
	{
		id: '4G',
		text: '4G',
	},
	{
		id: '5G',
		text: '5G',
	},
];

const StoryChip = ({ status, label }) => (
	<InfoChip
		status={status}
		size="small"
		role="note"
		aria-label={label}
		style={{ margin: '0.625rem' }}
	>
		<ChipIcon src={ic_info_latest} />
		<ChipLabel label={label} />
	</InfoChip>
);

type ExpandableSearchBarProps = {
	typeSelectionHandler: (selection: string[]) => void;
	regionSelectionHandler: (selection: string) => void;
	alarmSelectionHandler: (selection: string) => void;
	alarmCounts: AlarmCounts;
};

const AlarmCountsPanel = (props: ExpandableSearchBarProps) => {
	const { alarmSelectionHandler, alarmCounts } = props;

	const [selectedAlarm, setSelectedAlarm] = useState<string>('All Alarms');
	const allAlarmsSelected = selectedAlarm === 'All Alarms';

	useEffect(() => {
		alarmSelectionHandler(selectedAlarm);
	}, []);

	const handleSelectValueChange = (alarmSelected: string) => {
		alarmSelectionHandler(alarmSelected);
		setSelectedAlarm(alarmSelected);
	};

	return (
		<div
			style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}
		>
			<div
				style={{
					width: '10rem',
					minWidth: '10rem',
					maxWidth: '10rem',
					alignSelf: 'center',
				}}
			>
				<SelectItemView handleSelectValueChange={handleSelectValueChange} />
			</div>
			<VerticalDivider style={{ height: '2.5rem', marginLeft: '0.625rem' }} />
			{(allAlarmsSelected || selectedAlarm === 'Critical') && (
				<StoryChip
					status="critical"
					label={`${alarmCounts.critical} Critical`}
				/>
			)}
			{(allAlarmsSelected || selectedAlarm === 'Major') && (
				<StoryChip status="yellow" label={`${alarmCounts.major} Major`} />
			)}
			{(allAlarmsSelected || selectedAlarm === 'Minor') && (
				<StoryChip status="minor" label={`${alarmCounts.minor} Minor`} />
			)}
			{(allAlarmsSelected || selectedAlarm === 'Warning') && (
				<StoryChip
					status="nokiaBlue"
					label={`${alarmCounts.warning} Warning`}
				/>
			)}
			{(allAlarmsSelected || selectedAlarm === 'Normal') && (
				<StoryChip status="lime" label={`${alarmCounts.normal} Normal`} />
			)}
		</div>
	);
};

export default AlarmCountsPanel;
