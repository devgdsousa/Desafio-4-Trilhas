import { useState, useEffect } from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/footer";
import { FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dadosPorEstado, setDadosPorEstado] = useState([]);
  const [dadosPorPaises, setDadosPorPaises] = useState([]);
  const navigate = useNavigate();
  // Filtros
  const [uf, setUf] = useState('');
  const [dataEspecifica, setDataEspecifica] = useState('');
  const [pais, setPais] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  // Dados filtrados
  const [dadosEstadoFiltrado, setDadosEstadoFiltrado] = useState(null);
  const [dadosBrasilPorData, setDadosBrasilPorData] = useState(null);
  const [dadosPaisFiltrado, setDadosPaisFiltrado] = useState(null);
  const [dadosIntervaloBrasil, setDadosIntervaloBrasil] = useState([]);

  //função de máscara para data
  const aplicarMascaraData = (valor) => {
  let v = valor.replace(/\D/g, ''); // Remove tudo que não é número
  if (v.length > 8) v = v.slice(0, 8);
  if (v.length > 4) return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  if (v.length > 2) return `${v.slice(0, 2)}/${v.slice(2)}`;
  return v;
   };


  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const resEstado = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1");
        setDadosPorEstado(resEstado.data.data);

        const resPaises = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1/countries");
        setDadosPorPaises(resPaises.data.data);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      }
    };

    fetchCovidData();
  }, []);

  const formatDateToAPI = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}${month}${day}`;
  };

  const getDateRange = (start, end) => {
    const dates = [];
    const startDate = new Date(start.split('/').reverse().join('-'));
    const endDate = new Date(end.split('/').reverse().join('-'));

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      dates.push(`${dd}/${mm}/${yyyy}`);
    }

    return dates;
  };

  const buscarDadosFiltrados = async () => {
    try {
      if (uf) {
        const resUf = await axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf.toLowerCase()}`);
        setDadosEstadoFiltrado(resUf.data);
      } else {
        setDadosEstadoFiltrado(null);
      }

      if (dataEspecifica) {
        const resData = await axios.get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${dataEspecifica}`);
        setDadosBrasilPorData(resData.data.data);
      } else {
        setDadosBrasilPorData(null);
      }

      if (pais) {
        const resPaises = await axios.get("https://covid19-brazil-api.now.sh/api/report/v1/countries");
        const encontrado = resPaises.data.data.find(p => p.country.toLowerCase() === pais.toLowerCase());
        setDadosPaisFiltrado(encontrado || null);
      } else {
        setDadosPaisFiltrado(null);
      }

      if (dataInicio && dataFim) {
        const datas = getDateRange(dataInicio, dataFim);

        const requisicoes = datas.map(data =>
          axios
            .get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${formatDateToAPI(data)}`)
            .then(res => {
              const estados = res.data.data;
              if (!Array.isArray(estados)) return null;

              const totalConfirmed = estados.reduce((acc, estado) => acc + (estado.cases || 0), 0);
              const totalDeaths = estados.reduce((acc, estado) => acc + (estado.deaths || 0), 0);

              return {
                data,
                confirmed: totalConfirmed,
                deaths: totalDeaths,
              };
            })
            .catch(() => null)
        );

        const resultados = await Promise.all(requisicoes);
        const filtrados = resultados.filter(item => item !== null);
        setDadosIntervaloBrasil(filtrados);
      } else {
        setDadosIntervaloBrasil([]);
      }

    } catch (error) {
      console.error("Erro ao buscar dados filtrados:", error);
    }
  };

  const chartEstados = {
    labels: dadosPorEstado.map(e => e.uf),
    datasets: [
      {
        label: 'Casos Confirmados',
        data: dadosPorEstado.map(e => e.cases),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Mortes',
        data: dadosPorEstado.map(e => e.deaths),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const chartDataBrasil = dadosBrasilPorData
    ? {
        labels: ['Confirmados', 'Mortes', 'Recuperados'],
        datasets: [
          {
            label: `Brasil em ${dataEspecifica}`,
            data: [
              dadosBrasilPorData.confirmed,
              dadosBrasilPorData.deaths,
              dadosBrasilPorData.recovered,
            ],
            backgroundColor: ['#FFCE56', '#FF6384', '#4BC0C0'],
          },
        ],
      }
    : null;

  const chartIntervaloBrasil = dadosIntervaloBrasil.length > 0 ? {
    labels: dadosIntervaloBrasil.map(item => item.data),
    datasets: [
      {
        label: 'Confirmados',
        data: dadosIntervaloBrasil.map(item => item.confirmed),
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Mortes',
        data: dadosIntervaloBrasil.map(item => item.deaths),
        backgroundColor: '#FF6384',
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  const paisesOrdenados = dadosPorPaises.length > 0
    ? [...dadosPorPaises].sort((a, b) => b.confirmed - a.confirmed).slice(0, 10)
    : [];

  const chartPaises = {
    labels: paisesOrdenados.map(p => p.country),
    datasets: [
      {
        label: 'Casos Confirmados',
        data: paisesOrdenados.map(p => p.confirmed),
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="painel__voltar">
        <button className="voltar-botao" onClick={() => navigate('/')}>
          <FaArrowLeft />
          <span>Voltar ao Inicio</span>
        </button>
      </div>

      <section className="painel">
        <h2 className="painel__titulo">Painel Nacional COVID-19</h2>
        <p className="painel__atualizado">
          Atualizado em: <span>18/05/2025 16:30</span>
        </p>

        <div className="painel__filtros">
          <input
            type="text"
            placeholder="UF (ex: SP)"
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="País (ex: Brazil)"
            value={pais}
            onChange={e => setPais(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="Data Início (dd/mm/yyyy)"
            value={dataInicio}
            onChange={e => setDataInicio(aplicarMascaraData(e.target.value))}
          />
          <input
            type="text"
            placeholder="Data Fim (dd/mm/yyyy)"
            value={dataFim}
            onChange={e => setDataFim(aplicarMascaraData(e.target.value))}
          />

          <button className="botao-buscar" onClick={buscarDadosFiltrados}>
            Buscar
          </button>
        </div>

        <div className="painel__cards">
          <div className="painel__card">
            <div className="painel__card-header">
              <span>Estados Monitorados</span>
              <FaChevronDown />
            </div>
            <h3>{dadosPorEstado.length}</h3>
            <p>Dados por estado</p>
          </div>

          <div className="painel__card">
            <div className="painel__card-header">
              <span>Países Monitorados</span>
              <FaChevronDown />
            </div>
            <h3>{dadosPorPaises.length}</h3>
            <p>Dados globais</p>
          </div>

          {dadosEstadoFiltrado && (
            <div className="painel__card">
              <div className="painel__card-header">
                <span>Estado: {dadosEstadoFiltrado.state}</span>
                <FaChevronDown />
              </div>
              <h3>{dadosEstadoFiltrado.cases}</h3>
              <p>Mortes: {dadosEstadoFiltrado.deaths}</p>
            </div>
          )}

          {dadosPaisFiltrado && (
            <div className="painel__card">
              <div className="painel__card-header">
                <span>País: {dadosPaisFiltrado.country}</span>
                <FaChevronDown />
              </div>
              <h3>{dadosPaisFiltrado.cases}</h3>
              <p>Mortes: {dadosPaisFiltrado.deaths} | Recuperados: {dadosPaisFiltrado.recovered}</p>
            </div>
          )}
        </div>

        <div className="painel__graficos">
          <div className="grafico-container">
            <h3>Casos Confirmados e Mortes por Estado</h3>
            <Bar data={chartEstados} options={{ ...chartOptions, title: { text: "COVID-19 por Estado" } }} />
          </div>

          {chartDataBrasil && (
            <div className="grafico-container">
              <h3>Situação Brasil - {dataEspecifica}</h3>
              <Bar data={chartDataBrasil} options={{ ...chartOptions, title: { text: "COVID-19 no Brasil por Data" } }} />
            </div>
          )}

          {chartIntervaloBrasil && (
            <div className="grafico-container">
              <h3>Brasil - Intervalo de Datas</h3>
              <Bar data={chartIntervaloBrasil} options={{ ...chartOptions, title: { text: "COVID-19 no Brasil por Intervalo" } }} />
            </div>
          )}

          <div className="grafico-container">
            <h3>Top 10 Países com Mais Casos</h3>
            {paisesOrdenados.length > 0 ? (
              <Bar data={chartPaises} options={{ ...chartOptions, title: { text: "COVID-19 por País" } }} />
            ) : (
              <p>Carregando dados dos países...</p>
            )}
          </div>
        </div>
      </section>
      


      <section className="painel__fontes">
          <div className="fontes-card">
            <h3>FONTES</h3>
            <ul>
              <li><a href="https://datasus.saude.gov.br" target="_blank" rel="noreferrer">DATASUS</a> – https://datasus.saude.gov.br</li>
              <li><a href="https://aps.saude.gov.br/ape/esu-ab" target="_blank" rel="noreferrer">e-SUS AB</a> – https://aps.saude.gov.br/ape/esu-ab</li>
              <li><a href="http://cnes.datasus.gov.br" target="_blank" rel="noreferrer">CNES</a> – http://cnes.datasus.gov.br</li>
              <li><a href="https://www.ibge.gov.br" target="_blank" rel="noreferrer">IBGE</a> – https://www.ibge.gov.br</li>
              <li><a href="#" target="_blank" rel="noreferrer">Secretarias Estaduais de Saúde</a> – Dados descentralizados por UF</li>
            </ul>
          </div>
       </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
