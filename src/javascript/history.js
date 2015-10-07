import createBrowserHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';

let history;

if (typeof window !== 'undefined') {
    history = createBrowserHistory();
} else {
    history = createMemoryHistory();
}

export default history;
