import React from 'react';

function Footer() {
  return (

    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>VeganMarket</h3>
        <p className="footer-links" />
        <p className="footer-company-name">Vegan Market © 2022</p>
      </div>
      <div className="footer-center">
        <div>
          <p>
            <span>11 Broadway</span>
            {' '}
            New York, NY 10004
          </p>
        </div>
        <div>
          <p>555-555-5555</p>
        </div>
        <div>
          <p />
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the Company</span>
        </p>

      </div>
    </footer>

  );
}
export default Footer;
