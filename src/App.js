import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from 'material-ui/DatePicker';
import axios from "axios"
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Comp extends Component {
  componentDidMount() {
    // axios.get("https://developer.schiphol.nl/apis/flight-api/flights","736271b6").then((dta)=>{console.log(dta)})
  }
  render() {
    return (
      // {/* <div style={{borderColor:"black"}}>{this.props.day.toDateString()}</div> */}
      <div>

        <input value={this.props.day.toDateString()} />
      </div>
    )
  }
}
class App extends Component {
  constructor() {
    super();

    this.state = {
      day: new Date()
    }
  }
  componentDidUpdate() {
    var date = this.state.day.toLocaleDateString();
    date = date.split("/")
    var date1 = date[2] + "-" + date[0] + "-" + date[1]
    console.log("date1", date1)

    axios.get(
      "https://api.schiphol.nl/public-flights/flights?app_id=736271b6&app_key=92b67b61a7e5ed55211ef7584a05d618&scheduledate=" + date1 + "&includedelays=false&page=0&sort=%2Bscheduletime",
      {
        headers: { Accept: 'application/json', ResourceVersion: 'v3' }
      }
    )
      .then((data) => {
        console.log(data)
        this.setState({
          data: data
        })
      })
  }

  componentDidMount() {
    var date = this.state.day.toLocaleDateString();
    date = date.split("/")
    var date1 = date[2] + "-" + date[0] + "-" + date[1]
    console.log("date1", date1)

    axios.get(
      "https://api.schiphol.nl/public-flights/flights?app_id=736271b6&app_key=92b67b61a7e5ed55211ef7584a05d618&scheduledate=" + date1 + "&flight" +this.state.flight,
      {
        headers: { Accept: 'application/json', ResourceVersion: 'v3' }
      }
    )
      .then((data) => {
        console.log(data)
        this.setState({
          data: data
        })
      })
  }


  componentWillReceiveProps(props, state) {
    console.log("state", state)
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <DayPickerInput onDayChange={(day) => { this.setState({ day: day }) }} />
        <form>
          <input onChange={(event) => { this.setState({ flight: event.target.value }) }} />
          <button onClick={() => {
            var date = this.state.day.toLocaleDateString();
            date = date.split("/")
            var date1 = date[2] + "-" + date[0] + "-" + date[1]

            axios.get(
              "https://api.schiphol.nl/public-flights/flights?app_id=736271b6&app_key=92b67b61a7e5ed55211ef7584a05d618&scheduledate=" + date1+ "&flight=" + this.state.flight,
              {
                headers: { Accept: 'application/json', ResourceVersion: 'v3' }
              }
            )
              .then((data) => {
                console.log(data)
                this.setState({
                  data: data
                })
              })

          }}>submit</button>
        </form>
        <div>

        </div>


        {this.state.data ?
          this.state.data.data.flights.map((DATA, INDEX) => {
            console.log(DATA.flightName)


            return <table key={INDEX}><tr style={{}}>

              <td style={{ borderBottom: "1px solid black", borderLeft: "1px solid black", height: 15, borderRadius: 0, width: 180, margin: 5, padding: 10 }}>{DATA.flightName}</td>
              <td style={{ borderBottom: "1px solid black", borderLeft: "1px solid black", height: 15, borderRadius: 0, width: 180, margin: 5, padding: 10 }}>Date :{DATA.scheduleDate}{"\n"}Time:{DATA.scheduleTime}</td>
              <td style={{ borderBottom: "1px solid black", borderLeft: "1px solid black", height: 15, borderRadius: 0, width: 180, margin: 5, padding: 10 }}>Date :{new Date(DATA.estimatedLandingTime).toLocaleDateString()}{"\n"}Time :{new Date(DATA.estimatedLandingTime).toLocaleTimeString()}</td>
            </tr>
            </table>
            // {DATA.flightName}

          }) : "..."}

      </div>
    )
  }
}



export default App;

