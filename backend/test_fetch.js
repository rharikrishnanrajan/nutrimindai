async function test() {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=AIzaSyB7I6qMsWln29f1TNpUZpz1yd8QpPV0Jws';
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "contents": [{ "parts": [{ "text": "Hello" }] }]
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    console.log("RESPONSE:", result);
  } catch (error) {
    console.log('error', error);
  }
}
test();
