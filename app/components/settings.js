let SystemSettings = function () {

    this.showSystemSettings = (event) => {
        this.systemSettings.classList.add("settings-show");
    }

    this.hideSystemSettings = (event) => {
        this.systemSettings.classList.remove("settings-show");
    }



    this.__init__ = function () {
        this.systemSettings = document.querySelector('.systemSettings');
        this.button_close = document.querySelector('#systemSettingsClose');

        // here connecting buttons.
        this.button_close.addEventListener('click', this.hideSystemSettings);

    }

    this.__init__();
}


export { SystemSettings }