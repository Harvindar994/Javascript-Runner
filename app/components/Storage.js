import { AppName } from "./configuration.js";

let Storage = function () {

    this.set = (key, value) => {
        var data = JSON.parse(localStorage.getItem(AppName));
        data[key] = value;
        localStorage.setItem(AppName, JSON.stringify);
    }

    this.get = (key) => {
        var data = JSON.parse(localStorage.getItem(AppName));

        if (key in data) {
            return data[key];
        }
        return null;
    }

    this.__init__ = function () {
        if (localStorage.getItem(AppName) == null) {
            localStorage.setItem(
                AppName,
                JSON.stringify({ 'app': AppName })
            )
        }

    }
    this.__init__();
}


export { Storage };