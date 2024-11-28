import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logos/primary.png';
import Search from '@/assets/logos/search.png';

import './styles.scss';

export const Header = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  const handleClick = () => {
    navigate(`/items?search=${search}`);
    setSearch('');
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  useEffect(() => {
    const storage = sessionStorage.getItem('isFirstTime');
    if (storage === 'false') {
      setIsFirstTime(false);
    }
  }, []);

  return (
    <header className='header'>
      <section className='header__content'>
        <img
          className='header__logo'
          src={Logo}
          alt='logo'
          onClick={() => navigate('/')}
        />
        <div className='header__search'>
          <input
            className='header__input'
            type='text'
            placeholder='Buscar productos, marcas y más...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className='header__line'/>
          <button className='header__button' type='button' onClick={handleClick}>
            <img className='header__icon' src={Search} alt='search'/>
          </button>
        </div>

        {isFirstTime && (
          <div className='header__message-container'>
            <div className='header__message-title'>
              <p>Hola</p>
              <button
                className='header__message-button'
                type='button'
                onClick={() => {
                  setIsFirstTime(false);
                  sessionStorage.setItem('isFirstTime', 'false');
                }}
              >
                x
              </button>
            </div>
            <p>Para realizar büsquedas, solo debes ingresar el nombre de lo que necesites. Pueden ser productos, marcas y mås..</p>
          </div>
        )}
      </section>
    </header>
  )
}