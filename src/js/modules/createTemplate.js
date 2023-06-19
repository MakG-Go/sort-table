

export function generateUser(user, id) {

    return `
    <div class="col-lg-12 col-xs-6 js-serch-item js-no-serch">
        <div class="row user-list__item">
            <div class="col-lg-3 col-xs-6">
            <span class="text-m hide-lg">Имя пользователя: </span> <span class="text-m text-bold text-blue js-username">${user.username}</span>
            </div>
            <div class="col-lg-3 col-xs-6">
            <span class="text-m hide-lg">E-mail: </span><span class="text-m text-grey-1 js-email">${user.email}</span>
            </div>
            <div class="col-lg-3 col-xs-6">
            <span class="text-m hide-lg">Дата регистрации: </span><span class="text-m text-grey-1">${user.registration_date}</span>
            </div>
            <div class="col-lg-3 col-xs-6 flex">
            <span class="text-m hide-lg">Рейтинг: </span><span class="text-m text-grey-1">${user.rating}</span>
                <button class="btn btn-delite js-removeUser" id="${id}">&#x2716;</button>
            </div>
        </div>
    </div> 
	`
}

export function createTemplate(users) {

    const userList = document.querySelector('.js-user-list')

    userList.innerHTML = ''

    if (users.length) {
        users.forEach((user, key) => {
            userList.innerHTML += generateUser(user, key)
        });
    }
}