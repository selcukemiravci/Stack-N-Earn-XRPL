// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transferXRP = require('./xrplTransfer'); // Make sure the file is named xrplTransfer.js

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/transfer-xrp', async (req, res) => {
  const { address, amount } = req.body;
  console.log('Received request:', req.body);

  try {
    // Call the transferXRP function and await its response
    const result = await transferXRP(address, amount);
    res.json({ success: true, result: result }); // Respond with success and the result
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ success: false, error: error.message }); // Respond with error details
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
