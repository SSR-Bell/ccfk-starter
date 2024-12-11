import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import _toLower from 'lodash/toLower';
import _throttle from 'lodash/throttle';
import _debounce from 'lodash/debounce';

import RanIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/Wifi1Icon';
import AnomalyIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/AndroidShareIcon';
import AntennaIcon_latest from '@nokia-csf-uxr/ccfk-assets/legacy/WifiConnectedEquipmentIcon';
import BaselineWifiIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/PhoneWifiIcon';
import ComputerIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/ServerIcon';
import IotIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/CellTechnologyIotIcon';
import StarIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/ActiveIcon';
import DeleteIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/DeleteIcon';
import AdminSettingsIcon_latest from '@nokia-csf-uxr/ccfk-assets/latest/SettingsIcon';
import InternetIcon from '@nokia-csf-uxr/ccfk-assets/latest/InternetIcon';
import IntranetIcon from '@nokia-csf-uxr/ccfk-assets/latest/IntranetIcon';

import { getContext } from '@nokia-csf-uxr/ccfk/common';
import List, {
	ListItemBasic,
	ListItemText,
	ListItemTextContainer,
	ListItemSubText,
} from '@nokia-csf-uxr/ccfk/List';

// @ts-ignore
import data from './data/mockdata';
const ROW_HEIGHT = 60;
const ICON_PROPS = {
	style: { paddingBottom: '0.375rem' },
};
const LIST_ICONS = [
	<AdminSettingsIcon_latest {...ICON_PROPS} />,
	<RanIcon_latest {...ICON_PROPS} />,
	<AnomalyIcon_latest {...ICON_PROPS} />,
	<AntennaIcon_latest {...ICON_PROPS} />,
	<BaselineWifiIcon_latest {...ICON_PROPS} />,
	<ComputerIcon_latest {...ICON_PROPS} />,
	<IotIcon_latest {...ICON_PROPS} />,
	<StarIcon_latest {...ICON_PROPS} />,
	<DeleteIcon_latest {...ICON_PROPS} />,
	<InternetIcon {...ICON_PROPS} />,
	<IntranetIcon {...ICON_PROPS} />,
];
const LIST_ITEM_PROPS = {
	hasBottomBorder: false,
	style: {
		height: '3.75rem',
		minHeight: '3.75rem',
		maxHeight: '3.75rem',
	},
};
const LISTITEM_TEXT_PROPS = (RTL) => {
	return {
		style: {
			paddingLeft: RTL ? 0 : '1rem',
			paddingRight: RTL ? '1rem' : 0,
			paddingBottom: '0.0625rem',
		},
	};
};

const LIST_DATA = data;

/** Simple List with icon, 2 lines of text, and row actions. */
const SimpleListDemo = (props) => {
	const { selectedAlarmLevel, alarmCounts: returnAlarmCounts } = props;
	const [listData, setListData] = useState<Array<any>>(LIST_DATA);
	const [listHeight, setListHeight] = useState<number>(0);
	const [listWidth, setListWidth] = useState<number>(0);
	const listContainerRef = useRef(null);
	const isRTL = getContext(({ RTL }) => {
		return RTL;
	});

	// return the number of each type of Alarm upon initial mount
	useEffect(() => {
		const criticalAlarms = LIST_DATA.filter(
			(item) => item.alarm === 'critical',
		).length;
		const majorAlarms = LIST_DATA.filter(
			(item) => item.alarm === 'major',
		).length;
		const minorAlarms = LIST_DATA.filter(
			(item) => item.alarm === 'minor',
		).length;
		const warningAlarms = LIST_DATA.filter(
			(item) => item.alarm === 'warning',
		).length;
		const normalAlarms = LIST_DATA.filter(
			(item) => item.alarm === 'normal',
		).length;
		returnAlarmCounts({
			critical: criticalAlarms,
			major: majorAlarms,
			minor: minorAlarms,
			warning: warningAlarms,
			normal: normalAlarms,
		});
	}, []);

	const filterListData = () => {
		if (selectedAlarmLevel === 'All Alarms') {
			setListData(LIST_DATA);
		} else {
			setListData(
				LIST_DATA.filter(
					(listRow) => _toLower(listRow.alarm) === _toLower(selectedAlarmLevel),
				),
			);
		}
	};

	useEffect(() => {
		// filter data
		filterListData();
	}, [selectedAlarmLevel]);

	const updateListDims = _throttle(() => {
		setListHeight(Math.floor(window.innerHeight * 0.4));
		setListWidth(listContainerRef?.current?.getBoundingClientRect().width);
	}, 50);
	useLayoutEffect(() => {
		// list height
		updateListDims();
		window.addEventListener('resize', updateListDims);
		return () => {
			window.removeEventListener('resize', updateListDims);
		};
	}, []);

	const Row = ({ index, style }) => {
		const listItem = listData[index];
		return (
			<ListItemBasic
				key={`${listItem.region}-${index}`}
				{...LIST_ITEM_PROPS}
				style={{
					...style,
					height: '3.75rem',
					maxHeight: '3.75rem',
					minHeight: '3.75rem',
					width: 'calc(100% - 8px)',
				}}
			>
				{LIST_ICONS[listItem.icon]}
				<ListItemTextContainer>
					<ListItemText {...LISTITEM_TEXT_PROPS(isRTL)}>
						{listItem.customer} - {listItem.servicename}
					</ListItemText>
					<ListItemSubText {...LISTITEM_TEXT_PROPS(isRTL)}>
						{listItem.region}
					</ListItemSubText>
				</ListItemTextContainer>
				<div
					style={{
						display: 'flex',
						marginRight: isRTL ? 'auto' : 'var(--spacing-x-small)',
						marginLeft: isRTL ? 'var(--spacing-x-small)' : 'auto',
					}}
				>
					<ListItemSubText>Alarm: {listItem.alarm}</ListItemSubText>
				</div>
			</ListItemBasic>
		);
	};
	return (
		<div ref={listContainerRef} style={{ width: '100%', height: '100%' }}>
			<List
				keyboardNavigation
				hoverEffect
				style={{ minHeight: listHeight }}
				truncateListText
				elevationProps={{
					elevationIndex: 8,
				}}
				ulProps={{
					role: 'listbox',
				}}
			>
				<VirtualizedList
					height={listHeight}
					itemCount={listData.length}
					itemSize={ROW_HEIGHT}
					width={listWidth}
				>
					{Row}
				</VirtualizedList>
			</List>
		</div>
	);
};

SimpleListDemo.displayname = 'SimpleListDemo';
export default SimpleListDemo;
