import React from "react";
import { Link } from "react-router-dom";
import "../styles/story.css";
//story page
//It diplays the history history of r restaurant, timeline,values team members and closing message

export default function Story() {
  return (
    <div>
      {/* Header */}
      <header>
        <Link to="/" className="logo">Stories</Link>

        <nav className="nav-bar">
          <Link to="/" className="home">Home</Link>
          <Link to="/story" className="our-story">Our Story</Link>
          <Link to="/menu" className="menu">Menu</Link>
          <Link to="/cart" className="cart">Cart</Link>
          <Link to="#" className="order">Order</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>A Journey Brewed with Passion</p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <h2 className="section-title">The Journey of Stories Cafe</h2>

        <div className="timeline">

          {/* 2018 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">2018</div>
              <h3>The Dream Begins</h3>
              <p>
                It all started with a simple dream shared between two coffee enthusiasts who believed
                that every cup of coffee tells a story. We envisioned a place where people could gather,
                connect, and create memories over exceptional coffee. After countless hours of planning
                and testing recipes in a tiny kitchen, Stories Cafe was born.
              </p>
            </div>

            <div className="timeline-image">
              <img
                src="https://byramudicoffee.com/cdn/shop/articles/Blog_Banner_for_Website_Content_3_1024x1024.png?v=1716901341"
                alt="Coffee beans"
              />
            </div>
          </div>

          {/* 2019 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">2019</div>
              <h3>Finding Our Beans</h3>
              <p>
                We embarked on a journey to coffee farms across the world, from the highlands of Ethiopia
                to the mountains of Colombia. We met passionate farmers who poured their hearts into cultivating
                the perfect beans. These connections became the foundation of our commitment to ethical sourcing
                and supporting local communities.
              </p>
            </div>

            <div className="timeline-image">
              <img
                src="https://thumbs.dreamstime.com/b/coffee-beans-developing-tree-vibrant-coffee-plantation-coffee-beans-developing-tree-vibrant-coffee-plantation-319833002.jpg"
                alt="Coffee farm"
              />
            </div>
          </div>

          {/* 2020 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">2020</div>
              <h3>Opening Our Doors</h3>
              <p>
                Despite the challenges of opening during uncertain times, we welcomed our first customers
                with warmth and the rich aroma of freshly brewed coffee. Our cozy space quickly became a sanctuary
                for students, artists, professionals, and dreamers. Every smile and conversation reminded us why
                we started this journey.
              </p>
            </div>

            <div className="timeline-image">
              <img
                src="https://png.pngtree.com/thumb_back/fh260/background/20250914/pngtree-freshly-brewed-coffee-poured-from-french-press-into-mug-surrounded-by-image_19358720.webp"
                alt="Cafe interior"
              />
            </div>
          </div>

          {/* 2022 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">2022</div>
              <h3>Expanding Our Flavors</h3>
              <p>
                We introduced innovative brewing methods and expanded our menu to include iced coffees,
                cold brews, and seasonal specialties. Our baristas became artists, crafting each drink with
                precision and creativity. We also launched our signature blend, a harmonious mix of nutty,
                chocolaty, and fruity notes that became an instant favorite.
              </p>
            </div>

            <div className="timeline-image">
              <img
                src="https://img.freepik.com/premium-photo/glass-cold-brew-coffee-served-ice-with-splash-milk-swirling-through-dark-brew_1271419-17704.jpg"
                alt="Coffee art"
              />
            </div>
          </div>

          {/* 2024 */}
          <div className="timeline-item">
            <div className="timeline-content">
              <div className="timeline-year">2024</div>
              <h3>A Community Hub</h3>
              <p>
                Today, Stories Cafe is more than just a coffee shop. We host art exhibitions, live music nights,
                and community events. We've become a place where stories are shared, friendships are formed, and
                dreams are nurtured.
              </p>
            </div>

            <div className="timeline-image">
              <img
                src="https://i.pinimg.com/736x/d5/7c/1e/d57c1e61e3d9c4519c271f9a0629e37a.jpg"
                alt="Community gathering"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2 className="section-title">Our Values</h2>

        <div className="values-container">
          <div className="value-card">
            <div className="value-icon">☕</div>
            <h3>Quality First</h3>
            <p>
              We source only the finest beans and brew each cup with meticulous care to ensure every sip is perfect.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>
              We're committed to ethical sourcing and supporting farmers who practice sustainable agriculture.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">❤</div>
            <h3>Community</h3>
            <p>
              We believe in creating a welcoming space where everyone feels at home and connections flourish.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">✨</div>
            <h3>Innovation</h3>
            <p>We constantly explore new flavors and brewing techniques.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="section-title">Our Passion in Every Cup</h2>
        <p className="team-intro">
          Behind every cup at Stories Cafe is a team of dedicated baristas and coffee lovers who treat
          each order as a work of art.
        </p>

        <div className="coffee-gallery">

          <div className="gallery-item">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrPSRhRVTDIFtlKaoHkiTk-Apq1bU1Ihyww&s"
              alt="Latte art"
            />
            <div className="gallery-overlay">
              <h4>Handcrafted Artistry</h4>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://media.istockphoto.com/id/1638135515/photo/roasted-coffee-beans-ground-coffee-and-instant-coffee-in-bowls-at-dark-background.jpg?s=612x612&w=0&k=20&c=WsRF8uCR_ZMnjD6klodPnVrLxrkR-GkFAq3bv2kOYGM="
              alt="Coffee beans"
            />
            <div className="gallery-overlay">
              <h4>Premium Selection</h4>
            </div>
          </div>

          <div className="gallery-item">
            <img
              src="https://assets.bonappetit.com/photos/5c5b006e6c0b212cac365206/16:9/w_2560%2Cc_limit/coffee-group.jpg"
              alt="Brewing coffee"
            />
            <div className="gallery-overlay">
              <h4>Perfect Brewing</h4>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
