exports.handler = async function(event, context) {
  try {
    console.log("Fetching node-fetch dynamically");
    const fetch = (await import('node-fetch')).default;  // 동적 import 사용
    const API_KEY = process.env.API_KEY;
    
    if (!API_KEY) {
      console.error("API_KEY is missing");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "API_KEY is missing" }),
      };
    }

    const apiUrl = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;
    console.log("API URL: ", apiUrl);

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `API request failed with status ${response.status}` }),
      };
    }

    const data = await response.json();
    console.log("Data fetched successfully: ", data);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",  // CORS 설정
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };

  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};