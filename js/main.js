document.querySelectorAll('.formCalendar').forEach((item) => {
    const today = new Date();
    const todayFormatted = today.toLocaleDateString('ru-RU');
    const input = item.parentElement.querySelector('input');
    input.value = todayFormatted;
    item.innerHTML = todayFormatted;

    const calendar = datepicker(item, {
        minDate: today,
        dateSelected: today,
        customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        customMonths: ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        onSelect: (instance, date) => {
            const selectedDate = new Date(date).toLocaleDateString('ru-RU');
            input.value = selectedDate;
            item.innerHTML = selectedDate;
        },
    });
});

const selectActiveClass = 'formSelect_active';
const selectValueSelectedClass = 'formSelectValue_selected';
document.querySelectorAll('.formSelect').forEach((item) => {
    const input = item.querySelector('.formInput');
    const value = item.querySelectorAll('.formSelectValue');
    const active = item.querySelector('.formSelectActive');
    const hidden = item.querySelector('.formSelectHidden');

    input.addEventListener('click', () => {
        item.classList.add(selectActiveClass);
    }, true);

    value.forEach((valueItem) => {
        valueItem.addEventListener('click', (e) => {
            value.forEach((valueItem) => {
                valueItem.classList.remove(selectValueSelectedClass);
            });
            e.target.classList.add(selectValueSelectedClass);
            const newValue = e.target.innerHTML;
            active.innerHTML = newValue;
            hidden.value = newValue;
            item.classList.remove(selectActiveClass);
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

document.querySelectorAll('.scrollTo').forEach((link) => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').substring(1);
        const element = document.getElementById(id);
        element.scrollIntoView({
            behavior: 'smooth',
        });
        e.preventDefault();
    });
});

const buttonActiveClass = 'button_active';
const catalogItemSelectedClass = 'catalogItem_selected';
const catalogItems = document.querySelectorAll('.catalogItem');
document.querySelectorAll('.catalogFilterButton').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.parentElement.querySelectorAll('.catalogFilterButton').forEach((button) => {
            button.classList.remove(buttonActiveClass);
        });
        e.target.classList.add(buttonActiveClass);
        const filter = e.target.dataset.filter;
        catalogItems.forEach((item) => {
            const filters = item.dataset.filter;
            if (filter == 'all' || !filters.includes(filter)) {
                item.classList.remove(catalogItemSelectedClass);
            } else {
                item.classList.add(catalogItemSelectedClass);
            }
        });
    });
});

Inputmask().mask(document.querySelectorAll('[data-inputmask]'));

const formSended = 'form_sended';
function sendOrderForm(form) {
    const data = new FormData(form);
    fetch('/order/', {
        method: 'post',
        body: data,
    })
        .then((response) => (response.json()))
        .then((data) => {
            form.classList.add(formSended);
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach((input) => {
                input.value = '';
            });
            setTimeout(() => {
                form.classList.remove(formSended);
            }, 3000);
        });
    return false;
}
document.querySelectorAll('.form [data-validity]').forEach((input) => {
  input.addEventListener('input', () => {
    input.setCustomValidity('');
  });
  input.addEventListener('invalid', () => {
    input.setCustomValidity(input.dataset.validity);
  });
});
