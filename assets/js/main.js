'use strict'

// function myFunction() {
// }
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         const dropdown = event.target.closest('.dropdown')
//         if (dropdown) {
//             const openDropdown = dropdown.querySelector('.dopdown-content')
//             if (openDropdown && openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show')
//             }
//         }
//     }
// }


function toggleDropdown(event, dropdownId) {

  document.querySelectorAll('.dropdown__menu').forEach(menu => {
    if (menu.id !== dropdownId) {
      menu.classList.remove('dropdown-show')
      menu.previousElementSibling.classList.remove('show')
    }
  })

  const dropdown = document.getElementById(dropdownId)
  const button = dropdown.previousElementSibling

  dropdown.classList.toggle('dropdown-show')
  button.classList.toggle('active')
}

// модальное окно
let modal = document.getElementById('modal')
function showModal() {
  modal.style.display = 'flex'
}
function hideModal() {
  modal.style.display = 'none'
}
// модальное окно

// табы
let btnss = document.querySelectorAll('.tab__btn')
let texts = document.querySelectorAll('.tab__slide')

btnss.forEach((tab__btn, index) => {
  tab__btn.onclick = () => {
    document.querySelector('.tab__btn.active').classList.remove('active')
    tab__btn.classList.add('active')
    document.querySelector('.tab__slide.active').classList.remove('active')
    texts[index].classList.add('active')
  }
}) 

// табы 



const spollersArray = document.querySelectorAll('[data-spollers]')
if (spollersArray.length > 0) {
    const spollersRegular = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return !item.dataset.spollers.split(',')[0]
    })
    if (spollersRegular.length > 0) {
        initSpollers(spollersRegular)
    }
    const spollersMedia = Array.from(spollersArray).filter(function (
        item,
        index,
        self
    ) {
        return item.dataset.spollers.split(',')[0]
    })

    if (spollersMedia.length > 0) {
        const breakpointsArray = []
        spollersMedia.forEach(item => {
            const breakpoint = {}
            const params = item.dataset.spollers
            const paramsArray = params.split(',')
            breakpoint.value = paramsArray[0]
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
            breakpoint.item = item
            breakpointsArray.push(breakpoint)
        })
        let mediaQuaries = breakpointsArray.map(function (item) {
            return (
                '(' +
                item.type +
                '-width: ' +
                item.value +
                'px),' +
                item.value +
                ',' +
                item.type
            )
        })

        mediaQuaries = mediaQuaries.filter(function (item, index, self) {
            return self.indexOf(item) === index
        })

        mediaQuaries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(',')
            const mediaBreakpoint = paramsArray[1]
            const mediaType = paramsArray[2]
            const matchMedia = window.matchMedia(paramsArray[0])
            console.log(matchMedia)

            //Объекты с нужными условиями
            const spollersArray = breakpointsArray.filter(function (item) {
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    return true
                }
            })

            matchMedia.addListener(function () {
                initSpollers(spollersArray, matchMedia)
            })
            initSpollers(spollersArray, matchMedia)
        })
    }

    function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach(spollersBlock => {
            spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
            if (matchMedia.matches || !matchMedia) {
                spollersBlock.classList.add('_init')
                initSpollerBody(spollersBlock)
                spollersBlock.addEventListener('click', setSpollerAction)
            } else {
                spollersBlock.classList.remove('_init')
                initSpollerBody(spollersBlock, false)
                spollersBlock.removeEventListener('click', setSpollerAction)
            }
        })
    }

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
        if (spollerTitles.length > 0) {
            spollerTitles.forEach(spollerTitle => {
                if (hideSpollerBody) {
                    spollerTitle.removeAttribute('tabindex')
                    if (!spollerTitle.classList.contains('_active')) {
                        spollerTitle.nextElementSibling.hidden = true
                    }
                } else {
                    spollerTitle.setAttribute('tabindex', '-1')
                    spollerTitle.nextElementSibling.hidden = false
                }
            })
        }
    }

    function setSpollerAction(e) {
        const el = e.target
        if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
            const spollerTitle = el.hasAttribute('data-spoller')
                ? el
                : el.closest('[data-spoller]')
            const spollersBlock = spollerTitle.closest('[data-spollers]')
            const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
                ? true
                : false
            if (!spollersBlock.querySelectorAll('._slide').length) {
                if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                    hideSpollerBody(spollersBlock)
                }
                spollerTitle.classList.toggle('_active')
                _slideToggle(spollerTitle.nextElementSibling, 500)
            }
            e.preventDefault()
        }
    }

    function hideSpollerBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
            '[data-spoller]._active'
        )
        if (spollerActiveTitle) {
            spollerActiveTitle.classList.remove('_active')
            _slideUp(spollerActiveTitle.nextElementSibling, 500)
        }
    }
}

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')

        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = target.offsetHeight + 'px'
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0
        window.setTimeout(() => {
            target.hidden = true
            target.style.removeProperty('height')
            target.style.removeProperty('padding-top')
            target.style.removeProperty('padding-bottom')
            target.style.removeProperty('margin-top')
            target.style.removeProperty('margin-bottom')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
        }, duration)
    }
}

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide')
        if (target.hidden) {
            target.hidden = false
        }
        let height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0
        target.offsetHeight

        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = height + 'px'
        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('_slide')
        }, duration)
    }
}
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration)
    } else {
        return _slideUp(target, duration)
    }
}
function toggleAccordion(button) {
  const item = button.closest('.integration__item');
  const content = item.querySelector('.integration__content');

  button.classList.toggle('integration__header_active');
  content.classList.toggle('integration__content_active');

  // Закрываем другие открытые элементы аккордеона
  const allItems = document.querySelectorAll('.integration__item');
  allItems.forEach(accordionItem => {
    if (accordionItem !== item) {
      accordionItem
        .querySelector('.integration__header')
        .classList.remove('integration__header_active');
      accordionItem
        .querySelector('.integration__content')
        .classList.remove('integration__content_active');
    }
  });
}