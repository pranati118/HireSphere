document.getElementById('submitForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const companyName = document.getElementById('companyName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const zipcode = document.getElementById('zipcode').value;
    const state = document.getElementById('state').value;
  
    const data = {
      companyName,
      contactNumber,
      email,
      address,
      zipcode,
      state
    };
  
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Data submitted successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting data');
    });
  });
  