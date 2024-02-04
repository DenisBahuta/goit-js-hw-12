// 1. Импортируются необходимые библиотеки и файлы. Здесь мы импортируем библиотеки axios, iziToast, SimpleLightbox и файлы стилей для iziToast и SimpleLightbox\.

import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../src/img/icons.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// 2. Получаются ссылки на элементы DOM. Мы получаем ссылки на форму поиска, список изображений, элемент загрузки и кнопку "Next";

const formSearch = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const preload = document.querySelector('.loader');
const nextBtn = document.querySelector('#next-btn');

// 3. Устанавливаем начальное значение переменной `page` равным 0 и переменной `searchValue` равным `null`;

let page = 0;
let searchValue = null;

// 4. Создаем экземпляр галереи SimpleLightbox, передавая ей селектор для изображений и объект с опциями;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// 5. Определяем базовый URL для API и параметры поиска, используя объект URLSearchParams;

const BASE_URL = 'https://pixabay.com/api';
const searchParams = new URLSearchParams({
  key: '41838546-9d950a50e841202e6c289d2dd',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

// 6. Добавляем обработчики событий на форму поиска и кнопку "Next", вызывая соответствующие функции `handleSearch` и `nextPage`;

formSearch.addEventListener('submit', handleSearch);
nextBtn.addEventListener('click', nextPage);

// 7. Создается функция обработки события отправки формы поиска.
// Эта функция вызывается при отправке формы поиска. Она предотвращает стандартное поведение формы, получает значение поискового запроса из поля ввода, устанавливает начальные значения переменных `page` и `searchValue`, скрывает кнопку "Next", очищает список изображений и показывает элемент загрузки. Если поисковый запрос пустой, вызывается сообщение об ошибке с помощью библиотеки iziToast. Затем функция вызывает функцию `fetchImages`, чтобы получить изображения с API. Если ответ пустой, вызывается сообщение об ошибке. Если ответ не пустой, функция создает разметку галереи с помощью функции `createMarkup`, добавляет ее в список изображений, обновляет галерею SimpleLightbox, показывает кнопку "Next" и вызывает функцию `scrollBy`, чтобы прокрутить страницу к списку изображений. Наконец, функция скрывает элемент загрузки;

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.input.value;
  searchValue = searchQuery;
  page = 1;
  nextBtn.classList.add('is-hidden');

  imageList.innerHTML = '';

  if (!searchQuery.trim()) {
    iziToast.show({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#FFFFFF',
      backgroundColor: '#EF4040',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }

  preload.classList.remove('is-hidden');
  event.currentTarget.reset();

  try {
    const response = await fetchImages(searchQuery);
    if (response.hits.length === 0) {
      iziToast.show({
        iconUrl: icon,
        theme: 'dark',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        position: 'topRight',
        timeout: 5000,
      });
      return;
    }

    imageList.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    gallery.refresh();
    nextBtn.classList.remove('is-hidden');

    scrollBy();
  } catch (err) {
    handleError(err);
  } finally {
    preload.classList.add('is-hidden');
  }
}

// 8. Создается функция для запроса изображений через API. Эта функция использует библиотеку axios для отправки GET\-запроса к API с параметрами поиска и номером страницы\. Если запрос выполнен успешно, функция возвращает данные ответа. Если произошла ошибка, функция выбрасывает исключение;

async function fetchImages(value) {
  try {
    const res = await axios.get(
      `${BASE_URL}/?${searchParams}&q=${value}&page=${page}`
    );
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
}

// 9. Создается функция для создания разметки галереи. Эта функция принимает массив изображений и создает HTML-разметку галереи с помощью метода `map`. Затем функция объединяет элементы массива в строку с помощью метода `join` и возвращает эту строку;

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
           <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="container-additional-info">
        <div class="container-descr-inner"><p class="description">Likes</p><span class="description-value">${likes}</span></div>
        
        <div class="container-descr-inner"><p class="description">Views</p><span class="description-value">${views}</span></div>
        

        <div class="container-descr-inner"><p class="description">Comments</p><span class="description-value">${comments}</span></div>
        

        <div class="container-descr-inner"><p class="description">Downloads</p><span class="description-value">${downloads}</span></div>
        
        </div>
      </li>`
    )
    .join('');
}

// 10. Создается функция для обработки ошибок. Функция handleError выводит сообщение об ошибке в случае возникновения ошибки при выполнении запроса к API или при обработке данных. Также она удаляет обработчик события клика по кнопке "Next" и скрывает эту кнопку;

function handleError(err) {
  console.error(err);
  imageList.innerHTML = '';
  iziToast.show({
    iconUrl: icon,
    theme: 'dark',
    message: err.stack,
    messageSize: '16px',
    messageColor: 'white',
    backgroundColor: '#EF4040',
    position: 'topRight',
    timeout: 5000,
  });

  nextBtn.removeEventListener('click', nextPage);
  nextBtn.classList.add('is-hidden');
}
// 11. Функция nextPage увеличивает значение переменной page на 1 и вызывает функцию handleSearch для выполнения нового запроса к API с новой страницей. Если searchValue равно null, то функция завершается без выполнения запроса;

async function nextPage() {
  preload.classList.remove('is-hidden');
  nextBtn.classList.add('is-hidden');
  page += 1;

  try {
    const res = await axios.get(
      `${BASE_URL}/?${searchParams}&q=${searchValue}&page=${page}`
    );

    const dataImages = res.data;

    if (page * 40 >= dataImages.totalHits) {
      iziToast.show({
        title: '❕',
        theme: 'dark',
        message: "We're sorry, but you've reached the end of search results.",
        messageSize: '16px',
        messageColor: 'white',
        backgroundColor: '#4e75ff',
        position: 'topRight',
        timeout: 5000,
      });
      imageList.innerHTML += createMarkup(dataImages.hits);
      gallery.refresh();
      nextBtn.classList.add('is-hidden');

      scrollBy();

      return;
    }

    imageList.innerHTML += createMarkup(dataImages.hits);
    gallery.refresh();

    scrollBy();

    nextBtn.classList.remove('is-hidden');
  } catch (err) {
    handleError(err);
  } finally {
    preload.classList.add('is-hidden');
  }
}
// 12. Создается функция для прокрутки страницы к списку изображений. Эта функция использует метод `scrollBy` для прокрутки страницы к списку изображений с плавной анимацией;

function scrollBy() {
  window.scrollBy({
    top: 640,
    behavior: 'smooth',
  });
}
