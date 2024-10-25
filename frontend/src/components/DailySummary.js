import React from 'react';

const DailySummary = ({ summaryData }) => (
    <div className="summary">
        <h2>Daily Summary</h2>
        <table>
            <thead>
                <tr>
                    <th>City</th>
                    <th >Avg. Temp (°C)</th>
                    <th>Max. Temp (°C)</th>
                    <th>Min. Temp (°C)</th>
                    <th>Conditions</th>
                </tr>
            </thead>
            <tbody>
                {summaryData.length === 0 ? (
                    <tr>
                        <td colSpan="5">No summary data available.</td>
                    </tr>
                ) : (
                    summaryData.map((summary, index) => (
                        <tr key={index}>
                            <td>{summary._id}</td>
                            <td>{summary.avgTemp.toFixed(1)}</td>
                            <td>{summary.maxTemp.toFixed(1)}</td>
                            <td>{summary.minTemp.toFixed(1)}</td>
                            <td>{summary.conditions.join(', ')}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default DailySummary;