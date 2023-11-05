// xrplTransfer.js
const xrpl = require('xrpl');

async function transferXRP(recipientAddress, amount) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed("sEdS1qXiNCrDpmEMzUsdRzkr45A3by3");

  const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": wallet.address,
    "Amount": xrpl.xrpToDrops(amount.toString()),
    "Destination": recipientAddress
  });

  const signed = wallet.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  await client.disconnect(); // Ensure you await the disconnect as well
  return result; // Return the result for logging or response purposes
}

module.exports = transferXRP;
