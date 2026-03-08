async function listModels() {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyB7I6qMsWln29f1TNpUZpz1yd8QpPV0Jws';
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (result.models) {
      result.models.forEach(m => console.log(m.name));
    } else {
      console.log("No models found or error:", result);
    }
  } catch (error) {
    console.log('error', error);
  }
}
listModels();
