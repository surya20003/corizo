// Get pay now button
const payNowBtn = document.querySelector('.pay-now-btn');

// Get payment method radio buttons
const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');

// Get payment details inputs
const cardNumberInput = document.querySelector('input[name="card-number"]');
const expirationDateInput = document.querySelector('input[name="expiration-date"]');
const cvvInput = document.querySelector('input[name="cvv"]');
const nameOnCardInput = document.querySelector('input[name="name-on-card"]');

// Add event listener to pay now button
payNowBtn.addEventListener('click', () => {
  // Check if payment method is selected
  let selectedPaymentMethod = null;
  paymentMethodRadios.forEach((radio) => {
    if (radio.checked) {
      selectedPaymentMethod = radio.value;
    }
  });

  if (!selectedPaymentMethod) {
    alert('Please select a payment method');
    return;
  }

  // Validate payment details
  if (selectedPaymentMethod === 'credit-card') {
    if (
      !cardNumberInput.value ||
      !expirationDateInput.value ||
      !cvvInput.value ||
      !nameOnCardInput.value
    ) {
      alert('Please fill in all payment details');
      return;
    }
  }

  // Simulate payment processing
  setTimeout(() => {
    alert('Payment processed successfully!');
  }, 2000);
});

// Add event listener to payment method radio buttons
paymentMethodRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    // Toggle payment details section
    const paymentDetailsSection = document.querySelector('.payment-details');
    if (radio.value === 'credit-card') {
      paymentDetailsSection.style.display = 'block';
    } else {
      paymentDetailsSection.style.display = 'none';
    }
  });
});