
import { createTemplate } from "./createTemplate.js"

import { pagination } from "./pagination.js";

import { startModal } from "./modal.js";

import global from "./global.js"

export function render(users) {

   const userList = document.querySelector('.js-user-list');
   userList.innerHTML = '';

   !global.flags.sort ? sortUsers(users) : '';

   global.flags.sort = true;

   createTemplate(users);

   deliteUser(users)

   pagination()

}

function deliteUser(arr) {


   let btn = document.querySelectorAll('.js-removeUser');

   btn.forEach((item, key) => {

      item.addEventListener('click', (e) => {

         global.users.deliteId = item.id
         startModal(arr)
      })
   })
}

function sortUsers(arr) {

   let togleResult = true;

   let buttons = document.querySelectorAll('.js-sort-button');


   buttons.forEach((btn, ndx) => {

      btn.addEventListener('click', () => {

         let key = btn.dataset.sort;

         if (key === "registration_date") {

            if (!togleResult) {

               arr.sort((val1, val2) => {
                  let first = new Date(val1[key]);
                  let second = new Date(val2[key]);
                  return first > second ? 1 : -1;
               })

            }

            else {
               arr.sort((val1, val2) => {
                  let first = new Date(val1[key]);
                  let second = new Date(val2[key]);
                  return first < second ? 1 : -1
               })

            }

            togleResult = !togleResult

            if (global.flags.clear) {
               render(arr);
               return finder(global.inputStorge);
            }
            else {
               return render(arr);
            }
         }

         if (key === "rating") {

            if (!togleResult) {
               arr.sort((val1, val2) => val1[key] > val2[key] ? 1 : -1);
            }
            else {
               arr.sort((val1, val2) => val1[key] < val2[key] ? 1 : -1);
            }

            togleResult = !togleResult;

            if (global.flags.clear) {
               render(arr);
               return finder(global.inputStorge);
            }
            else {
               return render(arr);
            }

         }

         if (key === 'clear') {

            global.flags.clear = false;
            arr.sort((val1, val2) => val1[key] > val2[key] ? 1 : -1);
            render(arr);
            document.querySelector('.js-serch-input').value = '';

            return document.querySelectorAll('.js-serch-item').forEach(item => {
               item.classList.remove('hiden');
            })
         }

      })
   })
}

export function finder(inpEvent) {

   let valueInput = global.inputStorge

   document.querySelectorAll('.js-serch-item').forEach(item => {

      let names = item.querySelector('.js-username').innerHTML.toLocaleLowerCase();
      let emails = item.querySelector('.js-email').innerHTML.toLocaleLowerCase();
      let sercher = names + emails;

      if (sercher.search(valueInput) == -1) {

         item.classList.add('hiden');
         item.classList.remove('js-no-serch');
      }
      else {

         item.classList.remove('hiden');
         item.classList.add('js-no-serch');
      }

      pagination()
   })
}


const serchInput = document.querySelector('.js-serch-input');

serchInput.addEventListener('input', (e) => {

   global.inputStorge = e.target.value.toLocaleLowerCase().trim();

   global.flags.clear = true;

   return finder(global.inputStorge);

})

serchInput.addEventListener('keyup', (e) => {

   global.flags.search = false

})

serchInput.addEventListener('keydown', (e) => {

   global.flags.search = true

   if (global.flags.search) {
      global.pagination.thisPage = 1
      pagination();
   }

})


