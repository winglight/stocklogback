import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Admin, Resource } from 'react-admin';

import { SelectedStockList, SelectedStockShow, SelectedStockEdit, SelectedStockCreate } from './screens/SelectedStockList';
import { LogList, LogShow, LogEdit, LogCreate } from './screens/LogList';
import { ReasonList, ReasonShow, ReasonEdit, ReasonCreate } from './screens/ReasonList';
import {dataProvider, authProvider} from "./models/data_provider_config";
import Dashboard from './screens/dashboard/Dashboard';

const App = () => (
    <Admin
        title="Stock Log - 交易记录"
        dashboard={Dashboard}
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource name="SelectedStockModel" options={{ label: "选股列表" }} list={SelectedStockList} show={SelectedStockShow} edit={SelectedStockEdit} create={SelectedStockCreate}  />
        <Resource name="LogModel" options={{ label: "日志列表" }} list={LogList} show={LogShow} edit={LogEdit} create={LogCreate}  />
        <Resource name="ReasonModel" options={{ label: "理由列表" }} list={ReasonList} show={ReasonShow} edit={ReasonEdit} create={ReasonCreate}  />
    </Admin>
);

export default App;
