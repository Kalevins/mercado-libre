import { useEffect, useState, type ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import type { ItemsById } from '@/types';
import { getItemById } from '@/services';
import { formatCurrency } from '@/utils/currency';
import './styles.scss';
import { conditionsOptions } from '@/utils';
import { LoadingScreen } from '@/components';

export function Details(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemsById>({
    item: {
      id: '',
      title: '',
      seller: '',
      price: {
        currency: 'ARS',
        amount: 0,
        decimals: 0,
        regular_amount: 0,
      },
      condition: 'not_specified',
      free_shipping: false,
      installments: {
        quantity: null,
        amount: null,
      },
      pictures: [],
      sold_quantity: null,
      description: '',
      attributes: [],
      category_path_from_root: [],
    }
  });
  const [selectedPicture, setSelectedPicture] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    setIsLoading(true);
    getItemById(id).then((data) => {
      setItem(data);
      setSelectedPicture(data.item.pictures[0]);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  const handlePicture = (picture: string) => {
    setSelectedPicture(picture);
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="details">
      <div className='details__header'>
        <div className="details__breadcrumb">
          <span
            className="details__breadcrumb--blue details__breadcrumb--click"
            onClick={() => navigate(-1)}
          >
            Volver al listado
          </span>
          <div className="details__line--vertical" />
          {item.item.category_path_from_root.map((category, index) => (
            <span key={index}>
              {category}
            </span>
          ))}
        </div>
        <p className="details__publication">Publicación: <strong>#{item.item.id}</strong></p>
      </div>
      <div className="details__content">
        <div className="details__information">
          <div className="details__pictures">
            {item.item.pictures.map((picture, index) => (
              <div
                key={index}
                className={`details__thumbnail-container ${selectedPicture === picture ? 'selected' : ''}`}
                onMouseEnter={() => handlePicture(picture)}
              >
                <img src={picture} alt={item.item.title} className="details__thumbnail"/>
              </div>
            ))}
          </div>
          <div className="details__picture-container">
            <img src={selectedPicture} alt={item.item.title} className="details__picture"/>
          </div>
          <div className="details__info">
            <div className="details__condition">
              <p>{conditionsOptions[item.item.condition]}</p>
              <div className="details__line--vertical"/>
              {item.item.sold_quantity && (
                <p>{`${item.item.sold_quantity} vendidos`}</p>
              )}
            </div>
            <div className="details__titles">
              <p className="details__title">
                {item.item.title}
              </p>
              <p className="details__seller">
                {`Por ${item.item.seller}`}
              </p>
            </div>
            <div>
              {item.item.price.regular_amount && (
                <p className="details__discount">
                  {formatCurrency(item.item.price.regular_amount, item.item.price.currency)}
                </p>
              )}
              <div className="details__price-container">
                <p className="details__price">
                  {formatCurrency(item.item.price.amount, item.item.price.currency)}
                </p>
                {item.item.price.regular_amount && (
                  <p className='details__promotion'>
                    {`${Math.floor((1 - item.item.price.amount / item.item.price.regular_amount) * 100)}% OFF`}
                  </p>
                )}
              </div>
              {item.item.installments.amount && (
                <p className='details__installments'>
                  {`Mismo precio en ${item.item.installments.quantity} cuotas de ${formatCurrency(item.item.installments.amount, item.item.price.currency)}`}
                </p>
              )}
            </div>
            {item.item.free_shipping && (
              <p className="details__shipping">Envío gratis</p>
            )}
            {item.item.attributes.find((attribute) => attribute.id === 'MAIN_COLOR') && (
              <p className="details__color">
                Color:
                <strong>{item.item.attributes.find((attribute) => attribute.id === 'MAIN_COLOR')?.value_name}</strong>
              </p>
            )}
          </div>
        </div>
        <div className='details__description'>
          <h3 className='details__description-title'>Descripción</h3>
          <p className='details__description-text'>{item.item.description}</p>
        </div>
      </div>
    </section>
  )
}
