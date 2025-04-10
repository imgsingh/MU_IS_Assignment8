import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Game from './Game';
import Contact from './component/Contact';
import './App.css';
import CreateBook from './component/CreateBook';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#" className="navbar-title">Gursimran Singh Basra (Student Id-23251097)</a>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/create-book">Create Book</Link></li>
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <header class="page-header header container-fluid">
      <div class="overlay">
        <div class="description">
          <h1>Welcome to My Page</h1>
          <p>A highly motivated Java Full Stack Developer with experience spanning backend and frontend development. Expertise includes Spring Boot, React, Node.js, and relational databases. Successfully delivered complex projects such as PublishStory, a digital publishing platform, and contributed to the M360 SaaS platform. Adept at problem-solving, API development, and optimizing application performance. Eager to leverage my skills to create impactful solutions in a dynamic environment.</p>
          <button class="btn btn-outline-secondary btn-lg">Tell Me More!</button>
        </div>
      </div>
    </header>
  )
}

function About() {
  return <h2>About Us</h2>;
}

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/game" element={<Game />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Routes>
      </div>
    </Router>
  );
}
