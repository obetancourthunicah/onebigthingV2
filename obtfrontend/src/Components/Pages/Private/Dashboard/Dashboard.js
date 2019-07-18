import React,  {Component} from 'react';
import './Dashboard.css';
import { MdAdd as Plus } from 'react-icons/md';

import ThingBox from './ThingBox';
import DatePanel from './DatePanel';

export default class Dashboard extends Component{

  render(){
    return(
      <section>
        <h1>One Big Thing Dashboard</h1>
        <section className="main cardHolder fix640">
          <ThingBox thingType="big"><span className="circle"><Plus/></span></ThingBox>
          <DatePanel />
          <ThingBox><span className="circle"><Plus/></span></ThingBox>
          <ThingBox><span className="circle"><Plus/></span></ThingBox>
        </section>
      </section>
    );
  }
}
