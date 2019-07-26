import React,  {Component} from 'react';
import {paxios} from '../../../../Utilities';

import './Dashboard.css';
import { MdAdd as Plus } from 'react-icons/md';

import ThingBox from './ThingBox';
import DatePanel from './DatePanel';

export default class Dashboard extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    // paxios.get('/api/things/')
    //   .then( ({data, status})=>{
    //     console.log(data);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // ;
  }
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
