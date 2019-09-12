import React, {Fragment} from 'react';
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
    ChipField,
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
import {SuggestionSelect, LogSelect} from "../models/LogModel";
import ReasonQuickCreateButton from "../component/ReasonQuickCreateButton"

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

const LogFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="待选股票" source="selected_stock_id" reference="SelectedStockModel" alwaysOn>
            <SelectInput optionText={selectStockOptionRenderer} />
        </ReferenceInput>
    </Filter>
);

const ResonReferenceInput = props => (
    <Fragment>
        <ReferenceArrayInput {...props}>
            <SelectArrayInput optionText={reasonOptionRenderer} />
        </ReferenceArrayInput>

        <ReasonQuickCreateButton />
    </Fragment>
);

const selectStockOptionRenderer = stock => `${stock.code} - ${stock.name}`;
const reasonOptionRenderer = reason => `${reason.content} : ${reason.score}`;
//返回到选中股票的详情页面
const redirect = (basePath, id, data) => `/SelectedStockModel/${data.selected_stock_id}/edit`;

export const LogList = (props) => (
    <List {...props} title="日志列表" filters={<LogFilter />} sort={{field: 'crawlAt', order: 'DESC'}} perPage={25} actions={<ListActions/>}>
        <Datagrid options={{multiSelectable:true}} bodyOptions={{ stripedRows: true, showRowHover: true , displayRowCheckbox:true}} headerOptions={{adjustForCheckbox:true}} rowOptions={{selectable: true}}>
            {/*<TextField source="id"/>*/}
            <ReferenceField label="股票" source="selected_stock_id" reference="SelectedStockModel">
                <TextField source={selectStockOptionRenderer} />
            </ReferenceField>
            <TextField source="suggested_low_price" label={"建议较低价格"}/>
            <TextField source="suggested_high_price" label={"建议较高价格"}/>
            <TextField source="expected_low_price" label={"止损价格"}/>
            <TextField source="expected_high_price" label={"止盈价格"}/>
            <TextField source="current_price" label={"当前价格"}/>
            <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <TextField source="star" label={"评级"}/>
            <TextField source="score" label={"评分"}/>
            <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids">
                <SingleFieldList>
                    <ChipField source="content" />
                </SingleFieldList>
            </ReferenceArrayField>
            <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
            <DeleteButton/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const LogShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField label="股票" source="selected_stock_id" reference="SelectedStockModel">
                <TextField source={selectStockOptionRenderer} />
            </ReferenceField>
            <TextField source="suggested_low_price" label={"建议较低价格"}/>
            <TextField source="suggested_high_price" label={"建议较高价格"}/>
            <TextField source="expected_low_price" label={"止损价格"}/>
            <TextField source="expected_high_price" label={"止盈价格"}/>
            <TextField source="current_price" label={"当前价格"}/>
            <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <TextField source="star" label={"评级"}/>
            <TextField source="score" label={"评分"}/>
            <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids">
                <SingleFieldList>
                    <ChipField source="content" />
                </SingleFieldList>
            </ReferenceArrayField>
            <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
        </SimpleShowLayout>
    </Show>
);

export const LogEdit = (props) => (
    <Edit title="日志编辑" {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id"/>
            <ReferenceInput label="待选股" source="selected_stock_id" reference="SelectedStockModel">
                <SelectInput optionText={selectStockOptionRenderer} />
            </ReferenceInput>
            <NumberInput source="suggested_low_price"  label={"建议较低价格"}/>
            <NumberInput source="suggested_high_price" label={"建议较高价格"}/>
            <NumberInput source="expected_low_price" label={"止损价格"}/>
            <NumberInput source="expected_high_price" label={"止盈价格"}/>
            <NumberInput source="current_price" label={"当前价格"}/>
            <SelectInput source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <TextInput source="star" label={"评级"}/>
            <NumberInput source="score" label={"评分"}/>
            <ResonReferenceInput label="理由" reference="ReasonModel" source="reason_ids" perPage={10000}/>
            <SelectInput source="logType" label={"LOG类型"} choices={LogSelect} />
        </SimpleForm>
    </Edit>
);

export const LogCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput label="待选股" source="selected_stock_id" reference="SelectedStockModel">
                <SelectInput optionText={selectStockOptionRenderer} />
            </ReferenceInput>
            <NumberInput source="suggested_low_price"  label={"建议较低价格"}/>
            <NumberInput source="suggested_high_price" label={"建议较高价格"}/>
            <NumberInput source="expected_low_price" label={"止损价格"}/>
            <NumberInput source="expected_high_price" label={"止盈价格"}/>
            <NumberInput source="current_price" label={"当前价格"}/>
            <SelectInput source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <TextInput source="star" label={"评级"}/>
            <NumberInput source="score" label={"评分"}/>
            <ResonReferenceInput label="理由" reference="ReasonModel" source="reason_ids" perPage={10000}/>
            <SelectInput source="logType" label={"LOG类型"} choices={LogSelect} />
        </SimpleForm>
    </Create>
);
