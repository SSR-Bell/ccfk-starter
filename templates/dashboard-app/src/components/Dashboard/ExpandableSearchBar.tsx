import React, { useRef, useState, useEffect } from 'react';
// icons for search bar
import SearchSearchIcon from '@nokia-csf-uxr/ccfk-assets/latest/SearchSearchIcon'; // closed
import ExpandPanelIcon from '@nokia-csf-uxr/ccfk-assets/latest/ExpandPanelIcon'; // opened

import ExpandableSearch, {
	ExpandableSearchButton,
} from '@nokia-csf-uxr/ccfk/ExpandableSearch';
import { ButtonText } from '@nokia-csf-uxr/ccfk/Button';
import ToggleButtonGroup, {
	ToggleGroupButton,
} from '@nokia-csf-uxr/ccfk/ToggleButtonGroup';

import VerticalDivider from '@nokia-csf-uxr/ccfk/VerticalDivider';

import { AlarmCounts } from './DashboardPanel';

const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const ESCAPE = 'Escape';
const TAB = 'Tab';

const TOGGLES = [
	{ id: '2G', text: '2G' },
	{ id: '3G', text: '3G' },
	{ id: '4G', text: '4G' },
	{ id: '5G', text: '5G' },
];

type ExpandableSearchBarProps = {
	typeSelectionHandler: (selection: string[]) => void;
	regionSelectionHandler: (selection: string) => void;
};

const ExpandableSearchBar = (props: ExpandableSearchBarProps) => {
	const { typeSelectionHandler, regionSelectionHandler } = props;

	const [expanded, setIsExpanded] = useState<boolean>(false);
	const [selectedButtons, setSelectedButtons] = useState<string[]>(
		TOGGLES.map((toggle) => toggle.id),
	);
	const inputRef = useRef(null);
	const [searchValue, setSearchValue] = React.useState<string>('');

	useEffect(() => {
		if (expanded) {
			inputRef.current && inputRef.current.focus();
		}
	}, [expanded]);

	const handleExpansionToggle = () => {
		setIsExpanded(!expanded);
	};

	const handleToggleButtonChange = (data) => {
		const { event, id } = data;
		if (event.key && event.key === ESCAPE) {
			const newSelectButton = selectedButtons.filter((id) => id !== id);
			setSelectedButtons(newSelectButton);
		} else if (event.key !== TAB && event.key !== 'Shift') {
			let newSelectButton = [...selectedButtons];
			if (
				event.key === SPACE_KEY ||
				event.key === ENTER_KEY ||
				data.event.nativeEvent.type === 'mousedown'
			) {
				if (selectedButtons.indexOf(id) !== -1) {
					newSelectButton = newSelectButton.filter(
						(selectedId) => selectedId !== id,
					);
				} else {
					newSelectButton.push(id);
				}
			}
			setSelectedButtons(newSelectButton);
			typeSelectionHandler(newSelectButton);
		}
	};

	return (
		<div
			style={{
				display: 'flex',
				width: '100%',
				gap: 'var(--spacing-x-small)',
				marginBottom: '1rem',
			}}
		>
			<ExpandableSearch
				variant="right"
				expanded={expanded}
				value={searchValue}
				onChange={(e) => {
					setSearchValue(e.target.value);
					regionSelectionHandler(e.target.value);
				}}
				textInputProps={{
					placeholder: 'Region',
					showClearButton: true,
					clearButtonProps: {
						onClick: () => {
							setSearchValue('');
							regionSelectionHandler('');
							inputRef.current && inputRef.current.focus();
						},
					},
					inputProps: {
						ref: inputRef,
						'aria-label': 'Search for region',
					},
				}}
				renderButton={
					<ExpandableSearchButton
						searchIcon={<SearchSearchIcon />}
						collapseIcon={<ExpandPanelIcon />}
						onClick={handleExpansionToggle}
						tooltipProps={{
							tooltip: expanded ? 'Enter region' : 'Expand search bar',
						}}
					/>
				}
			/>
			<VerticalDivider style={{ display: 'block', height: '2rem' }} />
			<ToggleButtonGroup>
				{TOGGLES.map((button, index) => {
					return (
						<ToggleGroupButton
							key={button.id}
							aria-label={button.text}
							style={{ alignSelf: 'center' }}
							isSelected={selectedButtons.indexOf(button.id) !== -1}
							onChange={(event) =>
								handleToggleButtonChange({ event, index, ...button })
							}
							lastButton={index === TOGGLES.length - 1}
							firstButton={index === 0}
						>
							<ButtonText>{button.text}</ButtonText>
						</ToggleGroupButton>
					);
				})}
			</ToggleButtonGroup>
		</div>
	);
};

export default ExpandableSearchBar;
