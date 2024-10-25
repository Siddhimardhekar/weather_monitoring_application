import React from 'react';

const AlertsList = ({ alerts }) => (
    <div className="alerts">
        <h2>Alerts</h2>
        <ul>
            {alerts.length === 0 ? (
                <li>No alerts available.</li>
            ) : (
                alerts.map((alert, index) => (
                    <li key={index}>
                        {alert.city} - {alert.condition} (Threshold: {alert.threshold}°C)
                    </li>
                ))
            )}
        </ul>
    </div>
);

export default AlertsList;