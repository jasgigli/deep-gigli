// components/Collaboration.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(); // Configure with your server URL if needed

export default function Collaboration({ conversationId, onUpdate }) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    socket.emit("joinConversation", conversationId);

    socket.on("participantUpdate", (data) => {
      setParticipants(data);
    });

    socket.on("conversationUpdate", (data) => {
      onUpdate(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  return (
    <div className="p-4 border-t">
      <h3 className="font-bold">Participants:</h3>
      <ul>
        {participants.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
