let Menu = function (file_manager, system_setting) {
    this.file_manager = file_manager;
    this.system_setting = system_setting;

    this.run_code = (event) => {
        this.file_manager.run_all_files();
    }

    this.show_add_button_dialog = (event) => {
        this.system_setting.showSystemSettings(event);
    }

    this.showSystemSettings = (event) => {
        this.system_setting.showSystemSettings(event);
    }

    this.__init__ = function () {
        this.button_run = document.querySelector('#button-run');
        this.button_add_button = document.querySelector('#button-add-button');
        this.button_system_setting = document.querySelector('#button-system-settings');

        // here connecting buttons.
        this.button_run.addEventListener('click', this.run_code);
        this.button_add_button.addEventListener('click', this.show_add_button_dialog);
        this.button_system_setting.addEventListener('click', this.showSystemSettings);

    }
    this.__init__();
}


export { Menu };