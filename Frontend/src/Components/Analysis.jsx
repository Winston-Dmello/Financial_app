import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
const userid = localStorage.getItem("UserID")
const Analysis = () => {
  const [chartData, setChartData] = useState([]);
  const [geminidata, setGeminidata] = useState("");

  useEffect(() => {
    const fetchData = async (userId = "") => {
      try {
        const response = await fetch(
          `http://localhost:8000/${userId}/expense_pie_chart`
        );
        if (response.ok) {
          const data = await response.json();
          // Convert the fetched data into the format required for VictoryPie
          const transformedData = data.map(item => {
            const x = Object.keys(item)[0];
            const y = parseInt(Object.values(item)[0]);
            return { x, y };
          });
          console.log(transformedData);
          setChartData(transformedData);
          
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData(userid);
  }, []); // Empty dependency array ensures that the effect runs only once

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  return (
    <div>
      <h2>My Pie Chart</h2>
      <VictoryPie
        data={chartData}
        colorScale="qualitative"
        labelRadius={20}
        style={{ labels: { fill: "white", fontSize: 9, transform: "translate(0%, 0%) rotate(90deg)"} }} // Changed fontSize to 12
      />
      <div>
        <h3>Bot Suggestions:</h3><br/><br/>
        <button>Update Data</button>&nbsp;
        <p>

        </p>
      </div>
    </div>
  );
};

export default Analysis;
