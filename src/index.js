import React from 'react';
import ReactDOM from 'react-dom';

// Views
import App from './views/App';

// CSS
import 'normalize.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
