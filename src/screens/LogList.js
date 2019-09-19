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
    BooleanInput,
    BooleanField,
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
    LongTextInput,
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
import {SuggestionSelect, LogSelect, StarSelect} from "../models/LogModel";
import ReasonQuickCreateButton from "../component/ReasonQuickCreateButton"
import { DateInput, TimeInput, DateTimeInput } from 'react-admin-date-inputs';
import RichTextInput from 'ra-input-rich-text';

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

const ReasonReferenceInput = props => (
    <Fragment options={{
        fullWidth: true,
        fullWidthInput: true,
    }}>
        <ReferenceArrayInput {...props}>
            <SelectArrayInput optionText={reasonOptionRenderer}
                              options={{
                                  fullWidth: true,
                                  fullWidthInput: true,
                              }}
            />
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
            <TextField source="current_position" label={"当前仓位"}/>
            <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <SelectField source="star" label={"评级"} choices={StarSelect} />
            <TextField source="score" label={"评分"}/>
            <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids">
                <SingleFieldList>
                    <ChipField source="content" />
                </SingleFieldList>
            </ReferenceArrayField>
            <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
            <RichTextField source="comment" label={"操作评价"}/>
            <BooleanField source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
            <DateField source="commentTime" locales="zh-CN" showTime label="操作评价时间"/>
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
            <TextField source="current_position" label={"当前仓位"}/>
            <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <SelectField source="star" label={"评级"} choices={StarSelect} />
            <TextField source="score" label={"评分"}/>
            <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids">
                <SingleFieldList>
                    <ChipField source="content" />
                </SingleFieldList>
            </ReferenceArrayField>
            <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
            <RichTextField source="comment" label={"操作评价"}/>
            <BooleanField source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
            <DateField source="commentTime" locales="zh-CN" showTime label="操作评价时间"/>
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
            <NumberInput source="current_position" label={"当前仓位"}/>
            <SelectInput source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <SelectInput source="star" label={"评级"} choices={StarSelect} />
            <NumberInput source="score" label={"评分"}/>
            <ReasonReferenceInput label="理由" reference="ReasonModel" source="reason_ids" perPage={10000}
                                 sort={{ field: 'seq', order: 'ASC' }}/>
            <SelectInput source="logType" label={"LOG类型"} choices={LogSelect} />
            <RichTextInput source="comment" label={"操作评价"}/>
            <BooleanInput source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
            <DateTimeInput source="commentTime" label="操作评价时间" options={{ format: 'YYYY-MM-dd, HH:mm:ss', ampm: false, clearable: true }} />
        </SimpleForm>
    </Edit>
);

export const LogCreate = (props) => (
    <Create {...props}>
        <SimpleForm redirect={redirect} options={{
            fullWidth: true,
            fullWidthInput: true,
        }}>
            <DisabledInput source="id" />
            <ReferenceInput label="待选股" source="selected_stock_id" reference="SelectedStockModel">
                <SelectInput optionText={selectStockOptionRenderer} />
            </ReferenceInput>
            <NumberInput source="suggested_low_price"  label={"建议较低价格"}/>
            <NumberInput source="suggested_high_price" label={"建议较高价格"}/>
            <NumberInput source="expected_low_price" label={"止损价格"}/>
            <NumberInput source="expected_high_price" label={"止盈价格"}/>
            <NumberInput source="current_price" label={"当前价格"}/>
            <NumberInput source="current_position" label={"当前仓位"}/>
            <SelectInput source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <SelectInput source="star" label={"评级"} choices={StarSelect} />
            <NumberInput source="score" label={"评分"}/>
            <ReasonReferenceInput label="理由" reference="ReasonModel" source="reason_ids" perPage={10000}
                                 sort={{ field: 'seq', order: 'ASC' }} options={{
                fullWidth: true,
                fullWidthInput: true,
            }}/>
            <SelectInput source="logType" label={"LOG类型"} choices={LogSelect} />
            <RichTextInput source="comment" label={"操作评价"}/>
            <BooleanInput source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
            <DateTimeInput source="commentTime" label="操作评价时间" options={{ format: 'YYYY-MM-dd, HH:mm:ss', ampm: false, clearable: true }} />
        </SimpleForm>
    </Create>
);
