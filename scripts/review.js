document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");
    const reviewsContainer = document.getElementById("reviews-container");
    const clearReviewsBtn = document.getElementById("clear-reviews");

    const loadReviews = () => {
        console.log("Загрузка отзывов...");
        const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        console.log("Отзывы из localStorage:", savedReviews);

        reviewsContainer.innerHTML = "";

        if (savedReviews.length > 0) {
            savedReviews.forEach((review) => addReviewToDOM(review));
        } else {
            reviewsContainer.innerHTML = `<p>Отзывов пока нет. Будьте первым!</p>`;
        }
    };

    const saveReview = (review) => {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        console.log("Сохраненный отзыв:", review);
    };

    const addReviewToDOM = ({ name, rating, comment }) => {
        const placeholder = document.querySelector("#reviews-container p");
        if (placeholder && placeholder.textContent.includes("Отзывов пока нет")) {
            placeholder.remove();
        }
    
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
    
        const nameElement = document.createElement('h3');
        nameElement.className = 'review-card__name';
        nameElement.textContent = name;
    
        const ratingElement = document.createElement('p');
        ratingElement.className = 'review-card__rating';
        ratingElement.textContent = `Оценка: ${rating}/5`;
    
        const commentElement = document.createElement('p');
        commentElement.className = 'review-card__comment';
        commentElement.textContent = comment;
    
        reviewCard.appendChild(nameElement);
        reviewCard.appendChild(ratingElement);
        reviewCard.appendChild(commentElement);
    
        reviewsContainer.appendChild(reviewCard);
    };


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!document.querySelector(".review-card")) {
            reviewsContainer.innerHTML = "";
        }

        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value.trim();

        if (name && comment) {
            const review = { name, rating, comment };
            addReviewToDOM(review);
            saveReview(review);

            form.reset();
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    });

    clearReviewsBtn.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите удалить все отзывы?")) {
            localStorage.removeItem("reviews");
            reviewsContainer.innerHTML = `<p>Все отзывы удалены.</p>`;
            console.log("Все отзывы удалены из localStorage.");
        }
    });

    loadReviews();
});
