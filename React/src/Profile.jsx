import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "./Provider";
import Footer from "./Footer";
import Hashtags from "./components/Hashtags";
import Search from "./components/Search";

export default function Profile() {
  const { getUserProfile, getUserTweets, followUser,
          unfollowUser, getTrendingHashtags, search, logout } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hashtags, setHashtags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState({ tweets: [], users: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const trendingHashtags = await getTrendingHashtags();
        setHashtags(trendingHashtags.data);

        const profileResponse = await getUserProfile(id);
        const profileData = profileResponse.data;
        if (profileData) {
          setUser({
            ...profileData,
            coverPhotoUrl: `https://picsum.photos/seed/${profileData.username}/1920/1080`,
            avatarUrl: `https://picsum.photos/seed/${profileData.username}/200`,
          });
        } else {
          console.error("User or follower data not found");
        }

        const tweetsResponse = await getUserTweets(id);
        setTweets(tweetsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, tweets, getUserProfile, getUserTweets]);
