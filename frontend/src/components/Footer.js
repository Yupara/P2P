import React from "react";

const Footer = () => (
  <footer style={{ textAlign: "center", padding: "1em 0", background: "#f2f2f2", marginTop: "2em" }}>
    <p>&copy; {new Date().getFullYear()} P2P Exchange App. Все права защищены.</p>
  </footer>
);

export default Footer;
