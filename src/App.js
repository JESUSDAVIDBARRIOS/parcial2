import './App.css';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card} from "react-bootstrap";

function App() {

  const [bandas, setBandas] = useState([]);
  const [oldestBand, setOldestBand] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/806a4dcd1af61b4cc498d24c52e84320/raw/8711b7af9091d2831ed043563cad2a61311b0a5f/music-bands.json')
      .then(response => response.json())
      .then(data => setBandas(data));

      let oldest_band = null;
      let foundation_year = new Date().getFullYear();
      for (let i = 0; i < bandas.length; i++) {
        if (bandas[i].foundation_year < foundation_year) {
          foundation_year = bandas[i].foundation_year;
          oldest_band = bandas[i];
        }
      }
      setOldestBand(oldest_band);

  }, [setBandas, setOldestBand, bandas]);

  function handleBandClick(band) {
    setSelectedBand(band);
  }

  return (
    <div className="App">
      <div className='w-100 mb-5 p-4 d-flex justify-content-center' style={{backgroundColor: "rgb(166,200,205)"}}>
        <h4 className='m-0'><FormattedMessage id="app.titulo" defaultMessage={"Bandas musicales"} /></h4>
      </div>
      <div className='w-100 d-flex flex-wrap justify-content-between my-4 container'>
      <div className='w-75 px-5'>
        <table className='w-100 table m-4'>
          <thead>
            <tr className='border-top'>
              <th>#</th>
              <th>
                <FormattedMessage id="app.nombre" defaultMessage={"Nombre"} />
              </th>
              <th><FormattedMessage id="app.pais" defaultMessage={"País"} /></th>
              <th><FormattedMessage id="app.genero" defaultMessage={"Género"} /></th>
              <th><FormattedMessage id="app.fundacion" defaultMessage={"Fundación"} /></th>
            </tr>
          </thead>
          <tbody>
          {bandas.length > 0 && bandas.map((banda) => (
            <tr onClick={() => handleBandClick(banda)} className="bg-light" key={banda.id}>
              <td>{banda.id}</td>
              <td className='text-primary cursor-pointer text-font-bold'>{banda.name}</td>
              <td>{banda.country}</td>
              <td>{banda.genre}</td>
              <td>{banda.foundation_year}</td>
            </tr>
          ))}
          </tbody>
        </table>
        {oldestBand && (
          <div className='w-100 text-start'><FormattedMessage id="app.banda_mas_antigua" defaultMessage={"La banda más antigua es "} /><b>{oldestBand.name}</b><FormattedMessage id="app.fundada_en" defaultMessage={" y fue fundada hace "} /><b>{(new Date()).getFullYear() - oldestBand.foundation_year}</b><FormattedMessage id="app.anios_ago" defaultMessage={" años"} /></div>
        )}
      </div>
      <div className='w-25'>
        {selectedBand && (
          <Card className="cards">
              <Card.Body style={{ minHeight: "fit-contet" }}>

                  <Card.Img className='center-block images' src={selectedBand.image} />
                  <Card.Title style={{ padding: "20px" }}>
                      {selectedBand.name}
                  </Card.Title>
                  <Card.Text>
                      <p className='text-sm-start'>{selectedBand.description}</p>
                  </Card.Text>
              </Card.Body>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
