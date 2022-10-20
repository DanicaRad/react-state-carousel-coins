import React from "react";
import { render, fireEvent, queryAllByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel/>);
});

it('matches snapshot', function() {
  const {asFragment} = render(<Carousel/>);
  expect(asFragment).toMatchSnapshot();
});

it("hides the left arrow on first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // expect right arrow, but not left to show on first image
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it("hides the right arrow on last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);
  const rightArrow = queryByTestId("right-arrow");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect left arrow but not right arrow to show on last image
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel/>);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});


