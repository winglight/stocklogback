import React, { Component, Fragment } from 'react';
import {
    Button,
    useRefresh,
    useNotify,
    useUnselectAll,
    GET_ONE
} from 'react-admin';
import {dataProvider} from "../models/data_provider_config";

import axios from 'axios'

const AddToGroupButton = ({ selectedIds, resource }) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();

    const handleSubmit = () => {
        // console.log("selectedIds: ", selectedIds);
        dataProvider(GET_ONE, 'SelectedStockModel', { id: selectedIds[0] })
            .then(response => {
                // console.log(response.data); // { id: 123, title: "hello, world" }
                let code = response.data.code;
                axios.get("/addtogroup",
                    { params: {code: code}}
                ).then(function (response) {
                    notify(response.data);
                    unselectAll(resource);
                }).catch(function (err) {
                    notify('Error: addtogroup ' + err, 'warning')
                });
            });


    };

    return (
            <Button
                label="加入自选股"
                onClick={handleSubmit}
            >
            </Button>
    );
};

export default AddToGroupButton;
