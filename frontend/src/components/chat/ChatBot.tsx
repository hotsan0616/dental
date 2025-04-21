import React, { useState } from 'react';
import styles from './ChatBot.module.css';
import { FaComments } from 'react-icons/fa';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatWindow}>
          <iframe
            src="https://copilotstudio.microsoft.com/environments/Default-6862b880-d69f-41e6-862b-0581558d94a5/bots/cr762_hkdcCustomerSupport/webchat?__version__=2"
            frameBorder="0"
            className={styles.chatFrame}
          />
        </div>
      )}
      <button
        className={styles.chatButton}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        <FaComments />
      </button>
    </div>
  );
};

export default ChatBot;