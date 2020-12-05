import React, { useState } from 'react';
import './App.css';
import countries from 'world-countries';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SortedCountries = countries.sort((a,b) => b.area - a.area); //Sorterade i storleksordning av area
const FilteredCountries = SortedCountries.filter(country => country.name.common !== "Antarctica"); //Antarktis är borttaget
const FinalCountries = FilteredCountries.slice(0,15); //De 15 första

//Bestämmer vilken väg som ska routas
function App() {

  return (

    <Router>
      <div>
        <Switch>
          <Route path="/country/:cca3" component={CountryDetails}/>
          <Route path="/">
          <CountryList />
          </Route>
        </Switch>
      </div>
    </Router>

    )
}

//första sidan
function CountryList() {

  const [searchString, setSearchString] = useState("");

  let TextInput = event => {
    setSearchString(event.target.value);
  }

  const matchText = props => {

    let word = props.name.common;
    const lowerCaseWord = word.toLowerCase();
    const lowerCaseSearchString = searchString.toLowerCase();

    return lowerCaseWord.indexOf(lowerCaseSearchString) === 0;
  }

  const filteredWords = FilteredCountries.filter(matchText);
  const sortedFilteredWords = filteredWords.slice(0,15); //De 15 första

  return (
    <div>
      <div className="SearchBar">
      <input type="text" placeholder="Search country..." onChange={TextInput}/>
      </div>
      <div className="flex-container">
      {sortedFilteredWords.map(country => <CountryInfo key={country.cca3} detailed={true} data={country}> </CountryInfo>)}
      </div>
    </div>
    );
}

//Child
//Funktion matchar det som skrivs in i searchbaren med dess cca3 som sedan används i getCountryByCca3-funktionen.
//Funktionen returnerar en lista där SortedBorderCountries visas till tillhörande land
function CountryDetails({match}) {
  const value = getCountryByCca3(match.params.cca3);
  const borderCountries = value.borders.map(border => getCountryByCca3(border));
  const SortedBorderCountries = borderCountries.sort((a,b) => b.area - a.area);
  return (
  <div>    
      <div className="SearchBar">
     <a className="Button" href="/country/">
       Back
       </a>
       <h1> {value.name.common} </h1>
       </div>

       <div className="flex-container">
       <h4> Border countries: </h4>
       {SortedBorderCountries.map(country => <CountryInfo key={country.cca3} detailed={true} data={country}> </CountryInfo>)}
       </div>
     </div>
     )
}

//lagt på en länkväg på varje land
const CountryInfo = props => {

    let bredd = (props.data.area/(FinalCountries[0].area) * 100 + "%"); //Storleken på barsen
    const detailed = props.detailed;
    let detailedPath = "/country/" + props.data.cca3; //sätter hela url-tillägget till en constant som sedan används i "link to"

    return (
      <Link to = {detailedPath}>
      <div className="CountryInfo">
        <p>
        <span className="Country">{props.data.name.common} {props.data.flag}</span> <span className="Area">{props.data.area}km<sup>2</sup></span>
        </p>
      <div className="Bars" style={{width: bredd}}>
      </div>

      {detailed == true && 
        <div className="CountryInfo">
          <p>
          Region: <span className = "info"> {props.data.region} </span>
          Capital: <span className = "info"> {props.data.capital} </span>
          </p>
        </div>
      }

      </div>
      </Link>

      );
  }
  //funktion för att få ut det tillhörande countryobjektet till cca3 koden, returnerar objektet.
  const getCountryByCca3 = props => { 
    let CountryByCca3 = FilteredCountries.find(found => found.cca3 === props);
console.log(CountryByCca3);
    return CountryByCca3
  }

  export default App;
