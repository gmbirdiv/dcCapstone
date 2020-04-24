import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import TableFooter from '@material-ui/core/TableFooter';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { AreaChart, PieChart } from "react-chartkick";
import "chart.js";


class LookupChart extends Component {
  state = {
    input: '',
    searchArray: [],
    quote: 0,
    pickedSecurity: {},
    fundName: "",
    pickedSymbol:""
  };

  getQuote = async () => {
    const { pickedSymbol } = this.state;
    const response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${pickedSymbol}/quote/latestPrice?token=pk_135e66691d174c4291a33989af3f52c9`
    );
    const data = await response.json();
    await this.setState({
      quote: data,
    });
  };

  searchInput = async () => {
    const { input } = this.state;
    const response = await fetch(
      `https://cloud.iexapis.com/stable/search/${input}?token=sk_2fac0c511a7f481e85a5f5928838a339`
    );
    const data = await response.json();
    await this.setState({
      searchArray: data,
    });
  };

  autoComplete = async (event, param) => {
    try {
      await this.setState(
      {
        input: event.target.value,
        pickedSecurity: param.substr(param.indexOf(' '),param.length),
        pickedSymbol: param.substr(0,param.indexOf(' '))
      },
      await this.searchInput
    );
    } catch(e){
      return e
    }
  };


  // autoComplete = async (event) => {
  //   try {
  //     await this.setState(
  //     {
  //       input: event.target.value,
  //     },
  //     await this.searchInput
  //   );
  //   } catch(e){
  //     return e
  //   }
  // };


  // setInput = (param) => {
  //   try {this.setState({
  //     input: param.symbol,
  //     pickedSecurity: param,
  //     pickedSymbol: param.symbol
  //   });
  //   } catch (e){
  //     return e 
  //   }
  // };



  setFundName = (event) =>{
      this.setState({
          fundName: event.target.value
      })
  }

  render() {
    const { searchArray, quote, shareAmount, fundName} = this.state;
    return (
      <div style={{ width: 800 }}>
        <TextField
          id='fundName'
          label='Name your Fund'
          variant='outlined'
          onChange={this.setFundName}
        />
        <Autocomplete
          id='stockInput'
          onInputChange={(event, newValue) => {
            this.autoComplete(event,newValue);
          }}
          onSelect={this.getQuote}
          options={searchArray}
          getOptionLabel={(stock) => stock.symbol + ' ' + stock.securityName}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Select Company Ticker'
              margin='normal'
              variant='outlined'
            />
          )}
        />
        <br />
        <TextField
          id='lastPrice'
          label='Last Price'
          value={quote}
          InputProps={{
            readOnly: true,
          }}
          variant='outlined'
        />
        <br />
        <br />
        <TextField
          id='amountToInvest'
          label='Amount to Invest'
          variant='outlined'
          onChange={this.amountToInvestInput}
        />
        <br />
        <br />
        <TextField
          id='amountOfShares'
          label='Amount of Shares'
          variant='outlined'
          InputProps={{
            readOnly: true,
          }}
          value={shareAmount}
        />
        <br />
        <br />
        <Button onClick={this.onFundAdd} variant='contained' color='primary'>
          Add Security
        </Button>
        <MaterialTable
          title={fundName}
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
          <Button variant='contained' color='primary'>
          Save Fund
        </Button>
      </div>
    );
  }
}

export default LookupChart;
