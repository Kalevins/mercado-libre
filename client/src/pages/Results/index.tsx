import { useEffect, useState, type ReactElement } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import type { Items } from '@/types';
import { getItems } from '@/services';
import { formatCurrency } from '@/utils/currency';
import { Footer, LoadingScreen } from '@/components';
import './styles.scss';

export function Results(): ReactElement {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentOffset, setCurrentOffset] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Items>({
    items: [],
    categories: [],
    paging: {
      total: 0,
      offset: 0,
      limit: 0,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    getItems({
      query: searchParams.get('search') || '',
      offset: currentOffset,
    }).then((data) => {
      setItems(data);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [searchParams, currentOffset]);

  const handleOffset = (newPage: number) => {
    setCurrentOffset(newPage);
  }

  const handleClick = (id: string) => {
    navigate(`/items/${id}`);
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <section className="results">
        {items.items.map((item) => (
          <div key={item.id} className="results__item" onClick={() => handleClick(item.id)}>
            <div className="results__picture-container">
              <img src={item.picture} alt={item.title} className="results__picture"/>
            </div>
            <div className="results__content">
              <div className="results__description">
                <p className="results__title">
                {item.title}
                </p>
                <p className="results__seller">
                  {`Por ${item.seller}`}
                </p>
              </div>
              <div>
                {item.price.regular_amount && (
                  <p className="results__discount">
                    {formatCurrency(item.price.regular_amount, item.price.currency)}
                  </p>
                )}
                <div className="results__price-container">
                  <p className="results__price">
                    {formatCurrency(item.price.amount, item.price.currency)}
                  </p>
                  {item.price.regular_amount && (
                    <p className='results__promotion'>
                      {`${Math.floor((1 - item.price.amount / item.price.regular_amount) * 100)}% OFF`}
                    </p>
                  )}
                </div>
                {item.installments.amount && (
                  <p className='results__installments'>
                    {`Mismo precio en ${item.installments.quantity} cuotas de ${formatCurrency(item.installments.amount, item.price.currency)}`}
                  </p>
                )}
              </div>
              {item.free_shipping && (
                <p className="results__shipping">Envío gratis</p>
              )}
              {item.condition === 'not_specified' && (
                <p className="results__condition">Reacondicionado</p>
              )}
            </div>
          </div>
        ))}
      </section>
      <Footer handleOffset={handleOffset} total={items.paging.total} offset={items.paging.offset} limit={items.paging.limit} />
    </>
  )
}
