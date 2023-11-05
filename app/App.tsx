import React, { useState } from 'react';
import styled from 'styled-components';
import GamePanel from './GamePanel';
import TypedShell from './TypedShell';

const Container = styled.div`
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 300;
  width: 100%;
  position: relative;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 0 18px;
`;

const VerticallyCenterChildren = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 300;
  color: #000;
`;

const SubTitle = styled.h2`
  font-weight: 300;
  font-size: 18px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center; // Align the items vertically
  justify-content: flex-start; // Align the items to the start of the container
  gap: 10px; // Add some space between the items
  margin-bottom: 10px; // Add margin below the input group
`;


const AddressInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  line-height: normal; // Adjust line height to ensure vertical alignment is correct
`;

const ClaimButton = styled.button`
  margin-top: 9px; // Space from the input group
  padding: 10px 15px;
  margin-bottom: 20px;
  border: 1px solid #
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const App = (): JSX.Element => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  // Define a function that will be passed to GamePanel for claiming rewards
  const onClaimRewards = async (amountInXrp) => {
    console.log(`Attempting to transfer ${amountInXrp} XRP to ${address}`);
  
    try {
      const response = await fetch('http://localhost:3001/transfer-xrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, amount: amountInXrp }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Transfer successful:', responseData);
        alert('Your XRP has been sent!');
      } else {
        const errorData = await response.json();
        console.error('Transfer failed:', errorData);
        alert('There was an error with the transfer.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('There was an error with the transfer.');
    }
  };
  
  

  return (
    <Container>
      <Header>
        <Title>Stack-N Earn XRPL</Title>
        <SubTitle>Your original Tetris built with XRP Ledger and JavaScript 🚀</SubTitle>
        <SubTitle>Stack blocks, clear lines to earn XRP!</SubTitle>
        <TypedShell>Enter your XRPL wallet address:</TypedShell>
        <InputGroup>
          <AddressInput
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter XRPL testnet address"
          />
        </InputGroup>
        {/* The ClaimButton is removed from here */}
      </Header>
      <VerticallyCenterChildren>
        {/* Pass down the onClaimRewards function and address to GamePanel */}
        <GamePanel onClaimRewards={onClaimRewards} address={address} />
      </VerticallyCenterChildren>
    </Container>
  );
};

export default App;