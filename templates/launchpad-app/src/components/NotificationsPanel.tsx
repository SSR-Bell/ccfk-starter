import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/latest/DeleteIcon';
import LogAlarmIcon from '@nokia-csf-uxr/ccfk-assets/latest/LogAlarmIcon';
import UserSettingsIcon from '@nokia-csf-uxr/ccfk-assets/latest/UserSettingsIcon';
import WarningIcon from '@nokia-csf-uxr/ccfk-assets/latest/WarningIcon';
import Button, { ButtonText } from '@nokia-csf-uxr/ccfk/Button';
import Dialog, {
	DialogTitle,
	DialogContent,
	DialogFooter,
} from '@nokia-csf-uxr/ccfk/Dialog';
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import Notifications, {
	NotificationsCount,
	NotificationsButton,
	NotificationsPopup,
	NotificationsItemTitle,
	NotificationsItemSubtitle,
	NotificationsPopupHeader,
	NotificationsPopupFooter,
	NotificationsItemDate,
	NotificationsList,
	NotificationsItem,
	NotificationsItemIcon,
	NotificationsItemActions,
} from '@nokia-csf-uxr/ccfk/Notifications';
import _findIndex from 'lodash/findIndex';
import moment from 'moment';
import type React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

const generateSystemId = (length: number) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

type DataProperties = {
	id?: string;
	title?: string;
	subtitle?: string;
	date: Date;
	new?: boolean;
	unread?: boolean;
	icon?: React.ReactNode;
	iconColor?: string;
};
/** Dummy function to generate notifications, app would use some sort of backend calls. */
const generateNotifications = (count: number, props: any) =>
	Array(count)
		.fill({})
		.map((i) => ({
			id: `system-${i + Math.random()}`,
			title: `System N${generateSystemId(2)}L${i} Now Stable`,
			subtitle: `AMD StarShredder N${generateSystemId(2)}${i}`,
			date: '12 minute ago',
			new: true,
			unread: true,
			...props,
		}));

const data = [
	{
		id: 'system-1',
		title: 'System 0X563 Online',
		subtitle: 'RasberryPi 5000',
		date: '20 seconds ago',
		new: true,
		unread: true,
	},
	{
		id: 'system-2',
		title: 'System 0X765 Overloaded',
		subtitle: 'Intel Pentium N3710',
		date: '5 minute ago',
		new: true,
		unread: true,
	},
	{
		id: 'system-3',
		title: 'System 0X462 Offline',
		subtitle: 'AMD Spaceship KL3',
		date: '7 minute ago',
		icon: <WarningIcon color="var(--g-color-status-minor)" size={32} />,
		new: true,
		unread: true,
	},
	{
		id: 'system-5',
		title: 'System P013 Now Stable',
		subtitle: 'Intel Warp N22',
		date: '10 minute ago',
		new: false,
		unread: true,
	},
	...generateNotifications(20, {
		new: false,
		unread: false,
		subtitle: 'Intel Warp N22',
		date: '12 minute ago',
	}),
];

/** Parse time in human readable format. */
const parseTime = (time: any) => {
	const currentTime: any = new Date();
	const timeDiff: any = (currentTime - time) / 1000;
	const resolvedTime = timeDiff > 10 ? moment(time).fromNow() : 'NOW';
	return time instanceof Date ? resolvedTime : time;
};

export type NotificationsPanelProps = React.ComponentPropsWithRef<'div'> & {
	/** For Dialog, he reference to the app element, used to apply blur filter and aria-hidden attribute for accessibility.
	 * `appElement` is required if `ariaHideApp` is set to `false`.
	 *
	 * */
	appRef?: React.RefObject<HTMLElement>;
};

const NotificationsPanel = forwardRef<HTMLElement, NotificationsPanelProps>(
	(props: NotificationsPanelProps, ref) => {
		const { appRef } = props;
		const listRef = useRef<any | null>(null);
		const popupRef = useRef<HTMLElement | null>(null);
		const [showNotificationsPopup, setShowNotificationsPopup] =
			useState<boolean>(false);
		const [showDialog, setShowDialog] = useState<boolean>(false);
		const [notifications, setNotifications] = useState<DataProperties[]>(data);
		const oldNewCount = useRef<number>(0);
		const [kick, setKick] = useState<number>(0);
		const lastIdFocused = useRef<number | string | undefined>(undefined);

		const notificationsRef = useRef(notifications);
		notificationsRef.current = notifications;
		const clearNew = () => {
			const availableNew = notificationsRef.current.find((n) => n.new);
			if (!showNotificationsPopup || !availableNew) return;
			// update status of new notifications after 5 seconds
			const updatedNotifications = notificationsRef.current.map((n) => ({
				...n,
				new: false,
			}));
			setNotifications([...updatedNotifications]);
		};

		// Focuses on the popup when it's open (useful for accessibility concerns)
		useEffect(() => {
			if (showNotificationsPopup) {
				popupRef.current && popupRef.current.focus({ preventScroll: true });
			}
		}, [showNotificationsPopup]);

		useEffect(() => {
			setKick(kick + 1);
		}, [notifications.length]);

		useEffect(() => {
			const currentNewCount = notifications.filter((item) => item.new).length;
			if (oldNewCount.current !== currentNewCount) {
				oldNewCount.current = currentNewCount;
				setKick(kick + 1);
			}
		}, [notifications.filter((item) => item.new).length]);

		// set unread notifications to read, every 5 seconds.
		useEffect(() => {
			let timer = undefined;
			if (showNotificationsPopup) {
				timer = setInterval(() => {
					clearNew();
				}, 5000);
			}
			return () => clearInterval(timer);
		}, [showNotificationsPopup, notifications]);

		const count = notifications.filter((n) => n.new).length;
		const showBadge = () => notifications.some((n) => n.new);
		const showCount = () => {
			if (count === 0) return;
			let countDisplayed: string | number | undefined = count;
			if (countDisplayed > 999) {
				countDisplayed = `${(count / 1000).toFixed(1)}k`;
			}
			return countDisplayed;
		};

		const handleUnread = (id: any) => (e: any) => {
			if (e.type === 'keydown' && !(e.key === ' ' || e.key === 'Enter')) {
				return;
			}
			e.preventDefault();
			// if not already unread, mark it so
			const notificationsIndex = _findIndex(notifications, { id: id });
			const isNew = notifications[notificationsIndex].new;
			const isUnread = notifications[notificationsIndex].unread;
			if (isNew || isUnread) {
				const updatedNotifiations = notifications.map((n) =>
					n.id === id ? { ...n, unread: false, new: false } : n,
				);
				setNotifications([...updatedNotifiations]);
			}
		};

		const handleItemSelection = (id: number | string | undefined) => () => {
			lastIdFocused.current = id;
		};

		const handleOpenPopup = () => {
			setShowNotificationsPopup(!showNotificationsPopup);
		};

		const handleTooltip = () => {
			if (count > 0) return `${count} new notifications`;
			return 'No new notifications';
		};

		const handleClosePopup = () => {
			setShowNotificationsPopup(false);
		};

		return (
			<>
				<Notifications
					ref={ref}
					onEscFocusOut={handleClosePopup}
					onClickOutside={handleClosePopup}
				>
					<NotificationsCount
						role="alert"
						key={`notifiation-badge-${showCount()}`}
						badgeProps={{ 'aria-label': `${showCount()} new notifications` }}
					>
						{showCount()}
					</NotificationsCount>
					<NotificationsButton
						dotBadge={showBadge()}
						badgeProps={{ kick }}
						iconButtonProps={{ onClick: handleOpenPopup }}
						tooltipProps={{ tooltip: handleTooltip() }}
					/>
					<NotificationsPopup
						ref={popupRef}
						open={showNotificationsPopup}
						elevationProps={{ allowElevationBackgroundColorOverride: true }}
						onKeyDown={(e) => {
							// for accessibility, if user presses down arrow, focus goes to the List
							if (
								e.key === 'ArrowDown' &&
								!listRef?.current?.contains(e.target)
							) {
								e.preventDefault();
								listRef.current &&
									listRef.current.focus({ preventScroll: true });
							}
						}}
					>
						<NotificationsPopupHeader>NOTIFICATIONS</NotificationsPopupHeader>
						<NotificationsList
							listProps={{
								ref: listRef,
								truncateListText: true,
							}}
						>
							{notifications.map((item) => (
								<NotificationsItem
									data-index={item.id}
									key={item.id}
									new={item.new}
									unread={item.unread}
									onFocus={handleItemSelection(item.id)}
									onClick={handleItemSelection(item.id)}
									onKeyDown={handleItemSelection(item.id)}
									listItemProps={{
										role: 'listitem',
										focusItem: lastIdFocused.current === item.id,
										'aria-label': item.title,
										onKeyDown: handleUnread(item.id),
										onClick: handleUnread(item.id),
									}}
								>
									<NotificationsItemIcon>
										{item.icon || (
											<LogAlarmIcon
												color={item.iconColor || '#407EE7'}
												size={32}
											/>
										)}
									</NotificationsItemIcon>
									<NotificationsItemTitle>
										{item.title}
										<NotificationsItemSubtitle>
											{item.subtitle}
										</NotificationsItemSubtitle>
									</NotificationsItemTitle>
									<NotificationsItemDate>
										{parseTime(item.date)}
									</NotificationsItemDate>
									<NotificationsItemActions>
										<IconButton
											onClick={() => {
												console.log('Settings CLICK');
											}}
											onKeyDown={() => {
												console.log('Settings KEYDOWN');
											}}
										>
											<UserSettingsIcon />
										</IconButton>
										<IconButton
											onClick={() => {
												console.log('Delete CLICK');
											}}
											onKeyDown={() => {
												console.log('Delete KEYDOWN');
											}}
										>
											<DeleteIcon />
										</IconButton>
									</NotificationsItemActions>
								</NotificationsItem>
							))}
						</NotificationsList>
						<NotificationsPopupFooter>
							<Button
								onClick={() => {
									setShowDialog(true);
								}}
							>
								<ButtonText>SHOW MORE</ButtonText>
							</Button>
						</NotificationsPopupFooter>
					</NotificationsPopup>
				</Notifications>
				<Dialog
					appElement={appRef}
					isOpen={showDialog}
					style={{
						content: {
							overflow: 'hidden',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '80vw',
							height: '80vh',
						},
					}}
					onRequestClose={() => {
						setShowDialog(false);
					}}
				>
					<DialogTitle title="Notifications" />
					<DialogContent
						isTopDividerVisible
						isBottomDividerVisible
						style={{ padding: 0 }}
					>
						<Notifications>
							<NotificationsList
								style={{ width: '100%' }}
								listProps={{
									style: { maxHeight: 'initial', overflow: 'hidden' },
								}}
							>
								{notifications.map((item) => (
									<NotificationsItem
										data-index={item.id}
										key={item.id}
										new={item.new}
										unread={item.unread}
										onClick={() => {
											console.log('NotificationsItem CLICK', item.id);
										}}
										onKeyDown={() => {
											console.log('NotificationsItem KEYDOWN', item.id);
										}}
										listItemProps={{
											role: 'listitem',
											'aria-label': item.title,
											focusItem: lastIdFocused.current === item.id,
											onKeyDown: handleUnread(item.id),
											onClick: handleUnread(item.id),
										}}
									>
										<NotificationsItemIcon>
											{item.icon || (
												<LogAlarmIcon
													color={item.iconColor || '#407EE7'}
													size={32}
												/>
											)}
										</NotificationsItemIcon>
										<NotificationsItemTitle>
											{item.title}
											<NotificationsItemSubtitle>
												{item.subtitle}
											</NotificationsItemSubtitle>
										</NotificationsItemTitle>
										<NotificationsItemDate>
											{parseTime(item.date)}
										</NotificationsItemDate>
										<NotificationsItemActions>
											<IconButton
												onClick={() => {
													console.log('Settings CLICK');
												}}
												onKeyDown={() => {
													console.log('Settings KEYDOWN');
												}}
											>
												<UserSettingsIcon />
											</IconButton>
											<IconButton
												onClick={() => {
													console.log('Delete CLICK');
												}}
												onKeyDown={() => {
													console.log('Delete KEYDOWN');
												}}
											>
												<DeleteIcon />
											</IconButton>
										</NotificationsItemActions>
									</NotificationsItem>
								))}
							</NotificationsList>
						</Notifications>
					</DialogContent>
					<DialogFooter>
						<Button
							onClick={() => {
								setShowDialog(false);
							}}
						>
							CLOSE
						</Button>
					</DialogFooter>
				</Dialog>
			</>
		);
	},
);

export default NotificationsPanel;
