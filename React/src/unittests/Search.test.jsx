import React, { useState, createContext } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Search from "../components/Search";

const testUsers = [
  {
    id: "1",
    name: "test",
    username: "test",
  },
  {
    id: "2",
    name: "test2",
    username: "test2",
  },
];

const testHashtags = ["#one", "#two", "#three"];

const mockHandleSearch = jest.fn();
const MockParent = () => {
  const [searchResult] = useState({
    tweets: [],
    users: testUsers,
    hashtags: testHashtags,
  });
  return <Search searchResult={searchResult} />;
};