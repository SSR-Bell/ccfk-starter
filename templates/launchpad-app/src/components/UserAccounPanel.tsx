import UserAccountSummary, {
	UserAccountSummaryButton,
	UserAccountSummaryPopup,
	UserAccountSummaryUsername,
	UserAccountSummaryDescription,
	UserAccountSummaryList,
	UserAccountSummaryHeader,
	UserAccountSummaryFooter,
} from '@nokia-csf-uxr/ccfk/UserAccountSummary';
import { useContext, useEffect, useRef, useState } from 'react';

import AboutProduct, {
	ProductName,
	ProductRelease,
	TermsConditions,
	ProductCopyright,
} from '@nokia-csf-uxr/ccfk/AboutProduct';
import Typography from '@nokia-csf-uxr/ccfk/Typography';

import { AlertBar } from '@nokia-csf-uxr/ccfk/Alert';
import Button from '@nokia-csf-uxr/ccfk/Button';
import ButtonsRow from '@nokia-csf-uxr/ccfk/ButtonsRow';
import Dialog, { DialogContent } from '@nokia-csf-uxr/ccfk/Dialog';
import { ListItemBasic, ListItemText } from '@nokia-csf-uxr/ccfk/List';
import NokiaLogo from '@nokia-csf-uxr/ccfk/NokiaLogo';
import { AppContainerContext } from './AppContainer';

const UserAccountPanel = () => {
	const appContext = useContext(AppContainerContext);
	const popupRef = useRef(null);
	const listRef = useRef(null);
	const [showUserAccountSummary, setShowUserAccountSummary] =
		useState<boolean>(false);
	const [showDialog, setShowDialog] = useState<boolean>(false);

	const handleCloseDialog = () => {
		setShowDialog(false);
	};
	const handleClosePopup = () => {
		setShowUserAccountSummary(false);
	};
	// Focuses on the popup when it's open (useful for accessibility concerns)
	useEffect(() => {
		if (showUserAccountSummary) {
			popupRef.current && popupRef.current.focus({ preventScroll: true });
		}
	}, [showUserAccountSummary]);

	return (
		<UserAccountSummary
			onEscFocusOut={handleClosePopup}
			onClickOutside={handleClosePopup}
		>
			<UserAccountSummaryButton
				buttonProps={{
					onClick: () => {
						setShowUserAccountSummary(!showUserAccountSummary);
					},
				}}
			>
				UserName
			</UserAccountSummaryButton>
			<UserAccountSummaryPopup
				ref={popupRef}
				open={showUserAccountSummary}
				onKeyDown={(e) => {
					// for accessibility, if user presses down arrow, focus goes to the List
					if (e.key === 'ArrowDown' && !listRef.current.contains(e.target)) {
						e.preventDefault();
						listRef.current && listRef.current.focus({ preventScroll: true });
					}
				}}
			>
				<UserAccountSummaryHeader style={{ borderBottom: 'none' }}>
					<UserAccountSummaryUsername>UserName</UserAccountSummaryUsername>
					<UserAccountSummaryDescription>
						Network Administrator
					</UserAccountSummaryDescription>
					<Typography typography="CAPTION">100.100.100.1</Typography>
				</UserAccountSummaryHeader>
				<UserAccountSummaryList isOverflowNecessary={false} ref={listRef}>
					<ListItemBasic
						onClick={() => {
							setShowDialog(true);
						}}
						onKeyDown={(event) => {
							if (event.key === ' ' || event.key === 'Enter') {
								setShowDialog(true);
							}
						}}
					>
						<ListItemText>About Product</ListItemText>
					</ListItemBasic>
				</UserAccountSummaryList>
				<UserAccountSummaryFooter style={{ borderTop: 'none' }}>
					<ButtonsRow>
						<Button>SIGN OUT</Button>
					</ButtonsRow>
				</UserAccountSummaryFooter>
			</UserAccountSummaryPopup>
			{
				<Dialog
					ariaHideApp={false}
					isOpen={showDialog}
					style={{
						content: {
							left: 'calc((100vw - 21.875rem) / 2)',
							top: 'calc((100vh - 15.3125rem) / 2)',
							width: '21.875rem',
							height: '17.25rem',
							transform: 'initial',
						},
					}}
					onRequestClose={handleCloseDialog}
				>
					<AlertBar />
					<DialogContent
						isTopDividerVisible
						isBottomDividerVisible
						style={{ overflow: 'hidden', padding: 0, border: 0 }}
					>
						<AboutProduct>
							<div className="inner">
								<div style={{ display: 'flex' }}>
									<NokiaLogo
										style={{
											maxHeight: '1.5rem',
											margin: 'var(--spacing-large) 0',
										}}
									/>
								</div>
								<ProductName>{appContext.productName}</ProductName>
								<ProductRelease>{appContext.productDescription}</ProductRelease>
								<ProductRelease>Latest release</ProductRelease>
								<TermsConditions
									children="Terms and Conditions"
									href="http://nokia.com"
									target="_blank"
								/>
							</div>
							<ButtonsRow style={{ paddingLeft: 0, paddingRight: 0 }}>
								<ProductCopyright>
									&copy; {new Date().getFullYear()} Nokia
								</ProductCopyright>
								<Button
									onClick={handleCloseDialog}
									aria-label="Close"
									children="CLOSE"
								/>
							</ButtonsRow>
						</AboutProduct>
					</DialogContent>
				</Dialog>
			}
		</UserAccountSummary>
	);
};

UserAccountPanel.displayname = 'UserAccountPanel';
export default UserAccountPanel;
