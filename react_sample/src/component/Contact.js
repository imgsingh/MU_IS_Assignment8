import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phone: '',
        communicationMethods: [],
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData(prev => {
                const methods = [...prev.communicationMethods];
                if (checked) {
                    methods.push(value);
                } else {
                    const index = methods.indexOf(value);
                    if (index > -1) {
                        methods.splice(index, 1);
                    }
                }
                return { ...prev, communicationMethods: methods };
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        alert("thanks for saving");

        // try {
        //     const response = await axios.post('http://localhost:5000/api/contact', formData);
        //     setSubmitMessage(response.data.message);
        //     // Reset form after successful submission
        //     setFormData({
        //         firstName: '',
        //         lastName: '',
        //         gender: '',
        //         age: '',
        //         email: '',
        //         phone: '',
        //         communicationMethods: [],
        //         message: ''
        //     });
        // } catch (error) {
        //     setSubmitMessage(error.response?.data?.message || 'Error submitting form');
        // } finally {
        //     setIsSubmitting(false);
        // }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h1>Contact Us</h1>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="firstName">First Name: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="lastName">Last Name: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Gender:</label><br />
                <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                />
                <label htmlFor="male"> Male</label>

                <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    style={{ marginLeft: '10px' }}
                />
                <label htmlFor="female"> Female</label>

                <input
                    type="radio"
                    id="not_to_say"
                    name="gender"
                    value="not_to_say"
                    checked={formData.gender === 'not_to_say'}
                    onChange={handleChange}
                    style={{ marginLeft: '10px' }}
                />
                <label htmlFor="not_to_say"> Prefer Not to Say</label>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="age">Age:</label>
                <select
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                >
                    <option value="">Select Age Group</option>
                    <option value="below_18">Below 18</option>
                    <option value="18_25">18 to 25</option>
                    <option value="25_50">25 to 50</option>
                    <option value="50_above">Above 50</option>
                </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="email">Email: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="phone">Phone Number: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0987654321"
                    minLength="10"
                    maxLength="10"
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label>Mode of Communication:</label><br />
                <input
                    type="checkbox"
                    id="phoneComm"
                    name="communicationMethods"
                    value="Phone"
                    checked={formData.communicationMethods.includes('Phone')}
                    onChange={handleChange}
                />
                <label htmlFor="phoneComm"> Phone</label>

                <input
                    type="checkbox"
                    id="emailComm"
                    name="communicationMethods"
                    value="Email"
                    checked={formData.communicationMethods.includes('Email')}
                    onChange={handleChange}
                    style={{ marginLeft: '10px' }}
                />
                <label htmlFor="emailComm"> Email</label>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="message">Message: <span style={{ color: "red" }}>*</span></label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                ></textarea>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 20px' }}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            {submitMessage && (
                <div style={{ color: submitMessage.includes('Error') ? 'red' : 'green' }}>
                    {submitMessage}
                </div>
            )}
        </form>
    );
}

export default Contact;