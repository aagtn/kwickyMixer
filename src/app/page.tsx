'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './store/playerSlice';


const store = configureStore({
  reducer: {
    player: playerReducer, 
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </Provider>
    </QueryClientProvider>
  );
}
