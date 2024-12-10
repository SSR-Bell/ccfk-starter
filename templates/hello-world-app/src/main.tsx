import React from 'react';
import ReactDOM from 'react-dom/client';
import '@nokia-csf-uxr/nokia-design-system-tokens/css/_variables.css';
import './app.css';
import { AdvancedTheme, Button } from '@nokia-csf-uxr/ccfk';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AdvancedTheme advancedTheme={'CCFK FreeForm - Light'}>
			<Button>Hello World</Button>
		</AdvancedTheme>
	</React.StrictMode>,
);
