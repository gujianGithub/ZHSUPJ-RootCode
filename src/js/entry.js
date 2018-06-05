import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route} from "react-router-dom";
import {LoginComponent} from './components/login';
import {GuideComponent} from "./components/guide";
import {IndexComponent} from "./components/index";
import {StudentComponent} from "./components/student";
import {CheckComponent} from "./components/check";
import {RecordComponent} from "./components/record";
import {DetailNoputRecordComponent} from "./components/detailNoputRecord";
import {DetailWaitRecordComponent} from "./components/detailWaitRecord";
import {DetailPassRecordComponent} from "./components/detailPassRecord";
import {DetailRefuseRecordComponent} from "./components/detailRefuseRecord";
import {browserHistory} from "./components/history";


ReactDOM.render(
    <Router history={browserHistory}>
        <div style={{height:"100%"}}>
            <Route exact path='/' component={LoginComponent}></Route>
            <Route path='/guide' component={GuideComponent}></Route>
            <Route path='/index' component={IndexComponent}></Route>
            <Route path='/student' component={StudentComponent}></Route>
            <Route path='/check' component={CheckComponent}></Route>
            <Route path='/record' component={RecordComponent}></Route>
            <Route path='/detailNoputRecord' component={DetailNoputRecordComponent}></Route>
            <Route path='/detailWaitRecord' component={DetailWaitRecordComponent}></Route>
            <Route path='/detailPassRecord' component={DetailPassRecordComponent}></Route>
            <Route path='/detailRefuseRecord' component={DetailRefuseRecordComponent}></Route>
        </div>
    </Router>,
    document.getElementById("index")
)
