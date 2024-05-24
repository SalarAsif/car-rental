document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const submitButton = document.getElementById('submit');
    const slider = document.getElementById('slider');
    let rating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            rating = star.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.remove('selected');
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('selected');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const hoverValue = star.getAttribute('data-value');
            stars.forEach(s => {
                s.classList.remove('selected');
                if (s.getAttribute('data-value') <= hoverValue) {
                    s.classList.add('selected');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach(s => {
                s.classList.remove('selected');
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('selected');
                }
            });
        });
    });

    submitButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment || rating == 0) {
            alert('Please fill in all fields and select a rating.');
            return;
        }

        const review = { name, comment, rating };
        saveReview(review);
        displayReviews();
        nameInput.value = '';
        commentInput.value = '';
        stars.forEach(s => s.classList.remove('selected'));
        rating = 0;
    });

    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function displayReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        slider.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('slider-item');
            reviewElement.innerHTML = `
                <h3>${review.name}</h3>
                <p>Rating: ${'★'.repeat(review.rating)}</p>
                <p>${review.comment}</p>
            `;
            slider.appendChild(reviewElement);
        });
    }
    displayReviews();
});
