import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
    fetchEnd,
    fetchStart,
    required,
    showNotification,
    crudGetMatching,
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    NumberInput,
    LongTextInput,
    ReferenceArrayInput,
    SelectArrayInput,
    SelectInput,
    UPDATE,
    Edit,
    REDUX_FORM_NAME
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import {dataProvider} from "../models/data_provider_config";
import LogModel, {LogType} from "../models/LogModel";
import {LogSelect, StarSelect, SuggestionSelect} from "../models/LogModel";

const reasonOptionRenderer = reason => `${reason.content} : ${reason.score}`;

class LogQuickEditButton extends Component {
    state = {
        logObj: {},
        error: false,
        showDialog: false
    };

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        const { submit, record } = this.props;

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit(`log-quick_edit_${record.id}`);
    };

    handleSubmit = values => {
        const {
            record,
            change,
            crudGetMatching,
            fetchStart,
            fetchEnd,
            showNotification
        } = this.props;

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // console.log("record: " + JSON.stringify(record));
        // console.log("values: " + JSON.stringify(values));

        // record.suggested_low_price = values.suggested_low_price;
        // record.suggested_high_price = values.suggested_high_price;
        // record.expected_low_price = values.expected_low_price;
        // record.expected_high_price = values.expected_high_price;
        // record.current_price = values.current_price;

        dataProvider(UPDATE, 'LogModel', { id: values.id, data: values, previousData: record })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'LogModel',
                    '',
                    { page: 1, perPage: 100 },
                    { field: 'content', order: 'ASC' },
                    {id: data.id}
                );

                // Update the main react-admin form (in this case, the comments creation form)
                // change(REDUX_FORM_NAME, 'post_id', data.id);
                this.setState({ showDialog: false });
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                fetchEnd();
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting, record } = this.props;
        let logType = LogSelect.find(x => (x.id === record.logType)).name;

        return (
            <Fragment>
                <Button onClick={this.handleClick} label="改价">
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="修改价格"
                    key={record.id}
                >
                    <DialogTitle>{logType + " - 修改价格"}</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            key={record.id}
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form={`log-quick_edit_${record.id}`}
                            resource="LogModel"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                            {...this.props}
                        >
                            <NumberInput source="current_price" label={"当前价格"}/>
                            <NumberInput source="expected_high_price" label={"止盈价格"}/>
                            <NumberInput source="expected_low_price" label={"止损价格"}/>
                            <NumberInput source="suggested_high_price" label={"建议买入价格(高)"}/>
                            <NumberInput source="suggested_low_price" label={"建议买入价格(低)"}/>

                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            saving={isSubmitting}
                            onClick={this.handleSaveClick}
                        />
                        <Button
                            label="ra.action.cancel"
                            onClick={this.handleCloseClick}
                        >
                            <IconCancel />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('log-quick-edit')(state)
});

const mapDispatchToProps = {
    change,
    crudGetMatching,
    fetchEnd,
    fetchStart,
    showNotification,
    submit
};

export default connect(mapStateToProps, mapDispatchToProps)(
    LogQuickEditButton
);
