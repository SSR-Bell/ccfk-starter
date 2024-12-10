import React, { useRef, useState } from 'react';
import Typography from '@nokia-csf-uxr/ccfk/Typography';
import QuickHelp, {
	QuickHelpTitle,
	QuickHelpButton,
	QuickHelpPopup,
	QuickHelpHeader,
	QuickHelpFooter,
	QuickHelpHighlighter,
} from '@nokia-csf-uxr/ccfk/QuickHelp';
import ExpansionPanels, {
	ExpansionPanel,
	ExpansionPanelHeader,
	ExpansionPanelBody,
	ExpansionPanelButton,
} from '@nokia-csf-uxr/ccfk/ExpansionPanels';
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import FilterField, { FilterFieldIcon } from '@nokia-csf-uxr/ccfk/FilterField';
import Hyperlink from '@nokia-csf-uxr/ccfk/Hyperlink';
import HorizontalDivider from '@nokia-csf-uxr/ccfk/HorizontalDivider';
import Button, { ButtonText, ButtonIcon } from '@nokia-csf-uxr/ccfk/Button';
import ExitIcon from '@nokia-csf-uxr/ccfk-assets/latest/ExitIcon';
import CloseIcon from '@nokia-csf-uxr/ccfk-assets/latest/CloseCloseIcon';
import jsxToString from 'react-element-to-jsx-string';

type QuickHelpItem = {
	id: string;
	title: string;
	expanded: boolean;
	content: string | React.ReactElement;
};
const data: QuickHelpItem[] = [
	{
		id: 'qh-fixissue',
		title: 'How to Fix an Issue',
		expanded: false,
		content: 'Quick brown fox',
	},
	{
		id: 'qh-upload',
		title: 'How to Upload',
		expanded: false,
		content: (
			<div>
				Lorem ipsum dolor sit <Hyperlink href="#">Link</Hyperlink> amet
				consectetur tiger adipisicing elit. Nisi molestiae porro, laudantium
				labore aut consequatur cupiditate sit natus explicabo commodi incidunt.
				Dolorem, amet rerum ipsum natus voluptatibus facere assumenda. Vero?
			</div>
		),
	},
];

const QuickHelpPanel = () => {
	const [showQuickHelpPopup, setShowQuickHelpPopup] = useState<boolean>(false);
	const [quickhelps, setQuickHelp] = useState<QuickHelpItem[]>(data);
	const [terms, setTerms] = useState<string>('');
	const quickhelpsRef = useRef(quickhelps);
	quickhelpsRef.current = quickhelps;

	const handleOpenPopup = () => {
		setShowQuickHelpPopup(!showQuickHelpPopup);
	};

	const isSearchable = (terms: string) => terms.length > 2;

	const handleSearch = (terms: string) => {
		const updatedData = data.map((item) => {
			const contentString = jsxToString(item.content);
			const titleString = jsxToString(item.title);
			if (
				isSearchable(terms) &&
				(contentString.toLowerCase().includes(terms.toLowerCase()) ||
					titleString.toLowerCase().includes(terms.toLowerCase()))
			) {
				return {
					...item,
					expanded: true,
				};
			}
			return { ...item, expanded: false };
		});
		setQuickHelp(updatedData);
	};

	const handleExpansion = ({ id }: QuickHelpItem) => {
		const updatedData = quickhelps.map((item) =>
			item.id === id ? { ...item, expanded: !item.expanded } : item,
		);
		setQuickHelp(updatedData);
	};

	const handleClosePopup = () => {
		setShowQuickHelpPopup(false);
	};

	return (
		<QuickHelp
			onEscFocusOut={handleClosePopup}
			onClickOutside={handleClosePopup}
		>
			<QuickHelpButton iconButtonProps={{ onClick: handleOpenPopup }} />
			<QuickHelpPopup open={showQuickHelpPopup} style={{ width: '25vw' }}>
				<QuickHelpHeader>
					<QuickHelpTitle>Help</QuickHelpTitle>
					<IconButton
						onClick={() => {
							setShowQuickHelpPopup(false);
						}}
					>
						<CloseIcon />
					</IconButton>
				</QuickHelpHeader>
				<FilterField
					variant="outlined"
					textInputProps={{
						inputProps: { 'aria-label': 'Search' },
						showClearButton: true,
						clearButtonProps: {
							onClick: () => {
								setTerms('');
								handleSearch('');
							},
						},
					}}
					renderIcon={<FilterFieldIcon />}
					onChange={(e) => {
						setTerms(e.target.value);
						handleSearch(e.target.value);
					}}
					value={terms}
				/>
				<ExpansionPanels>
					{quickhelps.map((item, i) => (
						<ExpansionPanel
							key={item.id}
							focusEffect
							stickyHeader
							defaultStyles={true}
							expanded={item.expanded}
							elevationProps={{
								elevationIndex: 0,
							}}
						>
							<ExpansionPanelHeader
								style={{ justifyContent: 'space-between' }}
								onClick={() => handleExpansion(item)}
								onKeyDown={() => handleExpansion(item)}
								tabIndex={i === 0 ? 0 : -1}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										width: '18.75rem',
									}}
								>
									<QuickHelpTitle expanded={item.expanded}>
										<QuickHelpHighlighter search={isSearchable(terms) && terms}>
											{item.title}
										</QuickHelpHighlighter>
									</QuickHelpTitle>
								</div>
								<ExpansionPanelButton iconButtonProps={{ tabIndex: -1 }} />
							</ExpansionPanelHeader>
							<ExpansionPanelBody
								aria-live="assertive"
								style={{ padding: '0.75rem 1rem' }}
							>
								<Typography typography="BODY">
									<QuickHelpHighlighter search={isSearchable(terms) && terms}>
										{item.content}
									</QuickHelpHighlighter>
								</Typography>
							</ExpansionPanelBody>
							{i < quickhelps.length - 1 && <HorizontalDivider />}
						</ExpansionPanel>
					))}
				</ExpansionPanels>
				<QuickHelpFooter>
					<Button>
						<ButtonIcon>
							<ExitIcon />
						</ButtonIcon>
						<ButtonText>HELP CENTER</ButtonText>
					</Button>
				</QuickHelpFooter>
			</QuickHelpPopup>
		</QuickHelp>
	);
};

QuickHelpPanel.displayname = 'QuickHelp';
export default QuickHelpPanel;
