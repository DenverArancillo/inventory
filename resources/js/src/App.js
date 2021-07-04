import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Page from './components/Page';

import Login from './pages/Login';
import Register from './pages/Register';

import Brand from './pages/Brand';
import ProductTypes from './pages/ProductTypes';

const App = () =>  {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />

                <Route exact path="/">
                    <Page title="Home Page"/>
                </Route>

                <Route path="/brands/" component={Brand}/>
                <Route path="/brands/:id" component={Brand}/>

                <Route path="/product-types/" component={ProductTypes}/>
            </Switch>
        </Router>
    );
}

export default App;