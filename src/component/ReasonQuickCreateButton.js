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
import {ReasonModel} from "../models/ReasonModel";

class ReasonQuickCreateButton extends Component {
    state = {
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
        submit('reason-quick-create');
    };

    handleSubmit = values => {
        const {
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
        let reason = new ReasonModel();
        reason.content = values.content;
        reason.score = values.score;

        dataProvider(CREATE, 'ReasonModel', { data: values })
            .then(({ data }) => {
                // Refresh the choices of the ReferenceInput to ensure our newly created post
                // always appear, even after selecting another post
                crudGetMatching(
                    'ReasonModel',
                    '',
                    { page: 1, perPage: 100 },
                    { field: 'content', order: 'ASC' },
                    {}
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
        const { isSubmitting } = this.props;

        return (
            <Fragment>
                <Button onClick={this.handleClick} label="ra.action.create">
                    <IconContentAdd />
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="新建理由"
                >
                    <DialogTitle>新建理由</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="reason-quick-create"
                            resource="ReasonModel"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >
                            <NumberInput source="seq" label={"顺序"}/>
                            <TextInput source="content" label={"理由"}/>
                            <NumberInput source="score" label={"分数"}/>
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
    isSubmitting: isSubmitting('reason-quick-create')(state)
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
    ReasonQuickCreateButton
);
