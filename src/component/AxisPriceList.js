import * as React from "react";

export const AxisPriceList = ({ record }) => {
    // console.log("record: " + JSON.stringify(record));
    let axisPrice = (record.high + record.low + record.close)/3;
    let resistPrice1 = 2 * axisPrice - record.low;
    let resistPrice2 = axisPrice + record.high - record.low;
    let resistPrice3 = resistPrice1 + record.high - record.low;
    let supportPrice1 = 2 * axisPrice - record.high;
    let supportPrice2 = axisPrice - (record.high - record.low);
    let supportPrice3 = supportPrice1 - (record.high - record.low);

    let upPrice = Math.max((1 + record.volatility) * record.close, resistPrice2);
    let downPrice = Math.max((1 - record.volatility) * record.close, supportPrice1);
    let suggestBuyPrice1 = Math.min((1 - record.volatility) * record.close, supportPrice2);
    let suggestBuyPrice2 = Math.min((1 + record.volatility) * record.close, resistPrice1);

    return (
        <ul>
            <li key="upPrice">{"止盈价格：" + upPrice.toFixed(2)}</li>
            <li key="downPrice">{"止损价格：" + downPrice.toFixed(2)}</li>
            <li key="suggestBuyPrice2">{"建议买入价格(高)：" + suggestBuyPrice2.toFixed(2)}</li>
            <li key="suggestBuyPrice1">{"建议买入价格(低)：" + suggestBuyPrice1.toFixed(2)}</li>
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