import React from "react";

const Ticket = ({ occasion, transactionId, selectedSeat }) => {
  return (
    <div
      className="ticket"
      style={{
        backgroundColor: "white",
        border: "2px solid #002855",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "50vw",
        marginLeft: "150px",
      }}
    >
      <h2>Ticket Details</h2>
      <p>
        <strong>Occasion:</strong> {occasion.name}
      </p>
      <p>
        <strong>Date:</strong> {occasion.date}
      </p>
      <p>
        <strong>Time:</strong> {occasion.time}
      </p>
      <p>
        <strong>Location:</strong> {occasion.location}
      </p>
      {selectedSeat && (
        <p>
          <strong>Seat Number:</strong> {selectedSeat}
        </p>
      )}

      <p>
        <strong>Transaction ID:</strong> {transactionId}
      </p>
    </div>
  );
};

export default Ticket;
