import React from "react";
import ImageSlider from "../home/home";
import Categories from "../category/categoryitem";
import Offer from "../offer/offer";
import GifExample from "../page/page";
import About from "../About/about";
import "./homePage.css";

function HomePage() {
  return (
    <main className="home-page">
      {/* Hero / slider */}
      <ImageSlider />

      {/* Categories */}
      <Categories />

      {/* Small offer strip */}
      <Offer />

      {/* Banner GIF */}
      <GifExample />

      {/* About section */}
      <About />
    </main>
  );
}

export default HomePage;
