import styles from "./styles.module.css";
import RoomAndUsersColumn from "./RoomAndUsers"; // Add this
import SendMessage from "./Send";
import MessagesReceived from "./messages";

const Chat = ({ username, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      {/* Add this */}
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
