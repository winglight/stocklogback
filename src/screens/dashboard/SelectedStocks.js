// import * as React from 'react';
// import { useMemo, useState } from 'react';
// import Card from '@material-ui/core/Card';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// import CustomerIcon from '@material-ui/icons/PersonAdd';
// import Divider from '@material-ui/core/Divider';
// import { makeStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';
// // import {useTranslate, useQueryWithStore, DateInput} from 'react-admin';

// import moment from "moment";
// import {Status} from "../../models/SelectedStockModel";
// import LogQuickEditButton from "../../component/LogQuickEditButton";
// import {AxisPriceList} from "../../component/AxisPriceList";

// const useStyles = makeStyles({
//     main: {
//         flex: '1',
//         marginLeft: '1em',
//         marginTop: 20,
//     },
//     card: {
//         padding: '16px 0',
//         overflow: 'inherit',
//         textAlign: 'right',
//     },
//     title: {
//         padding: '0 16px',
//     },
//     value: {
//         padding: '0 16px',
//         minHeight: 48,
//     },
// });

// const SelectedStocksTable = () => {
//     const classes = useStyles();
//     const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
//     const translate = useTranslate();
//     const aMonthAgo = useMemo(() => {
//         const date = new Date();
//         date.setDate(date.getDate() - 30);
//         date.setHours(0);
//         date.setMinutes(0);
//         date.setSeconds(0);
//         date.setMilliseconds(0);
//         return date;
//     }, []);

//     const { loaded, data: stocks } = useQueryWithStore({
//         type: 'getList',
//         resource: 'SelectedStockModel',
//         payload: {
//             filter: {
//                 status: Status.CANDIDATED,
//             },
//             sort: { field: 'date', order: 'DESC' },
//             pagination: { page: 1, perPage: 5 },
//         },
//     });

//     if (!loaded) return null;

//     return (
//         <div className={classes.main}>
//             <Card className={classes.card}>
//                 <Divider />
//                 <List>
//                     {stocks
//                         ? stocks.map((stock) => (
//                             <ListItem
//                                 key={stock.id}
//                             >
//                                 <ListItem>
//                                     {stock.date}
//                                     -{stock.code}
//                                     -{stock.name}
//                                 </ListItem>
//                                 <ListItemText
//                                     primary={stock.star}
//                                 />
//                                 <ListItem>
//                                     <AxisPriceList record={stock}/>
//                                 </ListItem>
//                             </ListItem>
//                         ))
//                         : null}
//                 </List>
//             </Card>
//         </div>
//     );
// };

// export default SelectedStocksTable;
