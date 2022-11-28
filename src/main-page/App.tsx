import React, { useState } from 'react';

import '../assets/main.scss';

const items = [
  {
    label: "Snowmass, CO",
    value: "39.2130%2C-106.9378"
  },
  {
    label: "Malibu, CA",
    value: "34.0259%2C-118.7798",
  },
  {
    label: "Catskill, NY",
    value: "42.2146%2C-73.9595",
  },
  {
    label: "Grand Teton National Park, WY",
    value: "43.7904%2C-110.6818",
  },
  {
    label: "Columbia River Gorge, OR",
    value: "45.7253%2C-121.7300"
  }
];

function App() {

  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");
  const [response, setResponse] = useState<any>();

  const submitForm = async (e: any) => {
    e.preventDefault();

    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&keyword=${keyword}&key=AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k`)
    .then(res => res.json())
    .then(
      (result) => {
        setResponse(result.results);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  const displayRadioButtons = items.map((item) =>
    <div>
      <input type="radio" checked={item.value === location} value={item.value} onChange={(e) => setLocation(e.target.value)}/>
      <label>{item.label}</label>
    </div>
  )

  const DisplayResults = () => {
    const mapResults = response?.map((x: any) => 
    <div className="locations" key={x.place_id}>
      <div className="name">
        Name: 
        {x.name}
        <div className="address">Address: {x.vicinity}</div>
        <div className="rating">Rating: {x.rating}</div>
      </div>
    </div>
  )
   return mapResults;
  }

  const handleEvent = (e: any) => {
    if (
      e instanceof KeyboardEvent &&
      e.key !== "Enter" &&
      e.key !== " "
    ) {
      return;
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <header>Nearby Places Search</header>
        <div>
          <form aria-label="Search Nearby Places" className="search-form">
            <label aria-label="Select a location">Selection a location:</label>
            <div className="radio-buttons">
              {displayRadioButtons}
            </div>
            <div className="search-box">
              <input aria-placeholder='Enter Activity' aria-label="Enter Activity" value={keyword} placeholder='Enter Activity' onChange={(e) => setKeyword(e.target.value)} />
              <button onKeyDown={() => handleEvent} className="search" onClick={submitForm} type="submit">Search</button>
            </div>
          </form>
          <DisplayResults />
        </div>
      </div>

    </React.Fragment>
  );
}

export default App;
