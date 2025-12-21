import './i18n'; // Initialize i18n first
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/tailwind.css'
import { ErrorBoundary } from './components/ErrorBoundary';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </I18nextProvider>
    </React.StrictMode>,
)
