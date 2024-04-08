import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import "../assets/analysis.css"

const userid = localStorage.getItem("UserID")
const Analysis = () => {
  const [chartData, setChartData] = useState([]);
  const [chartData1, setChartData2] = useState([]);
  const [geminidata, setGeminidata] = useState("");

  const fetchOpinion = async (userId = "") => {
    try {
      const response = await fetch(
        `http://localhost:8000/${userId}/Expert_Opinion`
      );
      if (response.ok) {
        const chatdata = await response.json();
        setGeminidata(chatdata);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async (userId = "") => {
      try {
        const response = await fetch(
          `http://localhost:8000/${userId}/expense_pie_chart`
        );
        if (response.ok) {
          const data = await response.json();
          // Convert the fetched data into the format required for VictoryPie
          const transformedData = data[0].map(item => {
            const x = Object.keys(item)[0];
            const y = parseInt(Object.values(item)[0]);
            return { x, y };
          });
          console.log(transformedData);
          setChartData(transformedData);
          
          const transformedData1 = data[1].map(item => {
            const x = Object.keys(item)[0];
            const y = parseInt(Object.values(item)[0]);
            return { x, y };
          });
          console.log(transformedData1);
          setChartData2(transformedData1);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    
    fetchData(userid);
    fetchOpinion(userid);
  }, []); // Empty dependency array ensures that the effect runs only once

  return (
    <div>
      <div className="pie-charts">
        <div className="chart">
      <h2>UPI vs Non-UPI Expenditure</h2>
      <VictoryPie
        data={chartData}
        colorScale="qualitative"
        labelRadius={30}
        style={{ labels: { fill: "white", fontSize: 15} }} // Changed fontSize to 12
      />
      </div>
      <div className="chart">
      <h2>Expenses vs Incomes</h2>
      <VictoryPie
        data={chartData1}
        colorScale={['tomato', 'orange', 'gold']}
        labelRadius={30}
        style={{ labels: { fill: "white", fontSize: 15} }} // Changed fontSize to 12
      />
      </div>
      </div>
      <div>
        <h3>Bot Suggestions:</h3><br/><br/>
        <button onClick={()=> fetchOpinion(userid)}>Update Data</button>&nbsp;
        <div className="data">
        {geminidata}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
