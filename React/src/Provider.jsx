import { createContext } from "react";
import {
  signup,
  login,
  logout,
  getSessionUserProfile,
  getUserProfile,
  postTweet,
  getTweets,
  getUserTweets,
  getTrendingHashtags,
  followUser,
  unfollowUser,
  search,
} from "./Service";

const Context = createContext();
