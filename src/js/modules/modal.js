import global from "./global.js"

import { render, finder } from "./functions.js"

export function startModal(arr) {

    let bodyArea = document.querySelector("body")

    bodyArea.classList.add("modal-show");

    bodyArea.addEventListener('click', function (event) {

        event.stopImmediatePropagation()

        if (event.target.classList.contains('js-modal-agree')) {

            arr.splice(Number(global.users.deliteId), 1);

            if (global.flags.clear) {


                render(arr);
                bodyArea.classList.remove("modal-show");
                return finder(global.inputStorge);
            }
            else {

                render(arr);
                return bodyArea.classList.remove("modal-show");
            }

        }

        if (event.target.classList.contains('js-modal-disagree')) {
            bodyArea.classList.remove("modal-show");
        }

    });

}
