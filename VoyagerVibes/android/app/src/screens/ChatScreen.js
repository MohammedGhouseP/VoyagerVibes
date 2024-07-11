import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = auth().currentUser;
  const { ownerId } = route.params; 

  // Log both IDs to console
  useEffect(() => {
    console.log("Current User ID:", currentUser.uid);
    console.log("Owner ID:", ownerId);
  }, [ownerId, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (ownerId && currentUser) {
          const chatId = [currentUser.uid, ownerId].sort().join('_');
          const unsubscribe = firestore()
            .collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('createdAt', 'desc') // Display messages in ascending order
            .onSnapshot(querySnapshot => {
              if (querySnapshot) {
                const messagesData = querySnapshot.docs.map(doc => {
                  const data = doc.data();
                  return {
                    _id: doc.id,
                    text: data.text,
                    createdAt: data.createdAt.toDate(), // Convert Firestore timestamp to Date object
                    user: {
                      _id: data.user._id,
                      name: data.user.name,
                    },
                  };
                });
                setMessages(messagesData); // No need to reverse the order
              } else {
                console.log('No messages found.');
              }
            });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [ownerId, currentUser]);

  const handleSendMessage = async (newMessages = []) => {
    const newMessage = newMessages[0];
    if (ownerId && currentUser) {
      try {
        const chatId = [currentUser.uid, ownerId].sort().join('_');
        await firestore()
          .collection('chats')
          .doc(chatId)
          .collection('messages')
          .add({
            user: {
              _id: currentUser.uid,
              name: currentUser.displayName,
            },
            text: newMessage.text,
            createdAt: new Date(), // Add createdAt timestamp for the new message
          });
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSendMessage(newMessages)}
        user={{
          _id: currentUser ? currentUser.uid : '',
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default ChatScreen;
