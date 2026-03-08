const fs = require('fs');
async function listModels() {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyB7I6qMsWln29f1TNpUZpz1yd8QpPV0Jws';
  try {
    const response = await fetch(url);
    const result = await response.json();
    fs.writeFileSync('models_debug.json', JSON.stringify(result, null, 2));
    console.log("Wrote models to models_debug.json");
  } catch (error) {
    console.log('error', error);
  }
}
listModels();
