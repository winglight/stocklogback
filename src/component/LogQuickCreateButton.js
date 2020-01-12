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
    CREATE,
    REDUX_FORM_NAME
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import {dataProvider} from "../models/data_provider_config";
import LogModel from "../models/LogModel";
import {LogSelect, StarSelect, SuggestionSelect} from "../models/LogModel";

const reasonOptionRenderer = reason => `${reason.content} : ${reason.score}`;

class LogQuickCreateButton extends Component {
    state = {
        selected_stock_id: "",
        logType: "",
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
        const { submit } = this.props;

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit('log-quick-create');
    };

    handleSubmit = values => {
        const {
            logType,
            selected_stock_id,
            change,
            crudGetMatching,
            fetchStart,
            fetchEnd,
            showNotification
        } = this.props;

        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        // let logObj = new LogModel();
        // logObj.selected_stock_id = selected_stock_id;
        // logObj.current_price = values.current_price;
        // logObj.current_position = values.current_position;
        // logObj.reason_ids = values.reason_ids;
        // logObj.logType = values.logType;

        values.selected_stock_id = selected_stock_id;

        dataProvider(CREATE, 'LogModel', { data: values })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'LogModel',
                    '',
                    { page: 1, perPage: 100 },
                    { field: 'content', order: 'ASC' },
                    {selected_stock_id: selected_stock_id}
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
        const { isSubmitting, logType } = this.props;
        const logTypeName = LogSelect.find(x => x.id === logType).name;

        return (
            <Fragment>
                <Button onClick={this.handleClick} label={logTypeName}>
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label={"新建理由 - " + logTypeName}
                >
                    <DialogTitle>{"新建理由 - " + logTypeName}</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="log-quick-create"
                            resource="LogModel"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >
                            <NumberInput source="current_price" label={"当前价格"}/>
                            <NumberInput source="expected_high_price" label={"止盈价格"}/>
                            <NumberInput source="expected_low_price" label={"止损价格"}/>
                            <NumberInput source="suggested_high_price" label={"建议较高价格"}/>
                            <NumberInput source="suggested_low_price" label={"建议较低价格"}/>
                            <NumberInput source="current_position" label={"当前仓位"}/>
                            <ReferenceArrayInput label="理由" reference="ReasonModel" source="reason_ids" perPage={10000}
                                                 sort={{ field: 'seq', order: 'ASC' }} filter={{ content: logTypeName }}>
                                <SelectArrayInput optionText={reasonOptionRenderer}
                                                  options={{
                                                      fullWidth: true,
                                                      fullWidthInput: true,
                                                  }}
                                />
                            </ReferenceArrayInput>
                            <SelectInput source="logType" label={"LOG类型"} choices={LogSelect} defaultValue={logType} />
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
    isSubmitting: isSubmitting('log-quick-create')(state)
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
    LogQuickCreateButton
);
