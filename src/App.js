
import { useState, useEffect } from 'react';
import CountrySelector from '../src/components/CountrySelector';
import HighLight from '../src/components/HighLight';
import Sumary from '../src/components/Summary';
import { getCountries, getReportByCountry } from './api';

function App() {

  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report,setReport]=useState([]);

  useEffect(() => {
    getCountries()
      .then(res => {
        setCountries(res.data);
        setSelectedCountryId('vn');
      })
  }, [])

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if(selectedCountryId) {
      const{Slug}= countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);
      getReportByCountry(Slug).then(res => {
        res.data.pop();
        setReport(res.data);
    });
    }
  }, [countries, selectedCountryId]
  
  )
  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <HighLight report={report} />
      <Sumary report={report} />
    </>
  );
}

export default App;
