import React, { useState, useEffect, useContext } from "react";
import FundContext from "../context/funds/fundContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AreaChart, PieChart } from "react-chartkick";
import "chart.js";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const FundGraph = (props) => {
  const fundContext = useContext(FundContext);
  const { funds } = fundContext;
  const { fund } = props;
  const classes = useStyles();
  //   const [fiveDayChartData, setfiveDayChartData] = useState([]);
  //   const [oneMonthChartData, setoneMonthChartData] = useState([]);
  //   const [sixMonthChartData, setsixMonthChartData] = useState([]);
  //   const [fiveDayChartDataMin, setfiveDayChartDataMin] = useState(0);
  //   const [oneMonthChartDataMin, setoneMonthChartDataMin] = useState(0);
  //   const [sixMonthChartData, setSixMonthChartData] = useState(0);

  //   const [value, setValue] = React.useState(2);

  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  //   const [value, setValue] = React.useState(2);

  const getHistoricalPrice = async (symbol) => {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/chart/5d?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    let data = await response.json();
    return data;
  };

  useEffect(async () => {
    try {
      //   let portValue = 0;
      let tempArray = [];
      let amountArray = [];
      let portValueData = [];
      let newestArray = [];

      //   let temp2Array = [];
      //   let portfolioValueArray = [];

      for (const stock of fund.stocks) {
        portValueData.push(await getHistoricalPrice(stock.ticker));
        amountArray.push(stock.shares);
      }
      // await portValueData.reduce((acc, day) => {
      //   tempArray.push(day[0].close);
      //   // });
      //   portValueData.map((priceArray) => {
      //     priceArray.map((day) => {
      //       tempArray.push(day.close);
      //     });

      //     console.log(tempArray);
      //     for(let j=0; j < tempArray.length; j++)
      // let finalArray = tempArray.map(function (v, i) {
      //   return v * this[i], amountArray;
      // });

      // for (let j = 0; j < tempArray.length; j += 5) {
      //   let dailyValue = tempArray
      //     .filter((j, i) => i % 5 == 0)
      //     .reduce((a, b) => a + b);
      //   newestArray.push(dailyValue);
      // }

      // console.log(newestArray);
    } catch {}
  }, []);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  const [tabvalue, settabValue] = React.useState(0);

  const handletabChange = (event, newValue) => {
    settabValue(newValue);
  };

  return (
    <h1> hi </h1>
    // <Card className={classes.root} id="fundChartCard">
    //   <Tabs
    //     value={tabvalue}
    //     indicatorColor="primary"
    //     textColor="primary"
    //     onChange={handletabChange}
    //     aria-label="disabled tabs example"
    //   >
    //     <Tab label="S&P 500" />
    //     <Tab label="NASDAQ" />
    //     <Tab label="DOW" />
    //   </Tabs>
    //   <TabPanel value={tabvalue} index={0}>
    //     <CardContent>
    //       <h1 className="title">S&P 500</h1>
    //       <AreaChart
    //         data={spchartData}
    //         min={spchartMin}
    //         points={false}
    //         xtitle="Time of day"
    //         ytitle="Average Price"
    //         colors={["#D7A02B", "#D7A02B"]}
    //         library={{
    //           animation: { duration: 1500, easing: "linear" },
    //           scales: {
    //             yAxes: [
    //               {
    //                 ticks: {
    //                   maxTicksLimit: 20,
    //                   stepSize: 1,
    //                 },
    //               },
    //             ],
    //           },
    //         }}
    //       />
    //     </CardContent>
    //   </TabPanel>
    //   <TabPanel value={tabvalue} index={1}>
    //     <CardContent>
    //       <h1 className="title">NASDAQ</h1>
    //       <AreaChart
    //         data={naschartData}
    //         min={naschartMin}
    //         points={false}
    //         xtitle="Time of day"
    //         ytitle="Average Price"
    //         colors={["#D7A02B", "#D7A02B"]}
    //         library={{
    //           animation: { duration: 1500, easing: "linear" },
    //           scales: {
    //             yAxes: [
    //               {
    //                 ticks: {
    //                   maxTicksLimit: 20,
    //                   stepSize: 1,
    //                 },
    //               },
    //             ],
    //           },
    //         }}
    //       />
    //     </CardContent>
    //   </TabPanel>
    //   <TabPanel value={tabvalue} index={2}>
    //     <CardContent>
    //       <h1 className="title">DOW</h1>
    //       <AreaChart
    //         data={diachartData}
    //         min={diachartMin}
    //         points={false}
    //         xtitle="Time of day"
    //         ytitle="Average Price"
    //         colors={["#D7A02B", "#D7A02B"]}
    //         library={{
    //           animation: { duration: 1500, easing: "linear" },
    //           scales: {
    //             yAxes: [
    //               {
    //                 ticks: {
    //                   maxTicksLimit: 20,
    //                   stepSize: 1,
    //                 },
    //               },
    //             ],
    //           },
    //         }}
    //       />
    //     </CardContent>
    //   </TabPanel>
    // </Card>
  );
};

export default FundGraph;
