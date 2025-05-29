import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "./Provider";
import Footer from "./Footer";
import Hashtags from "./components/Hashtags";
import Search from "./components/Search";

export default function Home() {
  const {
    getUserProfile,
    getTweets,
    postTweet,
    getTrendingHashtags,
    search,
    logout,
  } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState({ tweets: [], users: [] });
  const [newTweet, setNewTweet] = useState("");
