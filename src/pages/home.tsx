import React from 'react';
import './home.css';
import Navbar from '../components/NavBar/NavBar';
import Carrocel from '../components/Carrosel/carrosel';
import { FaCalendarAlt, FaUserAlt, FaChartPie, FaSyringe } from 'react-icons/fa';
import Footer from '../components/Footer/footer';

const Home: React.FC = () => {
  return (
    <div className="home">
      <Navbar /> 
      <header className="hero">
        <div className="hero__content">
          <h1>Como está a saúde pública no Brasil?</h1>
          <Carrocel/>

        </div>
      </header>

          <div className="over-info">
                <h2 className="over-info__title">Panorama Atual dos Atendimentos Públicos</h2>
                <div className="over-info__content">
                      <div className="info-card">
                        <FaCalendarAlt className="info-icon" />
                        <span>Atendimentos realizados em 2024</span>
                      </div>
                      <div className="info-card">
                        <FaUserAlt className="info-icon" />
                        <span>População com acesso a UBS (%)</span>
                      </div>
                      <div className="info-card">
                        <FaChartPie className="info-icon" />
                        <span>Leitos Hospitalares por Região</span>
                      </div>
                      <div className="info-card">
                        <FaSyringe className="info-icon" />
                        <span>Cobertura de Vacinação Infantil</span>
                      </div>
                </div>
          </div>
    
          
          <section className="about">
              <h2 className="about__title">SOBRE NÓS</h2>
              <h3 className="about__subtitle">Visualize, compreenda, acompanhe.</h3>
              <p>
                A saúde pública brasileira impacta milhões de vidas todos os dias. Pensando nisso, o Painel SUS Transparente foi criado para tornar visíveis e acessíveis os dados sobre os atendimentos realizados pelo Sistema Único de Saúde (SUS).
              </p>
              <p>
                Nosso objetivo é promover a transparência, facilitar a análise de dados regionais e permitir que cidadãos, profissionais e gestores possam compreender, comparar e agir a partir de informações reais e atualizadas.
              </p>

                <div className="about__card">
                    <div className="about__card-text">
                      <h3>Saúde pública que conecta e transforma</h3>
                      <p>
                        De norte a sul, milhões de brasileiros contam diariamente com a força de um sistema que acolhe, integra e transforma realidades. Cada atendimento é mais do que um número — é parte de uma rede viva de cuidado, equidade e compromisso com todos.
                      </p>
                    </div>
                    <div className="about__card-image">
                      <img src="public\assets\Group 28.svg" alt="Ilustração saúde pública" />
                    </div>
                 </div>
                
                 <div className="about__ouvidoria">
                      <div className="ouvidoria__block ouvidoria__block--icon">
                        <img src="assets\ouvidoria.svg" alt="Ouvidoria SUS 136" />
                      </div>

                      <div className="ouvidoria__divider" />

                      <div className="ouvidoria__block">
                        <p>
                          <strong>Ouvidoria Geral do <span className="text-highlight">SUS</span></strong><br />
                          Teleatendente: de segunda-feira à sexta-feira, das 8h às 20h, e aos sábados, das 8h às 18h.
                        </p>
                      </div>

                      <div className="ouvidoria__divider" />

                      <div className="ouvidoria__block ouvidoria__block--link">
                        <p>
                          A Ouvidoria do SUS é o canal direto com o cidadão. <a href="#">Ligue 136</a> para tirar dúvidas, registrar reclamações ou sugestões.
                        </p>
                      </div>
                  </div>
              
           </section>

        <Footer />
      


    </div>
  );
};

export default Home;
