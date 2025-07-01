import React, { useState } from 'react';

// Simulate a complex form component with validation
const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulate complex validation logic
  const validateForm = (data) => {
    const newErrors = {};
    
    // Name validation
    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (data.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (data.phone && !phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Message validation
    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (data.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
      <h3>Form Component Loaded</h3>
      <p>This component demonstrates complex form validation and state management.</p>
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.name ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px'
            }}
            placeholder="Enter your name"
          />
          {errors.name && (
            <small style={{ color: '#dc3545' }}>{errors.name}</small>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.email ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px'
            }}
            placeholder="Enter your email"
          />
          {errors.email && (
            <small style={{ color: '#dc3545' }}>{errors.email}</small>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.phone ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px'
            }}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <small style={{ color: '#dc3545' }}>{errors.phone}</small>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.message ? '1px solid #dc3545' : '1px solid #ced4da',
              borderRadius: '4px',
              resize: 'vertical'
            }}
            placeholder="Enter your message"
          />
          {errors.message && (
            <small style={{ color: '#dc3545' }}>{errors.message}</small>
          )}
        </div>

        <button
          type="submit"
          style={{
            background: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isSubmitted ? 'Submitting...' : 'Submit Form'}
        </button>
      </form>

      {isSubmitted && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#d4edda', 
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724'
        }}>
          <strong>✅ Form submitted successfully!</strong>
          <br />
          <small>This demonstrates real form validation and state management.</small>
        </div>
      )}
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '4px' }}>
        <strong>📝 Form component loaded successfully!</strong>
        <br />
        <small>This demonstrates real code splitting for complex form components.</small>
      </div>
    </div>
  );
};

export default FormComponent; 