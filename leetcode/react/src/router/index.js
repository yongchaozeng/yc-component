import React, { useEffect, } from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionDownload, actionGroup, actionRule, actionVotingGroup, actionUser, actionChampion ,championInfo} from "../store/action";

import { Redirect } from 'react-router';
import Index from '../pages/index';
import PcIndex from '../pages/pc-index';
import { judgeClient } from "../utils/utils";


const routers = [
    { path: "/vote", name: "index", component: PcIndex },
    { path: "/vote/m", name: "index", component: Index },
    // {path: "/m/Christmas/share", name: "share", component: Share},
];


// const BasicRoute = (props) => {
const BasicRoute = (props) => {
    let token = 0;
    const dispatch = useDispatch();
    const init = async () => {
        await dispatch(await actionRule());
        await dispatch(await actionUser());
        await dispatch(await actionVotingGroup());
        await dispatch(await actionGroup());
        dispatch(await actionChampion());
        dispatch(await actionDownload());
        dispatch(await championInfo());
    };
    init();


    useEffect(() => {

        if (judgeClient() === 'PC' && window.location.pathname === '/vote/m') {
            window.location.replace(`/vote${window.location.search}`);
        }
        if (judgeClient() !== 'PC' && window.location.pathname !== '/vote/m') {
            window.location.replace(`/vote/m${window.location.search}`);
        }
    }, []);


    /* token鉴权 */
    return (

        <BrowserRouter>
            <Switch>
                {routers.map((item, index) => {
                    return <Route key={index} path={item.path} exact render={props =>
                        (!item.auth ? (<item.component {...props} />) : (token ? <item.component {...props} /> :
                            <Redirect to={{
                                pathname: judgeClient() === 'PC' ? '/vote' : '/vote/m',
                                state: { from: props.location }
                            }} />
                        )
                        )} />;
                })}
                <Route component={PcIndex} />
            </Switch>
        </BrowserRouter>
    );

};


export default BasicRoute;
