document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.course-validation');
  if (!form) return; // exit if form not found

  form.addEventListener('submit', function (e) {
    const professional = form.querySelector('input[name="professional"]:checked');
    const open = form.querySelector('input[name="open"]:checked');

    // Reset previous warnings
    form.querySelectorAll('.course-card').forEach(card => {
      card.classList.remove('border-danger', 'shadow-danger');
    });
    form.querySelectorAll('.validation-text').forEach(el => el.remove());

    let isValid = true;

    // Validate Professional elective
    if (!professional) {
      const section = form.querySelector('input[name="professional"]').closest('section');
      const cardList = section.querySelectorAll('.course-card');
      cardList.forEach(card => card.classList.add('border-danger', 'shadow-danger'));

      const warning = document.createElement('div');
      warning.className = 'text-danger mt-2 validation-text fw-semibold small';
      warning.innerHTML = '⚠️ Please select one <strong>Professional Elective</strong>.';
      section.appendChild(warning);

      isValid = false;
    }

    // Validate Open elective
    if (!open) {
      const section = form.querySelector('input[name="open"]').closest('section');
      const cardList = section.querySelectorAll('.course-card');
      cardList.forEach(card => card.classList.add('border-danger', 'shadow-danger'));

      const warning = document.createElement('div');
      warning.className = 'text-danger mt-2 validation-text fw-semibold small';
      warning.innerHTML = '⚠️ Please select one <strong>Open Elective</strong>.';
      section.appendChild(warning);

      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Add hover and checked highlight styles
  form.querySelectorAll('.radio-card input').forEach(input => {
    input.addEventListener('change', () => {
      const group = input.name;
      form.querySelectorAll(`input[name="${group}"] + .card`).forEach(card => {
        card.classList.remove('border-warning', 'shadow-warning');
      });
      input.nextElementSibling.classList.add('border-warning', 'shadow-warning');
    });
  });
});
