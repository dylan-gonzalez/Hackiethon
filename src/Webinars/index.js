import React, { useState, useEffect, createRef } from 'react'
import { Global, css } from '@emotion/core'
import Navbar from './Navbar'
import Footer from './Footer'
import Jumbotron from './Jumbotron'
import ContentRow from './ContentRow'
import DetailPane from './DetailPane/DetailPane'
import moment from "moment";

import { GOOGLE_API_KEY, CALENDAR_ID } from "./config.js";

let gapi = window.gapi;

const initialRow = {
  category: '',
  pos: { top: 0, bottom: 0 }
}

const categories = [
  'TV Shows',
  'Action',
  'Drama',
  'Comedy',
  'Documentary',
  'Sci-Fi',
  'Reality'
]


export default class Webinars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      events: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true,
      activeRow: initialRow
    };
  }


  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1000);
    setInterval(() => {
      this.getEvents();
    }, 60000);
  };

  getEvents() {
    let that = this;
    function start() {
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(function () {
          console.log("moment: ", moment().toISOString());
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?supportsAttachments=true&maxResults=11&orderBy=updated&timeMin=${moment().toISOString()}&timeMax=${moment()
              .endOf("year")
              .toISOString()}`
          });
        })
        .then(
          response => {
            let events = response.result.items;
            console.log("response: ", response)
            let sortedEvents = events.sort(function (a, b) {
              return (
                moment(b.start.dateTime).format("YYYYMMDD") -
                moment(a.start.dateTime).format("YYYYMMDD")
              );
            });
            // console.log("Sorted events: ", new Object(sortedEvents[0].attachments))
            // console.log("Sorted events: ", sortedEvents)
            if (events.length > 0) {
              that.setState(
                {
                  events: sortedEvents,
                  isLoading: false,
                  isEmpty: false
                },
                () => {
                  that.setStatus();
                }
              );
            } else {
              that.setState({
                isBusy: false,
                isEmpty: true,
                isLoading: false
              });
            }
          },
          function (reason) {
            console.log(reason);
          }
        );
    }
    gapi.load("client", start);
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start.dateTime),
          moment(eventItem.end.dateTime)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };


  setActive = activeRow => {
    activeRow.category ? this.setState({ activeRow: activeRow }) : this.setState({ activeRow: initialRow })
  }

  
  render() {
    const navRef = createRef()

    const { time, events } = this.state;
    const { category, pos: { top, bottom } } = this.state.activeRow

    // useEffect(() => {
    //   if (!category) return
    //   const navHeight = navRef.current.offsetHeight
  
    //   window.scrollTo({
    //     top: top + window.scrollY - navHeight,
    //     left: 0,
    //     behavior: 'smooth'
    //   })
    // }, [category])

    
    return (
      <>
        {/* <Global styles={GlobalCSS} />
        <Navbar ref={navRef} /> */}
        {/* {console.log("events: ", this.state.events)} */}
        <Jumbotron>
          <ContentRow category={categories[0]} events={this.state.events} setActive={this.setActive} />
        </Jumbotron>

        {/* {console.log(categories)} */}
  
        {categories.slice(1).map(category => (
          <ContentRow key={category} category={category} events={this.state.events} setActive={this.setActive} />
        ))}
  
        <DetailPane
          category={category}
          top={bottom + window.scrollY}
          setActive={this.setActive }
        />
        <Footer />
      </>
    )
  }
}


  // render() {
  //   const { time, events } = this.state;

  //   console.log("events: ", events);
  //   let eventsList = events.map(function(event) {
  //     return (
  //       <a
  //         className="list-group-item"
  //         href={event.htmlLink}
  //         target="_blank"
  //         key={event.id}
  //       >
  //         {console.log(event.description)}
  //         {console.log(event)}
  //         <div>
  //           {/* {event.description}{" "} */}
  //           {/* {event.attachments !== undefined ? console.log("here: ", event.attachments[0].fileUrl.split("/")[5]) : ''} */}
  //           {event.summary}
  //           {event.attachments !== undefined ? <img src={`https://drive.google.com/thumbnail?id=${(event.attachments[0].fileUrl.split("/")[5])}`}/> : ''}

  //         </div>
  //         <span className="badge">
  //           {moment(event.start.dateTime).format("h:mm a")},{" "}
  //           {moment(event.end.dateTime).diff(
  //             moment(event.start.dateTime),
  //             "minutes"
  //           )}{" "}
  //           minutes, {moment(event.start.dateTime).format("MMMM Do")}{" "}
  //         </span>
  //       </a>
  //     );
  //   });

  //   let emptyState = (
  //     <div className="empty">
  //       <img src={welcomeImage} alt="Welcome" />
  //       <h3>
  //         No meetings are scheduled for the day. Create one by clicking the
  //         button below.
  //       </h3>
  //     </div>
  //   );

  //   let loadingState = (
  //     <div className="loading">
  //       <img src={spinner} alt="Loading..." />
  //     </div>
  //   );

  //   return (
  //     <>
  //       <Global styles={GlobalCSS} />
  //       <Navbar ref={navRef} />
  
  //       <Jumbotron>
  //         {console.log(categories)}
  //         <ContentRow category={categories[0]} setActive={setActive} />
  //       </Jumbotron>
  
  //       {categories.slice(1).map(category => (
  //         <ContentRow key={category} category={category} setActive={setActive} />
  //       ))}
  
  //       <DetailPane
  //         category={category}
  //         top={bottom + window.scrollY}
  //         setActive={setActive}
  //       />
  //       <Footer />
  //     </>
  //   )
  // }




/**@function Webinars
 */
// const Webinars = () => {
//   const [activeRow, setActiveRow] = useState(initialRow)

//   const {
//     category,
//     pos: { top, bottom }
//   } = activeRow

//   const navRef = createRef()

//   useEffect(() => {
//     if (!category) return
//     const navHeight = navRef.current.offsetHeight

//     window.scrollTo({
//       top: top + window.scrollY - navHeight,
//       left: 0,
//       behavior: 'smooth'
//     })
//   }, [category])

//   const setActive = activeRow => {
//     activeRow.category ? setActiveRow(activeRow) : setActiveRow(initialRow)
//   }

//   return (
//     <>
//       <Global styles={GlobalCSS} />
//       <Navbar ref={navRef} />

//       <Jumbotron>
//         {console.log(categories)}
//         <ContentRow category={categories[0]} setActive={setActive} />
//       </Jumbotron>

//       {categories.slice(1).map(category => (
//         <ContentRow key={category} category={category} setActive={setActive} />
//       ))}

//       <DetailPane
//         category={category}
//         top={bottom + window.scrollY}
//         setActive={setActive}
//       />
//       <Footer />
//     </>
//   )
// }

const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html,
  body,
  .app {
    margin: 0;
    min-height: 100%;
    width: 100%;
  }

  body {
    background: #151515;
  }

  a {
    text-decoration: none;
    color: white;
  }

  p {
    font-size: 20px;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }

  button {
    background-color: rgba(51, 51, 51, 0.8);
    border: 1px solid white;
    padding: 0.75em 2.3em;
    border-radius: 0.2vw;
    box-shadow: none;
    font-size: 1.1vw;
    color: white;
    margin-right: 15px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  .Icon {
    font-size: 18.5px;
    cursor: pointer;
    color: white;
  }
`
