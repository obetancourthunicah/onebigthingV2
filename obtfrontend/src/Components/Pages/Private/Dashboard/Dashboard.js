import React, {Component} from 'react';
import './Dashboard.css';


const BigCard = ({...props})=>(<div className="card big">{props.children}</div>);
const SmallCard = ({ ...props }) => (<div className="card">{props.children}</div>);
const CircleNumber = ({ ...props }) => (<div className="circle">{props.children}</div>);
export default class Dashboard extends Component {

  render(){
    return (
      <section>
        <h1>One Big Thing DashBoard</h1>
        <section className="main cardHolder fix640" >
          <BigCard><CircleNumber>1</CircleNumber></BigCard>
          <SmallCard><CircleNumber>2</CircleNumber></SmallCard>
          <SmallCard><CircleNumber>3</CircleNumber></SmallCard>
        </section>
      </section>
    );
  }
}
