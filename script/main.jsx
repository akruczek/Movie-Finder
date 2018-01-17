import "../style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {Navbar, NavItem} from "react-materialize";
import {SearchBar} from "./components/SearchBar.jsx";

// &api_key=73a3e42b7075df257f789c920cc37996

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    }
  }

  getMovies =()=> {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=73a3e42b7075df257f789c920cc37996&query=Jack+Reacher")
    .then(response => {
      return (response && response.ok) ? response.json() : "Błąd Połączenia";
    })
    .then(data => {
      console.log(data.results);
    })
    .catch(error => console.log(error));
  }

  searchMovies =(event)=> {
    event.preventDefault();
    this.getMovies();
  }

  render() {
    return (
      <div>
        <SearchBar />
        {/* <form onSubmit={this.searchMovies}>
          <input type="text" style={{width: "200px"}}/>
          <button type="submit">Search</button>
        </form> */}
      </div>
    );
  }
}

//-----SCRIPT-----\\
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Main />,
    document.getElementById('app')
  );
});
