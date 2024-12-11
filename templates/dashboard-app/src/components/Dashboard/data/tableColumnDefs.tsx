import { useRef } from 'react';
import { Trigger } from 'react-popper-tooltip';
import { Placement } from '@popperjs/core';
import TOKENS from '@nokia-csf-uxr/nokia-design-system-tokens/js/tokens.es6';
import useTooltip from '@nokia-csf-uxr/ccfk/common/useTooltip';

import Tooltip from '@nokia-csf-uxr/ccfk/Tooltip';

const TOOLTIP_PROPS = {
	placement: 'bottom-start' as Placement,
	trigger: ['hover', 'focus'] as Trigger,
	modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
	tooltip: '',
};
const TABLE_CELL_PADDING = 24;
const TABLE_CELL_FONT = `${TOKENS.FONT_SIZE_XX_SMALL} ${TOKENS.FONT_FAMILY_TEXT}`;

const formattedStringCell = (info) => {
	const targetRef = useRef(null);
	const cellValue = info.cell.getValue();
	const showTooltip = useTooltip(
		targetRef,
		cellValue,
		TABLE_CELL_FONT,
		TABLE_CELL_PADDING,
	);
	return (
		<div
			ref={targetRef}
			style={{
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				boxSizing: 'border-box',
			}}
		>
			<Tooltip {...TOOLTIP_PROPS} tooltip={cellValue} disable={!showTooltip}>
				{cellValue}
			</Tooltip>
		</div>
	);
};

const tableColumnDefs = () => [
	{
		headerName: 'Service name',
		field: 'servicename',
		required: false,
		size: 175,
		customCell: (info) => formattedStringCell(info),
	},
	{
		headerName: 'Region',
		field: 'region',
		required: true,
		size: 125,
		customCell: (info) => formattedStringCell(info),
	},
	{
		headerName: 'Customer',
		field: 'customer',
		required: true,
		size: 200,
		customCell: (info) => formattedStringCell(info),
	},
	{
		headerName: 'Type',
		field: 'type',
		required: true,
		size: 75,
	},
	{
		headerName: 'Longitude',
		field: 'longitude',
		required: true,
		size: 175,
	},
	{
		headerName: 'Latitude',
		field: 'latitude',
		required: true,
		size: 175,
	},
	{
		headerName: 'Alarm',
		field: 'alarm',
		required: true,
		enableHiding: true,
	},
];

export default tableColumnDefs;
