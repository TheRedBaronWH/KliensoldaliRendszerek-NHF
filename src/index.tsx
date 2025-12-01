import { render } from 'preact';

import preactLogo from './assets/preact.svg';
import './style.css';
import { Library } from './Library';

export function App() {
	return Library();
}

render(<App />, document.getElementById('app'));
