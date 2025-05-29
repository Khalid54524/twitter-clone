import React from "react";
import { render, screen } from "@testing-library/react";
import Hashtags from "../components/Hashtags";

describe("<Hashtags />", () => {
  test("It renders hashtags", () => {
    const hashtags = ["#one", "#two", "#three"];
    render(<Hashtags hashtags={hashtags} />);

    // Check that the UL is rendered
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    // Check that each hashtag is rendered
    hashtags.forEach((hashtag) => {
      const item = screen.getByText(hashtag);
      expect(item).toBeInTheDocument();
    });
  });