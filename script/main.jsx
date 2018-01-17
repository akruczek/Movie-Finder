import "../style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {Navbar, NavItem} from "react-materialize";
import {SearchBar} from "./components/SearchBar.jsx";
import {MoviesList} from "./components/MoviesList.jsx";
import {languages} from "./variables/text.jsx";

// &api_key=73a3e42b7075df257f789c920cc37996

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langId: 0,
      text: languages[0],
      searchInput: "",
      searchResult: null
    }
  }

  getMovies =()=> {
    let searchWords = [];
    let searchString = "";
    this.state.searchInput.split(" ").map(item => searchWords.push(item));
    for (let i=0; i<searchWords.length; i++) {
      searchString += searchWords[i];
      if (i !== searchWords.length - 1) searchString += "+";
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=73a3e42b7075df257f789c920cc37996&query=${searchString}&language=${this.state.text.langCode}`)
    .then(response => {
      return (response && response.ok) ? response.json() : "Błąd Połączenia";
    })
    .then(data => this.setState({ searchResult: data.results }, console.log(data.results)))
    .catch(error => console.log(error));
  }

  searchMovies =(event)=> {
    event.preventDefault();
    this.getMovies();
  }

  changeLanguage =(event)=> {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      text: languages[event.target.value]
    });
    this.state.searchResult !== null && this.getMovies()
  }

  changeHandler =(event)=> this.setState({ [event.target.name]: event.target.value })

  render() {
    return (
      <div>
        <SearchBar text={this.state.text} changeLanguage={this.changeLanguage} langId={this.state.langId}
          searchMovies={this.searchMovies} searchInput={this.state.searchInput} changeHandler={this.changeHandler} />

        <MoviesList searchResult={this.state.searchResult} text={this.state.text} />
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
