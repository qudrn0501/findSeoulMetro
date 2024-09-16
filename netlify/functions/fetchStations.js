exports.handler = async function(event, context) {
  try {
    // 환경 변수 확인
    console.log("Environment Variables: ", process.env); // 모든 환경 변수 출력
    const fetch = (await import('node-fetch')).default;
    const API_KEY = process.env.REACT_APP_API_KEY;
    console.log("API_KEY: ", API_KEY); // API_KEY 값 출력

    
    if (!API_KEY) {
      console.error("API_KEY is missing");
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "API_KEY is missing" }),
      };
    }

    // HTTP 요청 (Netlify 서버에서는 HTTP 요청 가능)
    const apiUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;
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