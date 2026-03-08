async function testModels() {
  const apiKey = 'AIzaSyB7I6qMsWln29f1TNpUZpz1yd8QpPV0Jws';
  const models = [
    "gemini-3.1-flash-lite-preview",
    "gemini-3-flash-preview",
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.0-flash-lite",
    "gemini-2.0-flash-lite-001",
    "gemini-pro-latest",
    "gemma-3-4b-it",
    "gemma-3-27b-it",
  ];
  
  const body = JSON.stringify({"contents":[{"parts":[{"text":"Say hi in one word"}]}]});
  
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body
      });
      const result = await response.json();
      if (result.error) {
        console.log(`${model}: ERROR ${result.error.code} - ${result.error.message.substring(0,80)}`);
      } else {
        console.log(`${model}: SUCCESS - ${JSON.stringify(result?.candidates?.[0]?.content?.parts?.[0]?.text)}`);
      }
    } catch (e) {
      console.log(`${model}: EXCEPTION - ${e.message}`);
    }
  }
}
testModels();
