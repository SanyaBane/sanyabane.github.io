import { Link } from "react-router-dom";
import DiscordLogo from "../assets/discord-icon.svg?react";
import "./Header.css";

// Global site header shown above every route. The wordmark links home (also the
// primary navigation), and the Discord link mirrors the footer's community CTA.
const Header = () => {
  return (
    <header className="site-header">
      <Link className="site-brand" to="/">
        <span className="site-brand-mark">S</span>
        <span className="site-brand-name">SanyaBane Mods</span>
      </Link>
      <a
        className="site-header-discord"
        href="https://discord.gg/Wdb4fJTgqA"
        target="_blank"
        rel="noreferrer"
        aria-label="Discord"
      >
        <DiscordLogo className="site-header-discord-icon" />
        <span className="site-header-discord-label">Discord</span>
      </a>
    </header>
  );
};

export default Header;
