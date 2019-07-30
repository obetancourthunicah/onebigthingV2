import React,  {Component} from 'react';
import {paxios, getLocalStorage, setLocalStorage} from '../../../../Utilities';
import { Link } from 'react-router-dom';

import './Dashboard.css';
import { MdAdd as Plus } from 'react-icons/md';

import ThingBox from './ThingBox';
import DatePanel from './DatePanel';

function getDDDate(ddDate){
  const year = ddDate.getFullYear(), month = ddDate.getMonth() + 1, date = ddDate.getDate();
  let dmonth = (month < 10) ? '0' + String(month) : String(month);
  let dDay = (date < 10) ? '0' + String(date) : String(date);
  return `${year}${dmonth}${dDay}`;
}

export default class Dashboard extends Component{
  constructor(){
    super();
    const CD = new Date()
    let localState = JSON.parse(getLocalStorage('dshboard')) || {
      currentDate: CD,
      dd: getDDDate(CD)
    };
    if(typeof localState.currentDate === "string"){
      localState.currentDate = new Date(localState.currentDate);
    }

    this.state = {
      things:[],
      ...localState
    };
    this.dateAfterHandler = this.dateAfterHandler.bind(this);
    this.dateBeforeHandler = this.dateBeforeHandler.bind(this);
    this.dateBeforeHandler = this.dateBeforeHandler.bind(this);
    this.resetDate = this.resetDate.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    paxios.get(`/api/things/page/1/3/${this.state.dd}`)
      .then(({ data, status }) => {
        console.log(data);
        this.setState({...data});
      })
      .catch((err) => {
        console.log(err);
      })
    ;
  }
  dateBeforeHandler(){
    let tCDate = this.state.currentDate;
    tCDate.setDate(tCDate.getDate()-1);
    let newState = { currentDate: tCDate, dd: getDDDate(tCDate) }
    setLocalStorage('dshboard',JSON.stringify(newState));
    this.setState( newState, ()=>this.loadData());
  }
  dateAfterHandler(){
    let tCDate = this.state.currentDate;
    tCDate.setDate(tCDate.getDate() + 1);
    let newState = { currentDate: tCDate, dd: getDDDate(tCDate) }
    setLocalStorage('dshboard', JSON.stringify(newState));
    this.setState(newState, () => this.loadData());
  }
  resetDate() {
    let tCDate = new Date();
    let newState = { currentDate: tCDate, dd: getDDDate(tCDate) }
    setLocalStorage('dshboard', JSON.stringify(newState));
    this.setState(newState, () => this.loadData());
  }

  render(){
    //
    let bigThing = (
      <ThingBox thingType="big">
        <Link to={`/backlogadd/big/${this.state.dd}`} >
          <span className="circle"><Plus /></span>
        </Link>
      </ThingBox>
    );
    let smallThingArr =[];
    smallThingArr.push((
      <ThingBox key={1}>
        <Link to={`/backlogadd/small/${this.state.dd}`} >
          <span className="circle"><Plus /></span>
        </Link>
      </ThingBox>
    ));
    smallThingArr.push((
      <ThingBox key={2}>
        <Link to={`/backlogadd/small/${this.state.dd}`} >
          <span className="circle"><Plus /></span>
        </Link>
      </ThingBox>
    ));
    console.log(this.state.things);
    if (this.state.things.length>0) {
      console.log("entro");
      let bigthings = this.state.things.filter(
        (e)=>{
          console.log(e);
          return e.type === "big";
        }
      );
      console.log(bigthings);
      if (bigthings.length) {
        bigThing = (<ThingBox thingType="big">
            <h2>{bigthings[0].descripcion}</h2>
        </ThingBox>
        );
      }
      let smallthings = this.state.things.filter(
        (e, i) => {
          return e.type === "small";
        }
      );
      if (smallthings.length) {
        smallThingArr = smallthings.map(
          (e, i)=>{
            return (
              <ThingBox key={i}>
                <h2>{e.descripcion}</h2>
              </ThingBox>
            );
          }
        );
        if(smallThingArr.length === 1){
          smallThingArr.push((<ThingBox key={2}>
            <Link to={`/backlogadd/small/${this.state.dd}`} >
              <span className="circle"><Plus /></span>
            </Link>
          </ThingBox>));
        }
      }
    }
    return(
      <section>
        <h1>One Big Thing Dashboard</h1>
        <section className="main cardHolder fix640">
          {bigThing}
          <DatePanel
            currentDate={this.state.currentDate}
            dateBeforeHandler={this.dateBeforeHandler}
            dateAfterHandler={this.dateAfterHandler}
            resetDate={this.resetDate}
          />
          {smallThingArr}
        </section>
      </section>
    );
  }
}
