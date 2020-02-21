import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '@/page/index'
import Test from '@/page/test'

const Router: React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/test' component={Test} />
            </Switch>

        </BrowserRouter>
    )

}

export default Router;
