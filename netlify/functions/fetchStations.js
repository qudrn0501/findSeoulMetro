const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/SearchSTNBySubwayLineInfo/1/1000/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
  }
};