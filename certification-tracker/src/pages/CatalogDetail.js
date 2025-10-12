import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import '../styles/theme.css';

const CatalogDetail = () => {
  const { id } = useParams();
  const [cert, setCert] = useState(null);

  useEffect(() => {
    axios.get(`/certifications/${id}`).then(res => setCert(res.data));
  }, [id]);

  if (!cert) return <p>Loading...</p>;

  return (
    <div>
      <h2>{cert.name}</h2>
      <p><strong>Authority:</strong> {cert.authority}</p>
      <p><strong>Category:</strong> {cert.category}</p>
      <p><strong>Validity:</strong> {cert.validityMonths} months</p>
      <p><strong>Prerequisites:</strong> {cert.prerequisites}</p>
    </div>
  );
};

export default CatalogDetail;