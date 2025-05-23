import './footer.css';

const Footer = () => {
    return ( 
      <div className="footer-custom">
          <div className="footer__content">
            {/* Bloco 1: Governo do MA */}
            <div className="footer__block footer__block--logo">
              <img src="assets\secti.svg" alt="Governo do Maranhão" />
            </div>

            {/* Separador */}
            <div className="footer__divider" />

            {/* Bloco 2: Trilhas | Inova */}
            <div className="footer__block footer__block--mid">
              <img src="assets\trilhasInova.svg" alt="Trilhas" />
            </div>

            {/* Separador */}
            <div className="footer__divider" />

            {/* Bloco 3: Texto final */}
            <div className="footer__block footer__block--text">
              <p>Este projeto foi desenvolvido como parte do Programa Trilhas Inova.</p>
            </div>
          </div>

          <div className="footer__credit">
            <h3>
              &copy; 2025 page made by{" "}
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://www.linkedin.com/in/gednilson-silva-831788298/"
                className="footer__link"
              >
                dev.gdsousa /
              </a>
              <a
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/Cassia-Irene"
                className="footer__link"
              >
                 Cássia Irene
              </a>
            </h3>
         </div>
      </div>

     );
}
 
export default Footer;