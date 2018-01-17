import React from "react";
import {Collection, CollectionItem} from "react-materialize";

export const MoviesList =(props)=> {
  return props.searchResult !== null && (
    <div className="movies-list">
      <Collection>
        {
          props.searchResult.map(item => {
            return (
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
                </div>
              </CollectionItem>
            );})
        }
      </Collection>
    </div>
  );
}
