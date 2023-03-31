import { AppProps } from 'next/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from '../state/store';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default CustomApp;
