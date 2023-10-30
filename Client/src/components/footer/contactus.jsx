import { useEffect, useState } from 'react'
function Contactus(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Contact form data:', { name, email, message });
    };

return(
<>
<div className="contact-us">
      {/* <p>If you have any questions, comments, or inquiries, feel free to get in touch with us. We're here to assist you.</p>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>
          <strong>Address:</strong> 411 Hinjewadi, Pune, Maharashtra, India<br />
          <strong>Email:</strong> contactus@eshopping.com<br />
          <strong>Phone:</strong> +91-8780193594
        </p>
      </div> */}
      <div id="contactUs" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Contact Us</h1>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById('contactUs').hidden = true;
                      // Add code to show your main content or any other components.
                    }}
                    className="btn btn-success"
                  >
                    Back
                  </button>&nbsp; &nbsp;
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
    </div>
</>
);
}

export default Contactus