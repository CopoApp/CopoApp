import Navbar from "../components/Navbar";
import "../styles/index.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="copo-title">Welcome to Copo</h1>
      <div className="copo-sections">
        <div className="copo-section">
          <h2 className="copo-oval">Mission Statement</h2>
          <p>Our mission is to reunite lost pets with their families by providing a centralized, real-time platform that connects communities through location-based alerts, shared responsibility, and compassionate action. Because pets are not just animals—they are family.</p>
        </div>
        <div className="copo-section">
          <h2 className="copo-oval">Meet the Team</h2>
          <ul>
            <li>Azim: Project Manager, Scrum Master, and Full-Stack Developer</li>
            <li>Jordi: Database Administrator, CSS Designer, and Full-Stack Developer</li>
            <li>Mario: Designer and Full-Stack Developer</li>
          </ul>
        </div>
        <div className="copo-section">
          <h2 className="copo-oval">Technologies Used</h2>
          <ul>
            <li>Node</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>React</li>
            <li>Knex</li>
            {/* Add more technologies here as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
}
