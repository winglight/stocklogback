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
    BooleanField,
    RichTextField,
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
    FormDataConsumer,
    SimpleForm,
    Pagination,
    CardActions,
    TextInput,
    ShowButton,
    DeleteButton,
    RefreshButton,
    GET_MANY
} from 'react-admin';
import {showNotification, CreateButton} from 'react-admin';
import { Link } from 'react-router-dom';
import { DateInput, DateTimeInput } from 'react-admin';
import moment from 'moment';
import {StrategyCategory, HyperParams, StatusSelect, Status} from '../models/SelectedStockModel'
import LogModel, {LogSelect, SuggestionSelect, StarSelect, LogType, SuggestionType} from "../models/LogModel";
import LogQuickCreateButton from "../component/LogQuickCreateButton"
import LogQuickEditButton from "../component/LogQuickEditButton"
import {dataProvider} from "../models/data_provider_config";

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ListPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
const reasonOptionRenderer = reason => `${reason.content} : ${reason.score}`;
const AxisPriceField = ({ source, record, ...props  }) => {
    let axisPrice = (record.high + record.low + record.close)/3;
    let resistPrice1 = 2 * axisPrice - record.low;
    let resistPrice2 = axisPrice + record.high - record.low;
    let resistPrice3 = resistPrice1 + record.high - record.low;
    let supportPrice1 = 2 * axisPrice - record.high;
    let supportPrice2 = axisPrice - (record.high - record.low);
    let supportPrice3 = supportPrice1 - (record.high - record.low);

    return (
        <ul>
             <li key="resistPrice3">{"阻力3：" + resistPrice3.toFixed(2)}</li>
             <li key="resistPrice2">{"阻力2：" + resistPrice2.toFixed(2)}</li>
             <li key="resistPrice1">{"阻力1：" + resistPrice1.toFixed(2)}</li>
             <li key="axisPrice">{"轴 心 ：" + axisPrice.toFixed(2)}</li>
             <li key="supportPrice1">{"支撑1：" + supportPrice1.toFixed(2)}</li>
             <li key="supportPrice2">{"支撑2：" + supportPrice2.toFixed(2)}</li>
             <li key="supportPrice3">{"支撑3：" + supportPrice3.toFixed(2)}</li>
        </ul>
    );
}

const ListActions = ({resource, filters, displayedFilters, filterValues, basePath, showFilter}) => (
    <CardActions style={cardActionStyle}>
        <CreateButton basePath={basePath}/>
        <RefreshButton/>
    </CardActions>
);

const ShowActions = ({ basePath, data, resource }) => (
    <CardActions style={cardActionStyle}>
        <Button component={Link}
                to={{
                    pathname: '/LogModel',
                    state: { record: { selected_stock_id: data && data.id } },
                }} color="primary" >日志列表</Button>
        {/* Add your custom actions */}
        <Button component={Link}
                    to={{
                        pathname: '/LogModel/create',
                        state: { record: { selected_stock_id: data && data.id } },
                    }} color="primary" >选股</Button>
        <LogQuickCreateButton selected_stock_id={data && data.id} logType={LogType.BID} />
        <LogQuickCreateButton selected_stock_id={data && data.id} logType={LogType.ORDER} />
        <LogQuickCreateButton selected_stock_id={data && data.id} logType={LogType.HOLD} />
        <LogQuickCreateButton selected_stock_id={data && data.id} logType={LogType.SELL} />
    </CardActions>
);

const EditActions = ({ basePath, data, resource }) => (
    <CardActions style={cardActionStyle}>
        <ShowButton basePath={basePath} record={data} />
    </CardActions>
);

const ListFilter = (props) => (
    <Filter {...props}>
        <SelectInput label="策略" source="strategy" choices={StrategyCategory} filterdefaultvalues={StrategyCategory[0]} alwaysOn/>
        <SelectInput label="超参数" source="hyper_params" choices={HyperParams} filterdefaultvalues="" alwaysOn/>
        <DateInput label="选股日期" source="date" filterdefaultvalues={moment().format('YYYY-MM-DD')} alwaysOn />
        <TextInput label="股票编码" source="code" filterdefaultvalues="" alwaysOn />
        <TextInput label="搜索" source="q" filterdefaultvalues="" alwaysOn />
        <SelectInput label="状态" source="status" choices={StatusSelect} filterdefaultvalues="" alwaysOn/>
    </Filter>
);

export const SelectedStockList = (props) => (
    <List {...props} title={"选股列表"} filters={<ListFilter />} sort={{field: 'date', order: 'DESC'}} perPage={25} pagination={<ListPagination />}
          actions={<ListActions/>}>
        <Datagrid options={{multiSelectable:true}} bodyoptions={{ stripedRows: true, showRowHover: true , displayRowCheckbox:true}}
                  headeroptions={{adjustForCheckbox:true}} rowoptions={{selectable: true}} rowClick="expand" expand={<LogShow />}>
            {/*<TextField source="id"/>*/}
            <TextField source="date" label={"选股日期"}/>
            <TextField source="code"label={"代码"}/>
            <TextField source="name"label={"名称"}/>
            <SelectField source="star" label={"评级"} choices={StarSelect} />
            <TextField source="strategy" label={"策略名称"}/>
            <TextField source="hyper_params"label={"超参数组合"}/>
            <NumberField source="good_bad"label={"gb策略值"}/>
            <NumberField source="volatility"label={"波动率"} options={{ style: 'percent', maximumFractionDigits: 2 }} />
            <NumberField source="volat_price"label={"波动价格"} options={{ style: 'currency', currency: 'CNY' }}/>
            <AxisPriceField label={"轴心价格"}/>
            <NumberField source="vol50_change"label={"成交量变动"} options={{ maximumFractionDigits: 2 }} />
            <NumberField source="totalCapital"label={"流通市值"} options={{ style: 'currency', currency: 'CNY' }}/>
            <SelectField source="status" label={"状态"} choices={StatusSelect} />
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const LogShow = (props) => (
    <Show title="l" actions={<ShowActions/>} {...props}>
    <SimpleShowLayout>
    <ReferenceManyField
        label=""
        reference="LogModel"
        target="selected_stock_id"
        sort={{ field: 'createdAt', order: 'ASC' }}
    >
        <Datagrid options={{multiSelectable:true}}>
            <TextField source="suggested_low_price" label={"建议较低价格"}/>
            <TextField source="suggested_high_price" label={"建议较高价格"}/>
            <TextField source="expected_low_price" label={"止损价格"}/>
            <TextField source="expected_high_price" label={"止盈价格"}/>
            <TextField source="current_price" label={"当前价格"}/>
            <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
            <SelectField source="star" label={"评级"} choices={StarSelect} />
            <TextField source="score" label={"评分"}/>
            <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids"
                                 sort={{ field: 'seq', order: 'ASC' }}>
                <SingleFieldList>
                    <ChipField source="content" />
                </SingleFieldList>
            </ReferenceArrayField>
            <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
            <DateField source="updatedAt" locales="zh-CN" showTime label="更新时间"/>
            <RichTextField source="comment" label={"操作评价"}/>
            <BooleanField source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
            <DateField source="commentTime" locales="zh-CN" showTime label="操作评价时间"/>
            <LogQuickEditButton />
            <EditButton />
        </Datagrid>
    </ReferenceManyField>
    </SimpleShowLayout>
    </Show>
);

export const SelectedStockShow = (props) => (
    <Show title="选股详情" actions={<ShowButton/>} {...props}>
        <SimpleShowLayout>
            <TextField source="date" label={"选股日期"}/>
            <TextField source="strategy" label={"策略名称"}/>
            <TextField source="hyper_params"label={"超参数组合"}/>
            <TextField source="code"label={"代码"}/>
            <TextField source="name"label={"名称"}/>
            <SelectField source="star" label={"评级"} choices={StarSelect} />
            <TextField source="good_bad"label={"gb策略值"}/>
            <TextField source="good"label={"当天good值"}/>
            <TextField source="bad"label={"当天bad值"}/>
            <TextField source="volatility"label={"波动率"}/>
            <TextField source="volat_price"label={"波动价格"}/>
            <TextField source="totalCapital"label={"流通市值"}/>
            <TextField source="vol50_change"label={"成交量变动"}/>
            <SelectField source="status" label={"状态"} choices={StatusSelect} />
            <DateField source="updatedAt" locales="zh-CN" showTime label="更新时间"/>
            <LogShow {...props}/>
        </SimpleShowLayout>
    </Show>
);

export const SelectedStockEdit = (props) => (
    <Edit title={"编辑选中股票"} actions={<EditActions/>} {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <DisabledInput source="date" label={"选股日期"}/>
            <DisabledInput source="strategy" label={"策略名称"}/>
            <DisabledInput source="hyper_params"label={"超参数组合"}/>
            <DisabledInput source="code"label={"代码"}/>
            <DisabledInput source="name"label={"名称"}/>
            <SelectInput source="star" label={"评级"} choices={StarSelect} />
            <FormDataConsumer>
                {({ formData, ...rest }) => {
                    if (parseInt(formData.star) >= 3 && formData.status === Status.SELECTED) {
                        formData.status = Status.CANDIDATED;
                    }
                    return (
                        <SelectInput source="status" label={"状态"} choices={StatusSelect} />
                    )
                }
                }
            </FormDataConsumer>

            <ReferenceManyField
                label=""
                reference="LogModel"
                target="selected_stock_id"
                sort={{ field: 'createdAt', order: 'ASC' }}
            >
                <Datagrid>
                    <TextField source="suggested_low_price" label={"建议较低价格"}/>
                    <TextField source="suggested_high_price" label={"建议较高价格"}/>
                    <TextField source="expected_low_price" label={"止损价格"}/>
                    <TextField source="expected_high_price" label={"止盈价格"}/>
                    <TextField source="current_price" label={"当前价格"}/>
                    <SelectField source="suggested_action" label={"推荐动作"} choices={SuggestionSelect} />
                    <SelectField source="star" label={"评级"} choices={StarSelect} />
                    <TextField source="score" label={"评分"}/>
                    <ReferenceArrayField label="理由" reference="ReasonModel" source="reason_ids"
                                         sort={{ field: 'seq', order: 'ASC' }}>
                        <SingleFieldList>
                            <ChipField source="content" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <SelectField source="logType" label={"LOG类型"} choices={LogSelect} />
                    <DateField source="updatedAt" locales="zh-CN" showTime label="更新时间"/>
                    <RichTextField source="comment" label={"操作评价"}/>
                    <BooleanField source="isSuccessful" valueLabelTrue="满意" valueLabelFalse="不满意" label="操作是否满意"/>
                    <DateField source="commentTime" locales="zh-CN" showTime label="操作评价时间"/>
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
            <SelectInput source="star" label={"评级"} choices={StarSelect} />
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
