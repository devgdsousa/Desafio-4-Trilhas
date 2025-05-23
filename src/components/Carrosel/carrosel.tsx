import React, { useEffect, useState } from 'react';
import './carrosel.css';
import Button from '../Button/button';
import { useNavigate } from 'react-router-dom';


const phrases: string[] = [
  'O SUS atende mais de 190 milhões de brasileiros todos os dias.',
  'Um panorama interativo sobre os atendimentos de saúde pública, acesso a serviços e dados regionais em todo o país.',
  'A vacinação gratuita é um dos pilares do sistema público de saúde.',
  'Faltam investimentos em infraestrutura hospitalar em áreas rurais.',
  'Profissionais da saúde são essenciais para o bem-estar coletivo.',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? phrases.length - 1 : prev - 1
    );
  };

  const handleNavigate = ()=>{
    navigate(`/dashboard`)
  }

  return (
  <div className="carousel">
    
    <button className="carousel__arrow left" onClick={handlePrev}>
        &lt;
    </button>
      
        <div className="carousel__content">
          <p>{phrases[currentIndex]}</p>
        </div>
   
     <button className="carousel__arrow right" onClick={handleNext}>
        &gt;
     </button>

    
    
    <div className="carousel__button-wrapper">
      <Button onClick={handleNavigate}>Explorar os Dados</Button>
    </div>

    <div className="carousel__indicators">
      {phrases.map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentIndex ? 'active' : ''}`}
        ></span>
      ))}
    </div>
  </div>
);

};

export default Carousel;
