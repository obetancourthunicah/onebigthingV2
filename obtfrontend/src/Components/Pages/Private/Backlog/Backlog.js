import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IoIosInformationCircleOutline, IoIosSync, IoMdAddCircle } from 'react-icons/io';
import {Link} from 'react-router-dom';


import { paxios } from '../../../../Utilities';

import "./Backlog.css";

export default class Backlog extends Component {
  constructor(){
    super();
    this.state={
      things:[],
      hasMore:true,
      page:1,
      itemsToLoad:10
    }

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/things/page/${page}/${items}`;
    paxios.get(uri)
      .then(
        ({data})=>{
          const { things, totalThings} = data;
          const loadedThings = this.state.things;
          things.map((e)=>loadedThings.push(e));
          if(totalThings){
              this.setState({
                "things": loadedThings,
                "hasMore": (page * items < totalThings)
              });
          } else {
            this.setState({
              "hasMore": false
            });
          }
        }
      )
      .catch(
        (err)=>{
          console.log(err);
        }
      );
  }
  render() {
  const items = this.state.things.map(
    (thing)=>{
      return (
        <div className="thingItem" key={thing._id}>
          <span>{thing.descripcion}</span>
          <Link to={`/detail/${thing._id}`}>
            <IoIosInformationCircleOutline size="2em"/>
          </Link>
        </div>);
    }
  );

  if(!items.length) items.push(
    <div className="thingItem" key="pbBackLogAddOne">
      <span>Nuevo Thing</span>
      <IoMdAddCircle size="2.5em" />
    </div>);

  return (
    <section>
      <h1>
        My Things Backlog
        <IoMdAddCircle size="1.5em"/>
      </h1>
      <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            useWindow={false}
            getScrollParent={()=>this.scrollParentRef}
            loader={<div key="pbBackLogLoading" className="thingItem center"><IoIosSync/></div>}
            >
              {items}
          </InfiniteScroll>
      </div>
     </section>
   );
  }
}
