import type { ReactElement } from 'react';

import './styles.scss';

export const LoadingScreen = (): ReactElement => {
  return (
    <div className='loading-screen'>
      <div className='loading-screen__spinner'/>
    </div>
  )
}