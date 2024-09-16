const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const API_KEY = process.env.API_KEY;  // 환경변수에서 API_KEY 가져오기
  const apiUrl = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",  // CORS 설정
        "Access-Control-Allow-Headers": "Content-Type",
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};