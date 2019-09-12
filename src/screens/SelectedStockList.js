import React from 'react';
import Button from '@material-ui/core/Button';
import {
    List,
    Filter,
    Show,
    SimpleShowLayout,
    TextField,
    NumberField,
    DateField,
    SelectField,
    ImageField,
    UrlField,
    ReferenceManyField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    Edit,
    Create,
    Datagrid,
    EditButton,
    DisabledInput,
    SelectInput,
    SimpleForm,
    CardActions,
    TextInput,
    ShowButton,
    DeleteButton,
    RefreshButton
} from 'react-admin';
import {showNotification, CreateButton} from 'react-admin';
import { Link } from 'react-router-dom';
import { DateInput, TimeInput, DateTimeInput } from 'react-admin-date-inputs';
import moment from 'moment';
import {StrategyCategory, HyperParams, StatusSelect} from '../models/SelectedStockModel'
import LogModel, {LogSelect, SuggestionSelect} from "../models/LogModel";

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const reasonOptionRenderer = reason => `${reason.content} : ${reason.score}`;

const ListActions = ({resource, filters, displayedFilters, filterValues, basePath, showFilter}) => (
    <CardActions style={cardActionStyle}>
        <CreateButton basePath={basePath}/>
        <RefreshButton/>
    </CardActions>
);

const ShowActions = ({ basePath, data, resource }) => (
    <CardActions style={cardActionStyle}>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button component={Link}
                    to={{
                        pathname: '/LogModel/create',
                        state: { record: { selected_stock_id: data && data.id } },
                    }} color="primary" >添加日志</Button>
    </CardActions>
);

const ListFilter = (props) => (
    <Filter {...props}>
        <SelectInput label="策略" source="strategy" choices={StrategyCategory} filterDefaultValues={StrategyCategory[0]} alwaysOn/>
        <SelectInput label="超参数" source="hyper_params" choices={HyperParams} filterDefaultValues="" alwaysOn/>
        <TextInput label="选股日期" source="date" filterDefaultValues={moment().format('YYYY-MM-DD')} alwaysOn />
        <TextInput label="股票编码" source="code" filterDefaultValues="" alwaysOn />
        <TextInput label="搜索" source="q" filterDefaultValues="" alwaysOn />
        <SelectInput label="状态" source="status" choices={StatusSelect} filterDefaultValues="" alwaysOn/>
    </Filter>
);

export const SelectedStockList = (props) => (
    <List {...props} title={"选股列表"} filters={<ListFilter />} sort={{field: 'date', order: 'DESC'}} perPage={25}
          actions={<ListActions/>}>
        <Datagrid options={{multiSelectable:true}} bodyOptions={{ stripedRows: true, showRowHover: true , displayRowCheckbox:true}}
                  headerOptions={{adjustForCheckbox:true}} rowOptions={{selectable: true}} rowClick="expand" expand={<LogShow />}>
            {/*<TextField source="id"/>*/}
            <TextField source="date" label={"选股日期"}/>
            <TextField source="strategy" label={"策略名称"}/>
            <TextField source="hyper_params"label={"超参数组合"}/>
            <TextField source="code"label={"代码"}/>
            <TextField source="name"label={"名称"}/>
            <NumberField source="good_bad"label={"gb策略值"}/>
            <NumberField source="good"label={"当天good值"}/>
            <NumberField source="bad"label={"当天bad值"}/>
            <NumberField source="volatility"label={"波动率"} options={{ style: 'percent', maximumFractionDigits: 2 }} />
            <NumberField source="volat_price"label={"波动价格"} options={{ style: 'currency', currency: 'CNY' }}/>
            <NumberField source="totalCapital"label={"流通市值"} options={{ style: 'currency', currency: 'CNY' }}/>
            <NumberField source="vol50_change"label={"成交量变动"} options={{ maximumFractionDigits: 2 }} />
            <SelectField source="status" label={"状态"} choices={StatusSelect} />
            <DateField source="updatedAt" locales="zh-CN" showTime label="更新时间"/>
            <DeleteButton/>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const LogShow = (props) => (
    <Show title="选股详情" actions={<ShowActions/>} {...props}>
    <SimpleShowLayout>
    <ReferenceManyField
        label=""
        reference="LogModel"
        target="selected_stock_id"
    >
        <Datagrid>
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
            <TextField source="updatedAt" label={"更新时间"}/>
            <EditButton />
        </Datagrid>
    </ReferenceManyField>
    </SimpleShowLayout>
    </Show>
);

export const SelectedStockShow = (props) => (
    <Show title="选股详情" actions={<ShowActions/>} {...props}>
        <SimpleShowLayout>
            <TextField source="date" label={"选股日期"}/>
            <TextField source="strategy" label={"策略名称"}/>
            <TextField source="hyper_params"label={"超参数组合"}/>
            <TextField source="code"label={"代码"}/>
            <TextField source="name"label={"名称"}/>
            <TextField source="good_bad"label={"gb策略值"}/>
            <TextField source="good"label={"当天good值"}/>
            <TextField source="bad"label={"当天bad值"}/>
            <TextField source="volatility"label={"波动率"}/>
            <TextField source="volat_price"label={"波动价格"}/>
            <TextField source="totalCapital"label={"流通市值"}/>
            <TextField source="vol50_change"label={"成交量变动"}/>
            <SelectField source="status" label={"状态"} choices={StatusSelect} />
            <DateField source="updatedAt" locales="zh-CN" showTime label="更新时间"/>
            <ReferenceManyField
                label="日志"
                reference="LogModel"
                target="selected_stock_id"
            >
                <Datagrid>
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
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

export const SelectedStockEdit = (props) => (
    <Edit title={"编辑选中股票"} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <DisabledInput source="date" label={"选股日期"}/>
            <DisabledInput source="strategy" label={"策略名称"}/>
            <DisabledInput source="hyper_params"label={"超参数组合"}/>
            <DisabledInput source="code"label={"代码"}/>
            <DisabledInput source="name"label={"名称"}/>
            <SelectInput source="status" label={"状态"} choices={StatusSelect} />
            <ReferenceManyField
                label="日志"
                reference="LogModel"
                target="selected_stock_id"
            >
                <Datagrid>
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
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>

    </Edit>
);

export const SelectedStockCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="date" label={"选股日期"}/>
            <TextInput source="strategy" label={"策略名称"}/>
            <TextInput source="hyper_params"label={"超参数组合"}/>
            <TextInput source="code"label={"代码"}/>
            <TextInput source="name"label={"名称"}/>
            <TextInput source="good_bad"label={"gb策略值"}/>
            <TextInput source="good"label={"当天good值"}/>
            <TextInput source="bad"label={"当天bad值"}/>
            <TextInput source="volatility"label={"波动率"}/>
            <TextInput source="volat_price"label={"波动价格"}/>
            <TextInput source="totalCapital"label={"流通市值"}/>
            <TextInput source="vol50_change"label={"成交量变动"}/>
            <SelectInput source="status" label={"状态"} choices={StatusSelect} />
        </SimpleForm>
    </Create>
);
