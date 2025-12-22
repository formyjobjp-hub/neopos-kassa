
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/tailwind.css'
import { ErrorBoundary } from './components/ErrorBoundary';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </I18nextProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
