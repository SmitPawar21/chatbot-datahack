import React, { useState, useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';

export const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef(null);
    const userInput = document.querySelector(".userInput");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (input === '') return;

        const newMessage = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
        userInput.value = '';

        const response = await fetch('https://52cb-202-134-191-26.ngrok-free.app/chat',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({msg: input})
        })
        const data = await response.json()
        const botResponse = { text: data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
    };

    const styles = {
        userMessage: {
            width: 'fit-content',
            maxWidth: '48%',
            textAlign: 'left',
            padding: '7px 15px',
            marginLeft: 'auto',
            marginBottom: '5px',
            backgroundColor: '#d1e7dd',
            borderRadius: '25px',
            boxSizing: 'border-box'
        },
        botMessage: {
            width: 'fit-content',
            maxWidth: '48%',
            textAlign: 'left',
            padding: '7px 15px',
            boxSizing: 'border-box',
            marginRight: '50%',
            marginBottom: '5px',
            backgroundColor: '#f8d7da',
            borderRadius: '25px',
        }
    }

    const handleSpeechRecognition = () => {
        setIsListening(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <div className='chatbot'>
            <div className='navbar'>
                <h1>Chatbot</h1>
            </div>

            <div className='messageList'>
                <div style={styles.botMessage}> Hello, how may I help You </div>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className='inputBox'>
                <input
                    type='text'
                    className='userInput'
                    placeholder='Message Chatbot'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
                <button onClick={handleSpeechRecognition} disabled={isListening}>
                    <Mic color={isListening ? "red" : "black"} />
                </button>
            </div>
        </div>
    );
};
