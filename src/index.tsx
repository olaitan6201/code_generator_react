import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import './custom-css/admin.styles.scss'
import './custom-css/user.styles.scss'
import './custom.scss'

import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil'
import ThemeContextWrapper from './components/theme-switch/ThemesWrapper'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<RecoilRoot>
			<ThemeContextWrapper>
				{/* <React.StrictMode> */}
				<App />
				{/* </React.StrictMode> */}
			</ThemeContextWrapper>
		</RecoilRoot>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
