import React from 'react';
import logo from './logo.svg';
import './App.css';
import countries from 'world-countries';

const SortedCountries = countries.sort((a,b) => b.area - a.area); //Sorterade i storleksordning av area
const FilteredCountries = SortedCountries.filter(country => country.name.common !== "Antarctica"); //Antarktis är borttaget
const FinalCountries = FilteredCountries.slice(0,15); //De 15 första
const FirstList = FilteredCountries.slice(0,5); //De 5 Första
const SecondList = FilteredCountries.slice(6,15); //De 10 Sista


console.log(FinalCountries); //Test

function App() {
  return (
    <div className="flex-container">
    <div className="LeftSide">

    {FirstList.map(country => <CountryInfo key={country.cca3} detailed={true} data={country}> </CountryInfo>)}
    
    </div>

    <div className="RightSide">

    {SecondList.map(country => <CountryInfo key={country.cca3} detailed={false} data={country}> </CountryInfo>)}
    
    </div>
      
    </div>
  );
}

const CountryInfo = props => {

    let bredd = (props.data.area/(FinalCountries[0].area) * 150 + "%"); //Storleken på barsen
    const detailed = props.detailed;

      return (

        <div className="CountryInfo">

          <p>
            <span className="Country">{props.data.name.common} {props.data.flag}</span> <span className="Area">{props.data.area}m<sup>2</sup></span>
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

        );

    };


export default App;
