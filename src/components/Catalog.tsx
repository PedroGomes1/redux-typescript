import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { IProduct } from '../store/modules/cart/types';
import CatalogItem from './CatalogItem';

const Components: React.FC = () => {

  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then((response) => {
      setCatalog(response.data)
    })
  }, [])

  return (
    <div>
      <h1>Catalog</h1>

      {catalog.map((product) => (
        <CatalogItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default Components;