'use strict';

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
var time = document.querySelector('#time');
var timeout = document.querySelector('#timeout');
var typeHouse = document.querySelector('#type');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');


/* при нажатии на .pin добавить класс  .pin--active и должен показать .dialog
если класс .pin--active существует, то удалить его */

// удаление .pin--active
var deletePin = function () {
  for (var i =0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
};

// показывает элемент .dialog
var openDialog = function () {
  dialog.style.display = 'block';
};

// добавление .pin--active
var activatePin = function (pin) {
  deletePin();
  pin.classList.add('pin--active');
  openDialog();
};

/* при нажании на .dialog__close карточка должна скрыться
должен деактивироваться элемент .pin */

// скрывает элемент .dialog
var closeDialog = function () {
  dialog.style.display = 'none';
  deletePin();
};

var clickingPin = function (pin) {
  pin.addEventListener('click', function () {
    activatePin(pin);
  });
};

for (var i = 0; i < pins.length; i++) {
  clickingPin(pins[i]);
};

// синхронизация полей «время заезда» и «время выезда» 
var synchronizeTime = function () {
  timeout.value = time.value;
};

var synchronizeTimeout = function () {
  time.value = timeout.value;
};

// значение поля «Тип жилья» синхронизировано с минимальной ценой
var synchronizePrice = function () {
	if (typeHouse.value === 'flat') {
		price.min = 1000;
		price.placeholder = 1000;
	} 
	if (typeHouse.value === 'shack') {
		price.min = 0;
		price.placeholder = 0;
	} 
	if (typeHouse.value === 'castle') {
		price.min = 10000;
		price.placeholder = 10000;
	}
};

/*Количество комнат связано с количеством гостей: 
2 или 100 комнат — «для 3 гостей»; 1 комната — «не для гостей»
*/
var synchronizeGuests = function () {
	if (room_number.value === '1') {
		capacity.value = 0; 
	}
	if (room_number.value === '2') {
		capacity.value = 3;
	} 
	if (room_number.value === '100') {
		capacity.value = 3;
	}
};

dialogClose.addEventListener('click', closeDialog);
time.addEventListener('change', synchronizeTime);
timeout.addEventListener('change', synchronizeTimeout);
typeHouse.addEventListener('change', synchronizePrice);
roomNumber.addEventListener('change', synchronizeGuests);
