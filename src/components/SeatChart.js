import { useEffect, useState } from "react";
import Ticket from "./ticket"; // Import the Ticket component

// Import Components
import Seat from "./Seat";

// Import Assets
import close from "../assets/close.svg";

const SeatChart = ({ occasion, tokenMaster, provider, setToggle }) => {
  const [seatsTaken, setSeatsTaken] = useState(false);
  const [hasSold, setHasSold] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const getSeatsTaken = async () => {
    const seatsTaken = await tokenMaster.getSeatsTaken(occasion.id);
    setSeatsTaken(seatsTaken);
  };

  const buyHandler = async (_seat) => {
    setHasSold(false);
    const signer = await provider.getSigner();
    const transaction = await tokenMaster
      .connect(signer)
      .mint(occasion.id, _seat, { value: occasion.cost });

    // Wait for transaction receipt
    const receipt = await transaction.wait();

    // Extract transaction ID from receipt
    const transactionId = receipt.transactionHash;

    // Update state to indicate booking is confirmed
    setHasSold(true);
    alert("Booking confirmed!");

    // Pass transaction ID and selected seat number to Ticket component
    setTransactionId(transactionId);
    setSelectedSeat(_seat); // Assuming you have state to store the selected seat number
  };

  useEffect(() => {
    getSeatsTaken();
  }, [hasSold]);

  return (
    <div className="occasion">
      <div className="occasion__seating">
        <h1>{occasion.name} Seating Map</h1>

        <button onClick={() => setToggle(false)} className="occasion__close">
          <img src={close} alt="Close" />
        </button>

        <div className="occasion__stage">
          <strong>STAGE</strong>
        </div>

        {hasSold ? ( // Conditionally render the Ticket component if a ticket has been bought
          <Ticket
            occasion={occasion}
            transactionId={transactionId}
            selectedSeat={selectedSeat}
          />
        ) : (
          <>
            {seatsTaken &&
              Array(25)
                .fill(1)
                .map((e, i) => (
                  <Seat
                    i={i}
                    step={1}
                    columnStart={0}
                    maxColumns={5}
                    rowStart={2}
                    maxRows={5}
                    seatsTaken={seatsTaken}
                    buyHandler={buyHandler}
                    key={i}
                  />
                ))}

            <div className="occasion__spacer--1 ">
              <strong>WALKWAY</strong>
            </div>

            {seatsTaken &&
              Array(Number(occasion.maxTickets) - 50)
                .fill(1)
                .map((e, i) => (
                  <Seat
                    i={i}
                    step={26}
                    columnStart={6}
                    maxColumns={15}
                    rowStart={2}
                    maxRows={15}
                    seatsTaken={seatsTaken}
                    buyHandler={buyHandler}
                    key={i}
                  />
                ))}

            <div className="occasion__spacer--2">
              <strong>WALKWAY</strong>
            </div>

            {seatsTaken &&
              Array(25)
                .fill(1)
                .map((e, i) => (
                  <Seat
                    i={i}
                    step={Number(occasion.maxTickets) - 24}
                    columnStart={22}
                    maxColumns={5}
                    rowStart={2}
                    maxRows={5}
                    seatsTaken={seatsTaken}
                    buyHandler={buyHandler}
                    key={i}
                  />
                ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SeatChart;
