document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("review-form");
    const reviewsContainer = document.getElementById("reviews-container");
    const clearReviewsBtn = document.getElementById("clear-reviews");

    // Загрузка отзывов из localStorage
    const loadReviews = () => {
        console.log("Загрузка отзывов...");
        const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        console.log("Отзывы из localStorage:", savedReviews);

        reviewsContainer.innerHTML = ""; // Очищаем контейнер

        if (savedReviews.length > 0) {
            savedReviews.forEach((review) => addReviewToDOM(review));
        } else {
            reviewsContainer.innerHTML = `<p>Отзывов пока нет. Будьте первым!</p>`;
        }
    };

    // Сохранение нового отзыва в localStorage
    const saveReview = (review) => {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        console.log("Сохраненный отзыв:", review);
    };

    // Добавление отзыва на страницу
    const addReviewToDOM = ({ name, rating, comment }) => {
        // Удаляем текст "Отзывов пока нет", если он есть
        const placeholder = document.querySelector("#reviews-container p");
        if (placeholder && placeholder.textContent.includes("Отзывов пока нет")) {
            placeholder.remove();
        }

        // Создаём карточку отзыва
        const reviewCard = document.createElement("div");
        reviewCard.className = "review-card";

        reviewCard.innerHTML = `
            <h3 class="review-card__name">${name}</h3>
            <p class="review-card__rating">Оценка: ${rating}/5</p>
            <p class="review-card__comment">${comment}</p>
        `;

        // Добавляем карточку в контейнер
        reviewsContainer.appendChild(reviewCard);
    };

    // Обработчик отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Останавливаем стандартное поведение

        if (!document.querySelector(".review-card")) {
            reviewsContainer.innerHTML = ""; // Очищаем контейнер при первом отзыве
        }

        const name = document.getElementById("name").value.trim();
        const rating = document.getElementById("rating").value;
        const comment = document.getElementById("comment").value.trim();

        if (name && comment) {
            const review = { name, rating, comment };
            addReviewToDOM(review); // Добавляем отзыв на страницу
            saveReview(review); // Сохраняем в localStorage

            form.reset(); // Очищаем форму
            // reviewsContainer.innerHTML = ``;
            alert("Ваш отзыв добавлен!");
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    });

    // Очистка всех отзывов
    clearReviewsBtn.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите удалить все отзывы?")) {
            localStorage.removeItem("reviews");
            reviewsContainer.innerHTML = `<p>Все отзывы удалены.</p>`;
            console.log("Все отзывы удалены из localStorage.");
        }
    });

    // Загрузка отзывов при открытии страницы
    loadReviews();
});
