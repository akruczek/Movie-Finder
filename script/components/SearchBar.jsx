import React from "react";
import {Navbar, NavItem, Input, Button, Icon} from "react-materialize";
import {languages} from "./../variables/text.jsx";

export const SearchBar =(props)=> {
  return (
    <Navbar fixed className="search-bar orange darken-2">
      <NavItem><Icon large>sort_by_alpha</Icon></NavItem>
      <input className="search-input" name="searchInput" value={props.searchInput} onChange={props.changeHandler}
        placeholder="search movies..." />
      <Button className="search-button" onClick={props.searchMovies}>{props.text.search}</Button>
      <div className="language-select">
        <Input type='select' onChange={props.changeLanguage} name="langId" value={String(props.langId)}>
          {languages.map(item => <option key={item.id} value={item.id}>{item.langName}</option>)}
        </Input>
      </div>
    </Navbar>
  );
}
