import React from 'react';
import { HistoricalDates } from './components/HistoricalDates/HistoricalDates';
import './styles.scss';
import { historyData } from './data';

export const App: React.FC = () => {
    return (
        <div className="app">
            <HistoricalDates items={historyData} />
        </div>
    );
};