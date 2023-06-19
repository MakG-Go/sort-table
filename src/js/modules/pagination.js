import global from "./global.js"

export function pagination(arr) {

    let pageItems = document.querySelectorAll('.js-serch-item.js-no-serch');

    pageItems.forEach((item, key) => {

        let beginItem = global.pagination.limit * (global.pagination.thisPage - 1);

        let endItem = global.pagination.limit * global.pagination.thisPage - 1;

        key >= beginItem && key <= endItem ? item.classList.remove('disabled') : item.classList.add('disabled')

    })

    createBoolit(pageItems, global.pagination.limit, global.pagination.thisPage);
}

function createBoolit(items, lim, page) {

    let count = Math.ceil(items.length / lim);

    let boolitContainer = document.querySelector('.js-pagination-boolits')

    boolitContainer.innerHTML = ''

    for (let i = 1; i <= count; i++) {

        let newBoolit = document.createElement('li')

        newBoolit.classList.add('user-list__pagination', 'ml-10', 'ml-xs-10');

        newBoolit.innerHTML = `<span>${i}</span>`;

        i === page ? newBoolit.classList.add('active') : newBoolit.remove('active');

        newBoolit.setAttribute('data-page', i)

        newBoolit.addEventListener('click', () => {

            global.pagination.thisPage = i

            pagination();

        })

        boolitContainer.appendChild(newBoolit);

    }
}
