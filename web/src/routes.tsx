import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import CreatePoint from './pages/CreatePoint';
import Home from './pages/Home';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/CreatePoint" exact component={CreatePoint} />
        </BrowserRouter>
    );
}

export default Routes;