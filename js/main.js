document.querySelectorAll('.formCalendar').forEach((item) => {
    const today = new Date();
    const input = item.querySelector('input');
    input.value = today.toLocaleDateString('ru-RU');

    const calendar = datepicker(item, {
        customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        customMonths: ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        onSelect: (instance, date) => {
            input.value = new Date(date).toLocaleDateString('ru-RU');
        },
    });
});

document.querySelectorAll('.formSelect').forEach((item) => {
    const input = item.querySelector('.formInput');
    const value = item.querySelectorAll('.formSelectValue');
    const active = item.querySelector('.formSelectActive');
    const hidden = item.querySelector('.formSelectHidden');
    
    input.addEventListener('click', () => {
        item.classList.add('formSelect_active');
    }, true);

    value.forEach((valueItem) => {
        valueItem.addEventListener('click', (e) => {
            const newValue = e.target.innerHTML;
            active.innerHTML = newValue;
            hidden.value = newValue;
            item.classList.remove('formSelect_active');
        }, false);
    });
});

const menu = document.querySelector('.menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 198) {
        menu.classList.add('menu_fixed');
    } else {
        menu.classList.remove('menu_fixed');
    }
});

document.querySelectorAll('.menuLink').forEach((link) => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').substring(1);
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: 'smooth',
        });
        e.preventDefault();
    });
});