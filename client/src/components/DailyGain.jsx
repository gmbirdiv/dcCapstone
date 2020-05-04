import React, { useContext, useEffect, useState } from "react";
import FundContext from "../context/funds/fundContext";
import { green, red } from "@material-ui/core/colors";

const DailyGain = (props) => {
  const fundContext = useContext(FundContext);
  const { funds } = fundContext;
  const { fund } = props;
  const [dailyGains, setDailyGains] = useState(0);
  const [dailyGainsDollar, setDailyGainsDollar] = useState(0);

  const getOpeningPrice = async (symbol) => {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote/previousClose?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    let data = await response.json();
    data = data;
    return data;
  };

  const getLatestPrice = async (symbol) => {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote/iexRealtimePrice?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    let data = await response.json();
    console.log("current" + data);
    return data;
  };

  // stock.dayGainPercent = parseFloat(stock.dayGainPercent).toFixed(2) + "%";

  useEffect(async function getPortfolioGains() {
    let oldvalue = 0;
    let portvalue = 0;
    let portgain = 0;
    for (const stock of fund.stocks) {
      oldvalue += stock.shares * (await getOpeningPrice(stock.ticker));
      portvalue += stock.shares * (await getLatestPrice(stock.ticker));
    }
    portgain = ((portvalue - oldvalue) / oldvalue) * 100;
    setDailyGains(portgain);
    setDailyGainsDollar(portvalue - oldvalue);
  }, []);

  let gainStyle = {
    color: green,
  };

  let lossStyle = {
    color: red,
  };
  return (
    <div>
      {dailyGains > 0 ? (
        <p>
          Today's gain:{" "}
          <span style={gainStyle}> {parseFloat(dailyGains).toFixed(2)}%</span>
        </p>
      ) : (
        <p style={gainStyle}>
          Today's gain: {parseFloat(dailyGains).toFixed(2)}%
        </p>
      )}
      <p>
        Today's Net gain:{" "}
        <span style={lossStyle}>
          ${parseFloat(dailyGainsDollar).toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default DailyGain;
