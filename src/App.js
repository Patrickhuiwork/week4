import "./styles.css";
import data from "./data/countries.json";
import Country from "./components/Country";
import { useState } from "react";

export default function App() {
  const [sortOption, setSortOption] = useState("alpha");
  const [filterContinent, setFilterContinent] = useState("all");
  const [filterPopulation, setFilterPopulation] = useState("all");

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  function handleFilterContinent(e) {
    setFilterContinent(e.target.value);
  }

  function handleFilterPopulation(e) {
    setFilterPopulation(e.target.value);
  }

  function sortAlpha() {
    return data.countries.slice().sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  function sortASc() {
    return data.countries.slice().sort(function (a, b) {
      return a.population - b.population;
    });
  }

  function sortDesc() {
    return data.countries.slice().sort(function (a, b) {
      return b.population - a.population;
    });
  }

  function sort(option) {
    if (option === "alpha") {
      return sortAlpha();
    } else if (option === ">") {
      return sortDesc();
    } else if (option === "<") {
      return sortASc();
    } else if (option === "shuffle") {
      return shuffleArray([...data.countries]);
    } else {
      return data.countries;
    }
  }

  function filterByContinent(continent) {
    if (continent === "all") {
      return data.countries;
    } else {
      return data.countries.filter(function (country) {
        return country.continent === continent;
      });
    }
  }

  function filterByPopulation(populationThreshold) {
    if (populationThreshold === "all") {
      return data.countries;
    } else if (populationThreshold === "<100M") {
      return data.countries.filter((country) => country.population < 100000000);
    } else if (populationThreshold === ">100M") {
      return data.countries.filter((country) => country.population > 100000000);
    } else if (populationThreshold === ">200M") {
      return data.countries.filter((country) => country.population > 200000000);
    } else if (populationThreshold === ">500M") {
      return data.countries.filter((country) => country.population > 500000000);
    } else if (populationThreshold === ">1B") {
      return data.countries.filter(
        (country) => country.population > 1000000000
      );
    } else {
      return data.countries;
    }
  }

  const filteredByContinent = filterByContinent(filterContinent);
  const filteredCountries = filterByPopulation(filterPopulation);

  const combinedResult = sort(sortOption).filter(
    (country) =>
      filteredByContinent.includes(country) &&
      filteredCountries.includes(country)
  );

  return (
    <div className="App">
      <h1>World's Largest Countries by Population</h1>
      <div className="filters">
        <label>
          Filter by Continent:
          <select value={filterContinent} onChange={handleFilterContinent}>
            <option value="all">All</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
          </select>
        </label>
        <label>
          Filter by Population:
          <select value={filterPopulation} onChange={handleFilterPopulation}>
            <option value="all">All</option>
            <option value="<100M">Less than 100M</option>
            <option value=">100M">100M or more</option>
            <option value=">200M">200M or more</option>
            <option value=">500M">500M or more</option>
            <option value=">1B">1B or more</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortOption} onChange={handleSort}>
            <option value="alpha">Alphabetical</option>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
      </div>
      <div className="countries">
        {combinedResult.map(function (country) {
          return <Country key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
