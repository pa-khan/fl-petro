let $html = document.querySelector('html'),
		$body = document.querySelector('body'),
		$wrap = document.querySelector('.wrap');

let mailPattern = /^[0-9a-z_-]+@[0-9a-z_-]+.[a-z]{2,5}$/i;



document.addEventListener('DOMContentLoaded', ()=>{
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
				thumbs: {
					swiper: imgsThumbs
				}
			});


		});
	}

	let $estimate = document.querySelector('.estimate__imgs-wrap');

	if ($estimate) {
		let arrowPrev = document.querySelector('.estimate__imgs-arrow.--prev'),
				arrowNext = document.querySelector('.estimate__imgs-arrow.--next');
		
		new Swiper($estimate, {
			loop: true,
			navigation: {
				prevEl: arrowPrev,
				nextEl: arrowNext
			}
		});
	}
});
