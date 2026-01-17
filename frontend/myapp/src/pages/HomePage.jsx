import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.css";
//Its a simple landing page, there is no api calls no authentication just Ui
//Order now button takes to /menu

export default function HomePage() {
  return (
    <div className="home">
      <section className="home-pg">
        <div className="home-text">
          <h2>All we need is Coffee</h2>
          <p>Explore our Nutty, Fruity, Floral, Chocolaty, Balanced, Bold and Bitter Coffee.</p>
          <Link to="/menu" className="button">Order Now</Link>
        </div>
      </section>

      <section className="pg2">
        <div className="pg2-content">
          <div className="pg2-text">
            <h2>Why Choose Us?</h2>
            <p>We serve coffee from the finest beans, freshly brewed to perfection for a rich and delightful taste. Our commitment to ethical sourcing supports local farmers and ensures high quality beans in every cup. Each sip offers a unique and unforgettable experience, carefully crafted to brighten your day. In our cozy and welcoming space, you can relax and enjoy the perfect atmosphere for work or leisure.

              With a wide variety of flavours and options, we cater to every coffee lover's prefernce. Your satisfaction is our priority, and we strive to deliver excellence with every visit. </p>
            <Link to="/story" className="button">More About Us &gt;</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
