import { useState, useRef, useEffect } from 'react';

import ChevronDownSmallIcon from '@nokia-csf-uxr/ccfk-assets/latest/ChevronDownSmallIcon';

import SelectItem, {
	SelectListItem,
	SelectItemText,
	SelectItemButton,
	SelectItemBaseText,
} from '@nokia-csf-uxr/ccfk/SelectItem';

const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const isSelectionKeyPressed = (key) =>
	key && (key === ENTER_KEY || key === SPACE_KEY);

const PLACEHOLDER = 'Alarm level';

const SelectItemView = (props) => {
	const { handleSelectValueChange } = props;
	const selectItemRef = useRef(null);
	const selectItemButtonRef = useRef(null);
	const [value, setValue] = useState<string>('All Alarms');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		handleSelectValueChange?.(value);
	}, [value]);

	// handle list item selection and close dropdown list after item is selected
	const handleEvent = (theValue) => (event) => {
		const { type } = event;
		if (type === 'keydown') {
			if (isSelectionKeyPressed(event.key)) {
				setValue(theValue);
				setIsOpen(false);
			}
		} else if (type === 'click') {
			setValue(theValue);
			setIsOpen(false);
		}
	};

	// Render the necessary selected values and desired dropdown icon into the SelectItem base area.
	const renderSelectItemBase = (props) => {
		// only show ClearButton when there is a value and the dropdown is open
		return (
			<SelectItemButton
				ref={selectItemButtonRef}
				placeholder={PLACEHOLDER}
				dropdownIcon={<ChevronDownSmallIcon />}
				inputProps={{ value: value ? value : PLACEHOLDER }}
				aria-activedescendant={
					value === 'Critical'
						? 'selectitem-expansion-panels'
						: value === 'Major'
							? 'selectitem-simple-list'
							: value === 'Minor'
								? 'selectitem-tree'
								: ''
				}
				aria-label={value ? value : PLACEHOLDER}
				role="combobox"
				{...props}
			>
				{value && <SelectItemBaseText>{value}</SelectItemBaseText>}
			</SelectItemButton>
		);
	};

	return (
		<SelectItem
			ref={selectItemRef}
			isOpen={isOpen}
			onOpen={() => {
				setIsOpen(true);
			}}
			onClose={() => {
				setIsOpen(false);
			}}
			truncateListText
			listProps={{
				ulProps: { role: 'listbox', id: 'selectitem-dropdown-list' },
			}}
			renderSelectItemBase={renderSelectItemBase}
		>
			<SelectListItem
				id="selectitem-Critical"
				selected={value == 'Critical'}
				onClick={handleEvent('Critical')}
				onKeyDown={handleEvent('Critical')}
				role="option"
			>
				<SelectItemText>Critical</SelectItemText>
			</SelectListItem>
			<SelectListItem
				id="selectitem-Major"
				selected={value == 'Major'}
				onClick={handleEvent('Major')}
				onKeyDown={handleEvent('Major')}
				role="option"
			>
				<SelectItemText>Major</SelectItemText>
			</SelectListItem>
			<SelectListItem
				id="selectitem-Minor"
				selected={value == 'Minor'}
				onClick={handleEvent('Minor')}
				onKeyDown={handleEvent('Minor')}
				role="option"
			>
				<SelectItemText>Minor</SelectItemText>
			</SelectListItem>
			<SelectListItem
				id="selectitem-Warning"
				selected={value == 'Warning'}
				onClick={handleEvent('Warning')}
				onKeyDown={handleEvent('Warning')}
				role="option"
			>
				<SelectItemText>Warning</SelectItemText>
			</SelectListItem>
			<SelectListItem
				id="selectitem-Normal"
				selected={value == 'Normal'}
				onClick={handleEvent('Normal')}
				onKeyDown={handleEvent('Normal')}
				role="option"
			>
				<SelectItemText>Normal</SelectItemText>
			</SelectListItem>
			<SelectListItem
				id="selectitem-All"
				selected={value == 'All Alarms'}
				onClick={handleEvent('All Alarms')}
				onKeyDown={handleEvent('All Alarms')}
				role="option"
			>
				<SelectItemText>All Alarms</SelectItemText>
			</SelectListItem>
		</SelectItem>
	);
};

SelectItemView.displayname = 'SelectItemView';
export default SelectItemView;
