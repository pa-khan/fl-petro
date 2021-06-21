let $html = document.querySelector('html'),
		$body = document.querySelector('body'),
		$wrap = document.querySelector('.wrap');

let mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;



document.addEventListener('DOMContentLoaded', ()=>{
	let $navToggle = document.querySelector('.ntoggle'),
			$header    = document.querySelector('.header');

	$navToggle.addEventListener('click', ()=>{
		$navToggle.classList.toggle('--toggle');
		$header.classList.toggle('--toggle');

		$html.classList.toggle('overflow-disable');
		$body.classList.toggle('overflow-disable');
		$wrap.classList.toggle('overflow-disable');
	});

	let $inputs = document.querySelectorAll('.input');

	if ($inputs) {
		$inputs.forEach(($input)=>{
			let $area = $input.querySelector('.input__area');

			if ($area.value != '') {
				$input.classList.add('--filled');
			}

			$area.addEventListener('input', ()=>{
				if ($area.value != '') {
					$input.classList.add('--filled');
				}				
			});

			$area.addEventListener('focusin', ()=>{
				$input.classList.add('--focus');
			});

			$area.addEventListener('focusout', ()=>{
				$input.classList.remove('--focus');
			});

		});
	}


	let $files = document.querySelectorAll('.file');
	
	if ($files) {
		$files.forEach(($file)=>{
			let $input   = $file.querySelector('.file__input'),
					$message = $file.querySelector('.file__message');

			$input.addEventListener('change', (event)=>{
				let file = event.target.files[0];

				$message.innerText = file.name; 
			})
		});
	}



	function MobileSlider(options, $el, $list, $items) {
		$slider = document.querySelector($el);
		if ($slider) {
			let sliderSlider,
					$sliderList  = document.querySelector($list),
					$sliderItems = document.querySelectorAll($items);

			function initSlider(){
				if ($wrap.offsetWidth <= 768) {
					if (!sliderSlider) {
						$slider.classList.add('swiper-container');
						$sliderList.classList.add('swiper-wrapper', 'nowrap');
						$sliderItems.forEach(($sliderItem)=>{
							$sliderItem.classList.add('swiper-slide');
						});

						sliderSlider = new Swiper($slider, options);
					}
				} else {
					$slider.classList.remove('swiper-container');
					$sliderList.classList.remove('swiper-wrapper', 'nowrap');
					$sliderList.removeAttribute('style');
					$sliderItems.forEach(($sliderItem)=>{
						$sliderItem.removeAttribute('style');
						$sliderItem.classList.remove('swiper-slide');
					});

					sliderSlider = null;
				}
			}

			initSlider();

			window.addEventListener('resize', ()=>{
				initSlider();
			});
		}

	}

	new MobileSlider({
		slidesPerView: 1,
		autoHeight: true
	}, '.price__slider', '.price__list', '.price__item');

	new MobileSlider({
		slidesPerView: 'auto',
		autoHeight: true
	}, '.allinc__slider', '.allinc__list', '.allinc__item');

	new MobileSlider({
		slidesPerView: 1,
		autoHeight: true,
		spaceBetween: 15
	}, '.objects__slider', '.objects__list', '.objects__item');

	new MobileSlider({
		slidesPerView: 1,
		spaceBetween: 15
	}, '.examples__slider', '.examples__list', '.examples__item');

	new MobileSlider({
		slidesPerView: 'auto',
		spaceBetween: 15
	}, '.youtube__slider', '.youtube__list', '.youtube__item');




	let $calc = document.querySelector('.calc');
	if ($calc) {
		function Calc(){
			let calc = {
				class: {
					current: '--current',
					active: '--active',
					disabled: '--disabled',
					hidden: '--hidden',
					statusDiv: 'status__item'
				},
				$title: $calc.querySelector('.calc__title'),
				$subtitle: $calc.querySelector('.calc__subtitle'),
				$desc: $calc.querySelector('.calc__desc'),
				$items: $calc.querySelectorAll('.calc__item'),
				$status: $calc.querySelector('.calc__status'),
				$btns: $calc.querySelector('.calc__controls'),
				$btnPrev: $calc.querySelector('.calc__control.--prev'),
				$btnNext: $calc.querySelector('.calc__control.--next'),
				current: {}
			};

			calc.$items.forEach(($item, i)=>{
				let $statusDiv = document.createElement('div');

				$statusDiv.className = calc.class.statusDiv;

				if (i == 0) {
					$statusDiv.classList.add(calc.class.current, calc.class.active);
					$item.classList.add(calc.class.current);

					calc.current.$element = $item;
					calc.current.$status  = $statusDiv;  
				}

				calc.$status.append($statusDiv);
			});

			calc.$btnPrev.addEventListener('click', ()=>{
				let prevElement = calc.current.$element.previousElementSibling,
						prevStatus  = calc.current.$status.previousElementSibling
				if (prevElement && prevStatus) {
					calc.current.$element.classList.remove(calc.class.current);
					calc.current.$status.classList.remove(calc.class.current, calc.class.active);

					prevElement.classList.add(calc.class.current);
					prevStatus.classList.add(calc.class.current, calc.class.active);
					
					calc.current.$element = prevElement;
					calc.current.$status = prevStatus;

					if (!calc.current.$element.previousElementSibling) {
						calc.$btnPrev.classList.add(calc.class.disabled);
					}
				}
			});

			calc.$btnNext.addEventListener('click', ()=>{
				let nextElement = calc.current.$element.nextElementSibling,
						nextStatus  = calc.current.$status.nextElementSibling
				if (nextElement && nextStatus) {
					calc.current.$element.classList.remove(calc.class.current);
					calc.current.$status.classList.remove(calc.class.current);

					nextElement.classList.add(calc.class.current);
					nextStatus.classList.add(calc.class.current, calc.class.active);
					
					calc.current.$element = nextElement;
					calc.current.$status = nextStatus;

					calc.$btnPrev.classList.remove(calc.class.disabled);

					if (calc.current.$element.classList.contains('--finally')) {
						calc.$title.innerHTML = '<strong>СИСТЕМА РАССЧИТАЛА <br>СТОИМОСТЬ ОШТУКАТУРИВАНИЯ <br>В 3-х вариантах по вашим <br>параметрам</strong>';
						calc.$subtitle.classList.add(calc.class.hidden);
						calc.$desc.classList.add(calc.class.hidden);
						calc.$status.classList.add(calc.class.hidden);
						calc.$btns.classList.add(calc.class.hidden);
					}
				}
			});
		}

		new Calc();
	}

	let $objects = document.querySelectorAll('.objects__item');

	if ($objects) {
		$objects.forEach(($object)=>{
			let $imgsList   = $object.querySelector('.imgs__list-wrap'),
					$imgsThumbs = $object.querySelector('.imgs__thumbs-wrap'),
					imgsList,
					imgsThumbs;

			imgsThumbs = new Swiper($imgsThumbs, {
				slidesPerView: 4,
				clickable: true,
				spaceBetween: 20
			});

			imgsList = new Swiper($imgsList, {
				navigation: {
					nextEl: $object.querySelector('.imgs__arrow.--next'),
					prevEl: $object.querySelector('.imgs__arrow.--prev')
				},
				thumbs: {
					swiper: imgsThumbs
				}
			});


		});
	}

	let $estimate = document.querySelector('.estimate__imgs-wrap');

	if ($estimate) {
		let $arrowPrev = document.querySelector('.estimate__imgs-arrow.--prev'),
				$arrowNext = document.querySelector('.estimate__imgs-arrow.--next');
		
		new Swiper($estimate, {
			loop: true,
			navigation: {
				prevEl: $arrowPrev,
				nextEl: $arrowNext
			}
		});
	}

	let $reviews = document.querySelectorAll('.reviews__list');

	if ($reviews) {
		$reviews.forEach(($review)=>{
			let $arrowPrev = $review.querySelector('.reviews__arrow.--prev'),
					$arrowNext = $review.querySelector('.reviews__arrow.--next'),
					$slider    = $review.querySelector('.reviews__list-case');

			new Swiper($slider, {
				loop: true,
				slidesPerView: 2,
				navigation: {
					prevEl: $arrowPrev,
					nextEl: $arrowNext
				},
				breakpoints: {
					0: {
						loop: false,
						slidesPerView: 1,
						adaptiveHeight: true
					},
					768: {
						loop: true
					},
					992: {
						slidesPerView: 2,
						adaptiveHeight: false
					},
				}
			})

		});
	}

	let $office = document.querySelector('.office');

	if ($office) {
		let $arrowPrev = $office.querySelector('.office__arrow.--prev'),
				$arrowNext = $office.querySelector('.office__arrow.--next'),
				$slider    = $office.querySelector('.office__slider');

		new Swiper($slider, {
			loop: true,
			spaceBetween: 172,
			navigation: {
				prevEl: $arrowPrev,
				nextEl: $arrowNext
			},
			breakpoints: {
				320: {
					spaceBetween: 15,
				},
				768: {
					spaceBetween: 172,
				}
			} 
		})
	}

	let $map = document.querySelector('#map');

	if ($map && ymaps) {
		ymaps.ready(mapInit);

		function mapInit() {
			let mapLng  = parseFloat($map.getAttribute('data-lng')),
					mapLat  = parseFloat($map.getAttribute('data-lat'));

			let ymap = new ymaps.Map($map, {
				center: [mapLng, mapLat],
				zoom: 15,
				controls: []
			});

			let placemark = new ymaps.Placemark([mapLng, mapLat], {}, {
				iconLayout: 'default#image'
			});

			ymap.geoObjects.add(placemark);
			ymap.behaviors.disable('scrollZoom')
		}
	}

	let $work = document.querySelector('.work');

	if ($work) {
		let $sliderList   = $work.querySelector('.w-sli__list-wrap'),
				$sliderThumbs = $work.querySelector('.w-sli__thumbs-wrap'),
				$arrowPrev    = $work.querySelector('.w-sli__arrow.--prev'),
				$arrowNext    = $work.querySelector('.w-sli__arrow.--next'),
				imgsThumbs,
				imgsList;

		
		imgsThumbs = new Swiper($sliderThumbs, {
			slidesPerView: 4,
			clickable: true,
			spaceBetween: 30,
		});

		imgsList = new Swiper($sliderList, {
			navigation: {
				prevEl: $arrowPrev,
				nextEl: $arrowNext
			},
			thumbs: {
				swiper: imgsThumbs
			}
		});

	}
});
