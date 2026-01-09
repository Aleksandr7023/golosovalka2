// components/NewPollModal.jsx
import { useState } from 'react';

export default function NewPollModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [optionsText, setOptionsText] = useState('');

  const handleSave = () => {
    const options = optionsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (!title || !question || options.length < 2) {
      alert('Заполните тему, вопрос и минимум 2 варианта ответа');
      return;
    }

    onSave({ title, question, options });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#0969da' }}>Создать новый опрос</h2>

        <label style={{ display: 'block', marginBottom: '15px' }}>
          Тема:<br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d0d7de', marginTop: '8px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '15px' }}>
          Вопрос:<br />
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d0d7de', marginTop: '8px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '20px' }}>
          Варианты (по одному на строку):<br />
          <textarea
            value={optionsText}
            onChange={e => setOptionsText(e.target.value)}
            placeholder="Да\nНет\nНе знаю"
            style={{ width: '100%', height: '150px', padding: '12px', borderRadius: '8px', border: '1px solid #d0d7de', marginTop: '8px' }}
          />
        </label>

        <div style={{ textAlign: 'right' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 24px',
              background: '#2ea44f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Создать
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}