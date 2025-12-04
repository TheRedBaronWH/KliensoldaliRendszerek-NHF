import { render } from 'preact';

import './index.css';
import { Library } from './Library';

export function App() {
	return Library();
}

render(<App />, document.getElementById('app'));
