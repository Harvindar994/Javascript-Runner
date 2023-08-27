// here creating file manager.
let FileManager = function (log_manager) {
    this.log_manager = log_manager;

    this.close_add_file_dialog = (event) => {
        this.add_file_dialog.classList.add("hide");
    }

    this.show_add_file_dialog = (event) => {
        this.add_file_dialog.classList.remove("hide");
    }

    this.add_file = async () => {
        var file_name = this.add_file_dialog.querySelector("#add-file-name").value;

        var files = file_name.split(",");
        for (var file of files) {

            // let's create files.
            console.log(file.trim());

        }
    }

    this.__init__ = function () {
        try {
            this.add_file_dialog = document.querySelector(".add-file-dialog");

            this.button_add_file = document.querySelector("#button-add-file");
            this.button_show_files = document.querySelector("#button-show-files");
            this.button_close_dialog = document.querySelector("#close-add-file-dialog");
            this.button_continue = document.querySelector("#add-file-continue");

            // here connecting buttons.
            this.button_add_file.addEventListener("click", this.show_add_file_dialog);
            this.button_close_dialog.addEventListener("click", this.close_add_file_dialog);
            this.button_continue.addEventListener('click', this.add_file);
            this.add_file_dialog.querySelector("#add-file-name").addEventListener('keydown', (event) => {
                if (event.key == "Enter") {
                    this.add_file();
                }
            });

        } catch (error) {
            console.error(`->force:${error}`);
        }
    }

    this.__init__();
}

export { FileManager };