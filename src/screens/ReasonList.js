import React from 'react';
import Button from '@material-ui/core/Button';
import {
    List,
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    SelectField,
    ImageField,
    UrlField,
    RichTextField,
    SingleFieldList,
    ReferenceField,
    ReferenceInput,
    ReferenceArrayInput,
    SelectArrayInput,
    Filter,
    Edit,
    Create,
    Datagrid,
    EditButton,
    DisabledInput,
    SelectInput,
    SimpleForm,
    TextInput,
    NumberInput,
    ReferenceArrayField,
    CardActions,
    ShowButton,
    CreateButton,
    DeleteButton,
    RefreshButton,
    SaveButton,
    Toolbar,
    showNotification
} from 'react-admin';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ListActions = ({resource, filters, displayedFilters, filterValues, basePath, showFilter}) => (
    <CardActions style={cardActionStyle}>
        <CreateButton basePath={basePath}/>
        <RefreshButton/>
    </CardActions>
);

const ReasonFilter = (props) => (
    <Filter {...props}>

    </Filter>
);

const CreateToolbar = props => (
    <Toolbar {...props} >
        <SaveButton
            label="保存"
            redirect="list"
            submitOnEnter={true}
        />
        <SaveButton
            label="保存并新增"
            redirect={false}
            submitOnEnter={false}
            variant="flat"
        />
    </Toolbar>
);

export const ReasonList = (props) => (
    <List {...props} title="日志列表" filters={<ReasonFilter />} sort={{field: 'content', order: 'ASC'}} perPage={25} actions={<ListActions/>}>
        <Datagrid options={{multiSelectable:true}} bodyOptions={{ stripedRows: true, showRowHover: true , displayRowCheckbox:true}} headerOptions={{adjustForCheckbox:true}} rowOptions={{selectable: true}}>
            {/*<TextField source="id"/>*/}
            <TextField source="content" label={"理由"}/>
            <TextField source="score" label={"分数"}/>
            <DeleteButton/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const ReasonShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="content" label={"理由"}/>
            <TextField source="score" label={"分数"}/>
        </SimpleShowLayout>
    </Show>
);

export const ReasonEdit = (props) => (
    <Edit title="日志编辑" {...props}>
        <SimpleForm toolbar={<CreateToolbar />} redirect="List">
            <DisabledInput source="id"/>
            <TextInput source="content" label={"理由"}/>
            <NumberInput source="score" label={"分数"}/>
        </SimpleForm>
    </Edit>
);

export const ReasonCreate = (props) => (
    <Create {...props}>
        <SimpleForm toolbar={<CreateToolbar />} redirect="List">
            <DisabledInput source="id" />
            <TextInput source="content" label={"理由"}/>
            <NumberInput source="score" label={"分数"}/>
        </SimpleForm>
    </Create>
);
