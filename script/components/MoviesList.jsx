import React from "react";
import {Collection, CollectionItem} from "react-materialize";

export const MoviesList =(props)=> {
  return (props.searchResult !== null) ? (props.searchResult.length > 0) ? (
    <div className="movies-list">
      <Collection>
        {
          props.searchResult.map((item, index) => {
            return (
              //single movie \/
              <CollectionItem key={item.id} className="collection-item">
                {item.poster_path !== null ?
                  <img src={"https://image.tmdb.org/t/p/w185/" + item.poster_path} />
                : <div className="error-poster">{props.text.Unable_to_load_poster}</div> }
                <div className="description">
                  <h4>{item.title}</h4>
                  <h5>
                    {props.text.Release_date}: {item.release_date.split("-").reverse().map(
                    (dateItem, index) => index !== 2 ? (dateItem + "-") : (dateItem + props.text.y))}
                  </h5>
                  <h5>{props.text.Popularity}: {item.popularity.toFixed(2)}</h5>
                  <h5>{props.text.Rating}: {item.vote_average}/10</h5>
                  <h6>{props.text.Based_on} <strong>{item.vote_count}</strong> {props.text.voices}</h6>
                  <span onClick={() => props.catchMovieDetails(item.id, index)}>{props.text.more_details}&#8628;</span>
                  {item.genres !== undefined && (
                    //more details section \/
                    <section className="details">

                      <p className="overview">{item.overview}</p>
                      <h6>{props.text.Category}: <ul>{item.genres.map((genre, index) =>
                        <li key={genre.id}><strong>{index===0 ? genre.name : `, ${genre.name}`}</strong></li>)}</ul>
                      </h6>

                      <h6>{props.text.Production_countries}: <ul>{item.production_countries.map((country, index) =>
                        <li key={country.iso_3166_1}><strong>{index===0 ? country.name : `, ${country.name}`}</strong></li>)}</ul>
                      </h6>

                      <h6>{props.text.Production_companies}: <ul>{item.production_companies.map((company, index) =>
                        <li key={company.id}><strong>{index===0 ? company.name : `, ${company.name}`}</strong></li>)}</ul>
                      </h6>

                      <h6>IMDB: <a href={item.imdb_link}>
                        {item.imdb_link.split("//")[1]}
                      </a></h6>

                    </section>
                  )}
                </div>
              </CollectionItem>
            );})
        }
      </Collection>
    </div>
  ) : (
    //if there is no search results
    <h1 className="empty">{props.text.No_results}</h1>
  ) : (
    //if there was no search yet
    <h1 className="empty">{props.text.search_info}</h1>
  );
}
