import React from 'react';
import styled from 'styled-components';
import Tetris from '../src/components/Tetris';
import Controller from './Controller';

const Container = styled.div`
  margin: 24px auto 0;
  width: 100%;
  max-width: 376px;
`;

const Score = styled.div`
  position: relative;
  font-family: monospace;
  font-size: 18px;
  color: #888;
`;

const LeftHalf = styled.div`
  display: inline-block;
  width: 50%;
`;

const RightHalf = styled(LeftHalf)`
  text-align: right;
`;

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
`;

const LeftColumn = styled(Column)`
  width: 88px;
`;

const RightColumn = styled(LeftColumn)`
  padding-left: 15px;
`;

const MiddleColumn = styled(Column)`
  width: 200px;
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 7px 18px 3px #d2d2d2;
`;

const Alert = styled.h2`
  color: #666;
  margin: 0;
`;

const Button = styled.button`
  border: 1px solid #666;
  background: none;
  margin-top: 12px;
  border-radius: 4px;
`;
type GamePanelProps = {
  onClaimRewards: (amount: number) => void;
  pointsToXrp?: (points: number) => number; // Make it optional if it may not always be provided
  address: string;
};


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
const pointsToXrp = (points) => {
  const conversionRate = 0.001; // 1 point = 0.001 XRP
  return points * conversionRate;
};

const GamePanel = ({ onClaimRewards, address }: GamePanelProps): JSX.Element => {
  
  const handleClaimRewards = async (pointsFromTetris) => {
    console.log(`Claiming rewards for points: ${pointsFromTetris}`);
    const xrpAmount = pointsToXrp(pointsFromTetris);
    console.log(`Converted XRP amount: ${xrpAmount}`);
    await onClaimRewards(xrpAmount);
  };
  

  // Here you must return the JSX structure
  return (
    <Container>
    <Tetris>
      {({
        // Destructure points and linesCleared directly from here
        Gameboard,
        HeldPiece,
        PieceQueue,
        points,
        linesCleared,
        state,
        controller
      }) => (
          <div>
            <div style={{ opacity: state === 'PLAYING' ? 1 : 0.5 }}>
              <Score>
                <LeftHalf>
                  <p>
                    points
                    <br />
                    <Digits>{points}</Digits>
                  </p>
                </LeftHalf>
                <RightHalf>
                  <p>
                    lines
                    <br />
                    <Digits>{linesCleared}</Digits>
                  </p>
                </RightHalf>
              </Score>

              <LeftColumn>
                <HeldPiece />
              </LeftColumn>

              <MiddleColumn>
                <Gameboard />
              </MiddleColumn>

              <RightColumn>
                <PieceQueue />
              </RightColumn>

              <Controller controller={controller} />
              <ClaimButton onClick={() => handleClaimRewards(points)}>Claim XRP</ClaimButton>
            </div>
            {state === 'PAUSED' && (
              <Popup>
                <Alert>Paused</Alert>
                <Button onClick={controller.resume}>Resume</Button>
              </Popup>
            )}

            {state === 'LOST' && (
              <Popup>
                <Alert>Game Over</Alert>
                <Button onClick={controller.restart}>Start</Button>
              </Popup>
            )}
          </div>
        )}
      </Tetris>
    </Container>
  );
};

const Digit = styled.span`
  font-family: monospace;
  padding: 1px;
  margin: 1px;
  font-size: 24px;
`;

type DigitsProps = {
  children: number;
  count?: number;
};
const Digits = ({ children, count = 4 }: DigitsProps): JSX.Element => {
  let str = children.toString();

  while (str.length < count) {
    str = `${0}${str}`;
  }

  return (
    <>
      {str.split('').map((digit, index) => (
        <Digit key={index}>{digit}</Digit>
      ))}
    </>
  );
};

export default GamePanel;
