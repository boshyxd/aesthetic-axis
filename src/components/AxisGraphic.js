import React from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const AxisGraphic = ({ results = {} }) => {
  if (Object.keys(results).length === 0) {
    return <div>No data available for the chart.</div>;
  }

  const aesthetics = Object.keys(results);
  const scores = Object.values(results);

  const values = [...scores, scores[0]];
  const labels = [...aesthetics, aesthetics[0]];

  const data = [{
    type: 'scatterpolar',
    r: values,
    theta: labels,
    fill: 'toself',
    fillcolor: 'rgba(238, 237, 235, 0.5)',
    line: {
      color: '#ECC94B'
    },
    hoverinfo: 'text',
    text: labels.map((label, index) => `${label}: ${values[index].toFixed(2)}`)
  }];

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, Math.max(...scores)],
        color: '#2F3645',
      },
      angularaxis: {
        color: '#2F3645',
      },
      bgcolor: 'rgba(0,0,0,0)',
    },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      family: 'Arial, sans-serif',
      size: 12,
      color: '#2F3645'
    },
    margin: {
      l: 40,
      r: 40,
      b: 40,
      t: 40,
    },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
    doubleClick: false,
    showTips: true,  // Enable hover tips
    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d'],
    staticPlot: false  // Allow hover interactions
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default AxisGraphic;
