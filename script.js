document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('load-button');
    const photoContainer = document.getElementById('photo-container');
    const loader = document.getElementById('loader');

    // Добавляем обработчик события на кнопку
    loadButton.addEventListener('click', async () => {
        // Показываем лоадер и скрываем кнопку
        loader.style.display = 'block';
        loadButton.style.display = 'none';

        try {
            // Делаем запрос к API для получения фотографий котов
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
            if (!response.ok) {
                throw new Error('Запрос не удался');
            }
            // Парсим ответ в формат JSON
            const photos = await response.json();
            // Отображаем полученные фотографии
            displayPhotos(photos);
        } catch (error) {
            // Ловим и выводим ошибки в консоль и алерт
            console.error('Ошибка запроса:', error);
            alert('Кошки спят, попробуйте позже.');
        } finally {
            // Скрываем лоадер и показываем кнопку
            loader.style.display = 'none';
            loadButton.style.display = 'block';
        }
    });

    // Функция для отображения фотографий в контейнере
    function displayPhotos(photos) {
        // Очищаем контейнер с фотографиями
        photoContainer.innerHTML = '';
        // Проходимся по каждому фото и добавляем его в контейнер
        photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = 'A cute cat';
            img.className = 'gallery__photo';
            photoContainer.appendChild(img);
        });
    }
});
