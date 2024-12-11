import {
	useState,
	useRef,
	useMemo,
	useEffect,
	useLayoutEffect,
	useContext,
	useCallback,
} from 'react';
import _isEmpty from 'lodash/isEmpty';
import _throttle from 'lodash/throttle';
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import SortDescendingIcon from '@nokia-csf-uxr/ccfk-assets/latest/SortDescendingIcon';
import SortAscendingIcon from '@nokia-csf-uxr/ccfk-assets/latest/SortAscendingIcon';
import ViewIcon from '@nokia-csf-uxr/ccfk-assets/latest/ViewIcon';

import Table, {
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from '@nokia-csf-uxr/ccfk/Table';

import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import Typography from '@nokia-csf-uxr/ccfk/Typography';

import { AppContainerContext } from '../../../../sidebar-app/src/components/AppContainer';

import tableColumnDefs from './data/tableColumnDefs';
import tableRowData from './data/mockdata.json'; // 1000 records

const COLUMNS = tableColumnDefs();
const DATA = tableRowData;
const WIDTH = 200;
const ROW_ACTION_WIDTH = 32;
const MAX_HEADER_LINES = 2;

const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const isSelectionKeyPressed = (key) =>
	key && (key === ENTER_KEY || key === SPACE_KEY);

const match = (rowType, searchItems) => {
	if (_isEmpty(searchItems)) return false;
	for (let i = 0; i < searchItems.length; i += 1) {
		if (rowType == searchItems[i]) return true;
	}
	return false;
};

const matchRegion = (rowRegion, searchItem) => {
	if (searchItem === '') return true;
	if (rowRegion.includes(searchItem)) return true;
	return false;
};
const SimpleTable = (props) => {
	const { selectedTypes, selectedRegion } = props;
	const [data, setData] = useState(DATA);
	const [sorting, setSorting] = useState([]);
	const [hoveredRow, setHoveredRow] = useState(null);
	const [listHeight, setListHeight] = useState(window.innerHeight * 0.5);
	const tableContainerRef = useRef(null);
	const tableBodyRef = useRef(null);

	const appContainerContext: any = useContext(AppContainerContext);
	const columns = useMemo(
		() =>
			COLUMNS.map((c) => ({
				accessorKey: c.field,
				id: c.field,
				enableHiding: c.enableHiding,
				cell: c.customCell ? c.customCell : (info) => info.getValue(),
				header: c.headerName,
				size: c.size || WIDTH,
			})),
		[],
	);
	const getRowId = (originalRow) => {
		return originalRow.id.toString();
	};
	const table = useReactTable({
		data,
		columns: [
			...columns,
			{
				accessorKey: 'rowAction',
				id: 'rowAction',
				cell: (info) => info.getValue(),
				header: '',
				enableSorting: false,
				enableHiding: false,
			},
		],
		state: {
			sorting,
			columnPinning: {
				right: ['rowAction'],
			},
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		enableRowSelection: true,
		enableMultiRowSelection: false,
		getRowId: getRowId,
	});

	// row virtualization
	const { rows } = table.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 43, // row height
		overscan: 10,
	});

	const virtualRows = rowVirtualizer.getVirtualItems();
	const totalSize = rowVirtualizer.getTotalSize();
	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
	const paddingBottom =
		virtualRows.length > 0
			? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
			: 0;

	const noFiltering = _isEmpty(selectedTypes) && selectedRegion === '';
	const handleFilteringChange = () => {
		if (noFiltering) {
			setData(DATA);
		} else {
			setData(
				DATA.filter(
					(tableRow) =>
						match(tableRow.type, selectedTypes) &&
						matchRegion(tableRow.region, selectedRegion),
				),
			);
		}
	};
	useEffect(() => {
		handleFilteringChange();
	}, [selectedTypes, selectedRegion]);

	const updateListHeight = _throttle(() => {
		setListHeight(Math.floor(window.innerHeight * 0.4));
	}, 50);
	useLayoutEffect(() => {
		// list height
		updateListHeight();
		window.addEventListener('resize', updateListHeight);
		return () => {
			window.removeEventListener('resize', updateListHeight);
		};
	}, []);

	const renderActionButtons = useCallback(
		(aRow) => {
			return (
				<IconButton
					onClick={(e) => {
						e.nativeEvent?.stopImmediatePropagation();
						appContainerContext?.addRow(aRow);
					}}
					onKeyDown={(e) =>
						isSelectionKeyPressed(e.key) && appContainerContext?.addRow(aRow)
					}
				>
					<ViewIcon />
				</IconButton>
			);
		},
		[appContainerContext],
	);

	// click on a row in the table sets the row to 'selected'
	const handleRowClick = (row) => () => {
		const isSelected = row.getIsSelected();
		// set all other selected rows to false
		!isSelected && table.toggleAllRowsSelected(false);
		// select this row
		row.toggleSelected(true);
	};

	return (
		<div
			ref={tableContainerRef}
			style={{
				height: listHeight,
				overflow: 'auto',
				border: '1px solid var(--g-color-card-border-light)',
				borderRadius: 'var(--radius-medium);',
			}}
		>
			<Table style={{ height: 'fit-content' }}>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const isRowAction = header.column.columnDef.id === 'rowAction';
								return (
									<TableCell
										as="th"
										width={isRowAction ? ROW_ACTION_WIDTH : header.getSize()}
										key={header.id}
										$sortable={header.column.getCanSort()}
										onClick={header.column.getToggleSortingHandler()}
										className={
											isRowAction && 'row-action-cell row-action-header'
										}
									>
										<Typography maxLines={MAX_HEADER_LINES} as="div">
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</Typography>
										{!isRowAction
											? {
													asc: (
														<IconButton
															size="small"
															className="sort-icon"
															rippleStyle={{
																padding:
																	'var(--spacing-xx-small) var(--spacing-x-small)',
															}}
														>
															<SortAscendingIcon />
														</IconButton>
													),
													desc: (
														<IconButton
															size="small"
															className="sort-icon"
															rippleStyle={{
																padding:
																	'var(--spacing-xx-small) var(--spacing-x-small)',
															}}
														>
															<SortDescendingIcon />
														</IconButton>
													),
												}[header.column.getIsSorted() ? 1 : 0]
											: null}
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableHead>
				<TableBody ref={tableBodyRef}>
					{paddingTop >
						0 /** additional markup for virtualization support */ && (
						<TableRow>
							<TableCell style={{ height: `${paddingTop}px` }}>
								{null}
							</TableCell>
						</TableRow>
					)}
					{virtualRows.map((virtualRow) => {
						const row = rows[virtualRow.index];
						const isHovered = hoveredRow === row.id;
						const isSelected = row.getIsSelected();
						return (
							<TableRow
								key={`${row.id}-${virtualRow.index}`}
								tabIndex={0}
								id={row.id}
								selected={isSelected}
								onClick={handleRowClick(row)}
								onMouseDown={(e) => {
									if (e.shiftKey) {
										// if onMouseDown and SHIFT key are pressed, assume user isn't trying to select text
										e.preventDefault();
									}
								}}
								onKeyDown={(e) => {
									e.stopPropagation();
									const currentRow = tableBodyRef.current?.children.namedItem(
										row.id,
									);
									switch (e.key) {
										case 'ArrowUp':
											e.preventDefault();
											currentRow?.previousElementSibling?.focus();
											setHoveredRow(currentRow?.previousElementSibling?.id);
											break;
										case 'ArrowDown':
											e.preventDefault();
											currentRow?.nextElementSibling?.focus();
											setHoveredRow(currentRow?.nextElementSibling?.id);
											break;
										case SPACE_KEY:
										case ENTER_KEY:
											e.preventDefault();
											handleRowClick(row)();
											break;
										default:
											break;
									}
								}}
								onMouseEnter={() => setHoveredRow(row.id)}
								onMouseLeave={() => setHoveredRow(null)}
								$hovered={isHovered}
							>
								{row.getVisibleCells().map((cell) => {
									const isCustomCell = cell.column.columnDef.id === 'RowStatus';
									const isRowAction = cell.column.columnDef.id === 'rowAction';
									return (
										<TableCell
											key={cell.id}
											tabIndex={isCustomCell ? -1 : 0}
											className={isRowAction && 'row-action-cell'}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
											{(isHovered || isSelected) &&
												isRowAction &&
												renderActionButtons(row.original)}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
					{paddingBottom > 0 && (
						<TableRow>
							<TableCell style={{ height: `${paddingBottom}px` }}>
								{null}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

SimpleTable.displayname = 'SimpleTable';
export default SimpleTable;
