import { render } from 'preact';

import './index.css';
import { Library } from './Frontend/Library';

const apiLogging = true;
export function isApiLogging() {
    return apiLogging;
}

const readerLogging = false;
export function isReaderLogging() {
    return readerLogging;
}

const dataSaver = true;
export function isDataSaver() {
    return dataSaver;
}

const tryWithOrgAsWell = true;
export function isTryWithOrgAsWell() {
    return tryWithOrgAsWell;
}

export function App() {
	return Library();
}

render(<App />, document.getElementById('app'));
