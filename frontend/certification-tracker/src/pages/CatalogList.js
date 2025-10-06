import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import '../styles/theme.css';
import { Link } from 'react-router-dom';

const CatalogList = () => {
  const [certs, setCerts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    axios.get('/certifications').then(res => setCerts(res.data));
  }, []);

  const categories = [...new Set(certs.map(c => c.category))];
  const subcategories = [...new Set(certs.filter(c => c.category === selectedCategory).map(c => c.subcategory))];
  const filteredCerts = certs.filter(c => c.subcategory === selectedSubcategory);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Certification Catalog</h2>

      <div>
        <label>Select Category: </label>
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">--Choose--</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div><br></br><br></br>

      {selectedCategory && (
        <div>
          <label>Select Subcategory: </label>
          <select onChange={e => setSelectedSubcategory(e.target.value)} value={selectedSubcategory}>
            <option value="">--Choose--</option>
            {subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
        </div>
      )}
      <br></br>
      <div className="catalog-grid">
        {filteredCerts.map(cert => (
          <div className="catalog-card" key={cert.id}>
            <img
              src={`http://localhost:8080/api/images/${cert.name.split(' ')[0].toLowerCase()}`}
              alt={cert.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
            <h3>{cert.name}</h3>
            <Link to={`/catalog/${cert.id}`}><button>View Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogList;