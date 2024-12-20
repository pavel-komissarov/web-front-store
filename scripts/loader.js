document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.querySelector('#data-container');
    const preloader = document.querySelector('#preloader');

    const showPreloader = () => {
        preloader.style.display = 'block';
    };

    const hidePreloader = () => {
        preloader.style.display = 'none';
    };

    const showError = (message) => {
        hidePreloader();
        const errorElement = document.createElement('p');
        errorElement.className = 'error';
        errorElement.textContent = `⚠ ${message}`;
        dataContainer.appendChild(errorElement);
    };

    const fetchData = async () => {
        showPreloader();

        try {
            const randomFilter = Math.random() > 0.5 ? 'id_gte=100' : 'id_lte=200';
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?${randomFilter}&_limit=5`);

            if (!response.ok) {
                showError(`HTTP Error: ${response.status}`);
                return;
            }

            const data = await response.json();
            renderData(data);
        } catch (error) {
            console.error(error);
            showError('Что-то пошло не так. Проверьте подключение к сети.');
        } finally {
            hidePreloader();
        }
    };

    const renderData = (data) => {
        data.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';

            const titleElement = document.createElement('h3');
            titleElement.textContent = comment.name;
            commentElement.appendChild(titleElement);

            const emailElement = document.createElement('p');
            emailElement.innerHTML = `<strong>Email:</strong> ${comment.email}`;
            commentElement.appendChild(emailElement);

            const bodyElement = document.createElement('p');
            bodyElement.textContent = comment.body;
            commentElement.appendChild(bodyElement);

            dataContainer.appendChild(commentElement);
        });
    };

    fetchData();
});
