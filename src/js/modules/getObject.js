
import { render, deliteUser } from "./functions.js"

export async function feetchData(url, arr) {

	try {

		const response = await fetch(url)
		const data = await response.json();
		arr = await arr.concat(data)

		arr.forEach((item, key) => {
			item['clear'] = key
		});

		render(arr)
	}
	catch (e) {
		console.error(e)
	}
	finally {
		console.log('Finaly')
	}

}


