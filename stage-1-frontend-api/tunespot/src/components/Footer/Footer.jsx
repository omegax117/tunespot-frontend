import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Developed By Alex Sturm</p>
      <a href="https://www.theaudiodb.com/" className="footer__text">
        {" "}
        API courtesy of theaudiodb.com{" "}
      </a>
      <p className="footer__text">&#169; 2024</p>
    </footer>
  );
}
