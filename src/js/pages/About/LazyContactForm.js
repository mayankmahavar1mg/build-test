import React, { useState } from "react"

function LazyContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setIsSubmitting(false)
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    if (submitted) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px 20px'
            }}>
                <div style={{
                    fontSize: '48px',
                    marginBottom: '20px'
                }}>
                    ✅
                </div>
                <h3 style={{
                    color: '#28a745',
                    margin: '0 0 12px 0',
                    fontSize: '24px'
                }}>
                    Message Sent Successfully!
                </h3>
                <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: '0 0 20px 0'
                }}>
                    Thank you for your message. We'll get back to you soon.
                </p>
                <button 
                    onClick={() => setSubmitted(false)}
                    style={{
                        padding: '12px 24px',
                        background: '#61dafb',
                        color: '#282c34',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    return (
        <div>
            <h3>Get in Touch</h3>
            <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '30px',
                fontSize: '16px',
                lineHeight: '1.6'
            }}>
                Have questions about Catalyst? Want to contribute? We'd love to hear from you!
            </p>
            
            <form onSubmit={handleSubmit} style={{
                display: 'grid',
                gap: '20px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '14px'
                            }}
                            placeholder="Your name"
                        />
                    </div>
                    
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '14px'
                            }}
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>
                
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        Subject *
                    </label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px'
                        }}
                        placeholder="What's this about?"
                    />
                </div>
                
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        Message *
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '14px',
                            resize: 'vertical'
                        }}
                        placeholder="Tell us more about your inquiry..."
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '14px 28px',
                        background: isSubmitting ? '#6c757d' : '#61dafb',
                        color: '#282c34',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s'
                    }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    )
}

export default LazyContactForm 