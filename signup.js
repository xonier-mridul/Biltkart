const form2 = document.getElementById('myForms');
const submitBtn2 = document.getElementById('submitBtns');

form2.addEventListener('input', () => {
  const isFormValid = form2.checkValidity();
  submitBtn2.disabled = !isFormValid;
});
