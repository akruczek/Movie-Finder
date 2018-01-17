import React from "react";
import {Navbar, NavItem, Input, Icon} from "react-materialize";

export const SearchBar =(props)=> {
  return (
    <Navbar className="search-bar orange darken-2">
      <NavItem><Icon large>sort_by_alpha</Icon></NavItem>
      <input placeholder="search movies..." />
    </Navbar>
  );
}
