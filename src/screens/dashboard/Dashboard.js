import React, {useState, useCallback} from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import {stockApi} from '../../models/api'
import SelectedStocksTable from "./SelectedStocks";

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

export default () => {


    return (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.singleCol}>
                    <SelectedStocksTable/>
                </div>
            </div>
            <div style={styles.rightCol}>
                <div style={styles.singleCol}>
                </div>
            </div>
        </div>
    );
}

