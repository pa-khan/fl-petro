function Select(element) {
	let $block = element.querySelector('.select__block-wrap'),
			$items  = element.querySelectorAll('.select__item'),
			itemSelectedInner = element?.querySelector('.select__item.--checked .select__item-wrap').innerHTML;

	$block.innerHTML = itemSelectedInner;
	$items.forEach(($item)=>{
		$item.addEventListener('click', ()=>{
			$block.innerHTML = $item.innerHTML;
		});
	});

	element.addEventListener('click', ()=>{
		element.classList.toggle('--open');
	})
}

let $selects = document.querySelectorAll('.select');

$selects.forEach(($select, i)=>{
	new Select($select);
});