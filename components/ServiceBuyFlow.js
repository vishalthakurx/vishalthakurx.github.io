import React, { useState } from 'react';

const serviceTiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 10,
    description: 'Basic service package with essential features.',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 25,
    description: 'Standard package with additional features and support.',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50,
    description: 'Premium package with all features and priority support.',
  },
];

export default function ServiceBuyFlow() {
  const [selectedTier, setSelectedTier] = useState(serviceTiers[0]);
  const [discussion, setDiscussion] = useState('');
  const [messages, setMessages] = useState([]);

  const handleTierChange = (tier) => setSelectedTier(tier);

  const handleDiscussionSubmit = (e) => {
    e.preventDefault();
    if (discussion.trim()) {
      setMessages([...messages, { text: discussion, date: new Date() }]);
      setDiscussion('');
    }
  };

  return (
    <div>
      <h2>Select Service Tier</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {serviceTiers.map((tier) => (
          <div
            key={tier.id}
            style={{
              border: selectedTier.id === tier.id ? '2px solid #007bff' : '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '200px'
            }}
            onClick={() => handleTierChange(tier)}
          >
            <h3>{tier.name}</h3>
            <p>{tier.description}</p>
            <strong>${tier.price}</strong>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Selected Tier: {selectedTier.name}</h3>
        <p>{selectedTier.description}</p>
        <button style={{ marginTop: '1rem' }}>Buy Now (${selectedTier.price})</button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Discussion</h3>
        <form onSubmit={handleDiscussionSubmit}>
          <textarea
            value={discussion}
            onChange={(e) => setDiscussion(e.target.value)}
            placeholder="Ask a question or discuss with the seller..."
            rows={3}
            style={{ width: '100%' }}
          />
          <button type="submit" style={{ marginTop: '0.5rem' }}>Send</button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem', background: '#f5f5f5', padding: '0.5rem', borderRadius: '4px' }}>
              <div>{msg.text}</div>
              <small>{msg.date.toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
