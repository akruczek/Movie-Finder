import "../style/main.scss";
import React from "react";
import ReactDOM from "react-dom";
import {SearchBar} from "./components/SearchBar.jsx";
import {MoviesList} from "./components/MoviesList.jsx";
import {languages} from "./variables/text.jsx";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langId: 0,
      text: languages[0],
      searchInput: "",
      searchResult: null,
      sortedAlpha: false
    }
  }

  //GET suitable movies from API
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
      return (response && response.ok) ? response.json() : "connection error";
    })
    .then(data => this.setState({
      searchResult: data.results,
      sortedAlpha: false
    }))
    .catch(error => console.log(error));
  }

  //onClick for SEARCH button
  searchMovies =(event)=> {
    event.preventDefault();
    this.getMovies();
  }

  //onChange for change language select
  changeLanguage =(event)=> {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      text: languages[event.target.value]
    });
    this.state.searchResult !== null && this.getMovies()
  }

  //GET movie details ONLY AFTER clicking 'more details' span
  catchMovieDetails =(id, index)=> {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=73a3e42b7075df257f789c920cc37996`)
    .then(response => {
      return (response && response.ok) ? response.json() : "connection error";
    })
    .then(data => {
      let searchResult = this.state.searchResult;
      searchResult[index].genres = data.genres;
      searchResult[index].imdb_link = `http://www.imdb.com/title/${data.imdb_id}/mediaviewer/rm1804016896`;
      searchResult[index].production_countries = data.production_countries;
      searchResult[index].production_companies = data.production_companies;
      this.setState({ searchResult });
    })
    .catch(error => console.log(error));
  }

  //onClick for sort movies button
  sortMovies =(event)=> {
    event.preventDefault();
    if (this.state.searchResult) {
      let searchResult = this.state.searchResult.sort((a, b) => {
        if (this.state.sortedAlpha) b = [a, a = b][0];
        if (a.title < b.title) return -1;
        if (b.title < a.title) return 1;
        return 0;
      });
      this.setState({
        searchResult,
        sortedAlpha: !this.state.sortedAlpha
      });
    }
  }

  //changeHandler for input
  changeHandler =(event)=> this.setState({ [event.target.name]: event.target.value })

  render() {
    return (
      <div>
        <SearchBar text={this.state.text} changeLanguage={this.changeLanguage} langId={this.state.langId}
          searchMovies={this.searchMovies} searchInput={this.state.searchInput} changeHandler={this.changeHandler}
          sortMovies={this.sortMovies} />
        <MoviesList searchResult={this.state.searchResult} text={this.state.text} catchMovieDetails={this.catchMovieDetails} />
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
