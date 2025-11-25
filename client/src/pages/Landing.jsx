import "../styles/landing.css";

function Landing() {
  return (
    <div className="landing-container">
      {/* LEFT SECTION */}
      <div className="landing-left">
        <h1 className="landing-title">Turn Your Ideas Into Reality</h1>
        <p className="landing-subtitle">Share, Learn and Build Together</p>

        <a href="/signup">
          <button className="landing-btn">Get Started</button>
        </a>
      </div>

      {/* RIGHT SECTION */}
      {/* <div className="landing-right">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/teamwork-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--people-holding-gear-graduation-cap-pack-people-illustrations-5872150.png"
          alt="Collaboration"
          className="landing-img"
        />
      </div> */}

      {/* FEATURES SECTION */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>Collaborate</h3>
            <p>Work together with like-minded individuals to bring your ideas to life.</p>
          </div>
          <div className="feature">
            <h3>Innovate</h3>
            <p>Share your creativity and inspire others with your unique ideas.</p>
          </div>
          <div className="feature">
            <h3>Grow</h3>
            <p>Learn from others and improve your skills through collaboration.</p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"This platform helped me connect with amazing people and turn my ideas into reality!"</p>
            <span>- Alex</span>
          </div>
          <div className="testimonial">
            <p>"A great place to share and grow together. Highly recommend it!"</p>
            <span>- Priya</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
