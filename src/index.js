import $ from './jQuery'
import App from './App'

const app = new App()
const arriveOptions = { onceOnly: true, existing: true }
$(document).arrive('.drawer[data-drawer="compose"]', arriveOptions, app.init)
