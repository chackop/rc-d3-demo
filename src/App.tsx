import React from 'react';
import './App.css';
import BasicBarD3 from './components/BasicBarD3';
import AnimatedD3 from './components/AnimatedD3';
import BasicLineD3 from './components/BasicLineD3';
import LineRechart from './components/Rechart/LineRechart';
import BarRechart from './components/Rechart/BarRechart';
import PieRechart from './components/Rechart/PieRechart';
import AreaLineRechart from './components/Rechart/LineAreaRechart';
import AnimatedBarD3 from './components/AnimatedBarD3';
import StackBarD3 from './components/StackBarD3';
import PotionChart from './components/PotionComponents';
import VXCharts from './components/VXCharts';
import CustomLineLayout from './components/CustomLineLayout';

function App() {
  return (
    <div className="container-grid">
      <div className="grid-item">
        <h3>Line Graph Using Rechart</h3>
        <LineRechart />
      </div>

      <div className="grid-item">
        <h3>Bar Graph Using Rechart</h3>
        <BarRechart />
      </div>

      <div className="grid-item">
        <h3>Pie Chart Using Rechart</h3>
        <PieRechart />
      </div>

      <div className="grid-item">
        <h3>Area Line Rechart</h3>
        <AreaLineRechart />
      </div>

      <div className="grid-item">
        <h3>VX Library</h3>
        <VXCharts />
      </div>

      <div className="grid-item">
        <h3>Potion Library</h3>
        <PotionChart />
      </div>

      <div className="grid-item">
        <h3>Custom D3 based Basic Custom Bar Graph</h3>
        <BasicBarD3 />
      </div>

      <div className="grid-item">
        <h3>Custom D3 based Basic Line Graph</h3>
        <BasicLineD3 />
      </div>

      {/* <div className="grid-item">
        <h3>Custom D3 based Animated Line Graph</h3>
        <AnimatedD3 />
      </div> */}

      <div className="grid-item">
        <h3>Custom D3 based Animated Bar Chart</h3>
        <AnimatedBarD3 />
      </div>

      <div className="grid-item">
        <h3>Custom D3 based Stacked Bar Chart</h3>
        <StackBarD3 />
      </div>

      <div className="grid-item">
        <h3>Custom D3 based Line Layout</h3>
        <CustomLineLayout />
      </div>
    </div>
  );
}

export default App;
