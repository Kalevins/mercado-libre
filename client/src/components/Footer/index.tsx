import type { ReactElement } from 'react';

import './styles.scss';

interface FooterProps {
  handleOffset: (newPage: number) => void;
  total: number;
  offset: number;
  limit: number;
}

export const Footer = ({ handleOffset, total, offset, limit }: FooterProps): ReactElement => {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const page = Math.ceil(offset / limit) + 1;

  return (
    <footer className='footer'>
      <ul className='footer__list'>
        {page > 1 && (
          <li className='footer__item'>
            <button className='footer__button footer__button--text' onClick={() => handleOffset(offset - limit)}>
              {'< Anterior'}
            </button>
          </li>
        )}
        {page >= 10 && (
          <>
            <li className='footer__item'>
              <button className='footer__button' onClick={() => handleOffset(1)}>
                1
              </button>
            </li>
            <li className='footer__item'>
              <button className='footer__button footer__button--visual'>
                ...
              </button>
            </li>
          </>
        )}
        {pages
          .filter((pageNumber) => {
            if (page < 10) {
              return pageNumber <= 10;
            }
            if (page > totalPages - 8) {
              return pageNumber >= totalPages - 8;
            }
            return pageNumber >= page - 5 && pageNumber <= page + 5;
          })
          .map((pageNumber) => (
            <li key={pageNumber} className='footer__item'>
              <button
                className={`footer__button ${pageNumber === page ? 'footer__button--active' : ''}`}
                onClick={() => handleOffset((pageNumber - 1) * limit)}
              >
                {pageNumber}
              </button>
            </li>
          ))
        }
        {page > 8 && page <= totalPages - 8 && (
          <>
            <li className='footer__item'>
              <button className='footer__button footer__button--visual'>
                ...
              </button>
            </li>
            <li className='footer__item'>
              <button className='footer__button' onClick={() => handleOffset(total - limit)}>
                {totalPages}
              </button>
            </li>
          </>
        )}
        {page < totalPages && (
          <li className='footer__item'>
            <button className='footer__button footer__button--text' onClick={() => handleOffset(offset + limit)}>
              {'Siguiente >'}
            </button>
          </li>
        )}
      </ul>
    </footer>
  )
}