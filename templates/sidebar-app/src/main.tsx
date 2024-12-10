import React from 'react';
import ReactDOM from 'react-dom/client';
import '@nokia-csf-uxr/nokia-design-system-tokens/global-style.css';
import '@nokia-csf-uxr/nokia-design-system-tokens/css/_variables.css';

import AppContainer from './components/AppContainer';
import './app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AppContainer />
	</React.StrictMode>,
);
