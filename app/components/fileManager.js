import { Storage } from './Storage.js';

// here creating file manager.
let FileManager = function (log_manager) {
    this.log_manager = log_manager;
    this.files = {};
    this.active_stack = {};
    this.file_labels = {};
    this.active_stack_labels = {};
    this.base_path = "../Learning";

    this.close_add_file_dialog = () => {
        this.add_file_dialog.classList.add("hide");
    }

    this.show_add_file_dialog = () => {
        this.add_file_dialog.classList.remove("hide");
    }

    this.add_file = async () => {
        var file_name = this.add_file_dialog.querySelector("#add-file-name").value;
        var active_status = this.add_file_dialog.querySelector("#isActive").checked;

        var files = this.storage.get("files");
        if (files == null) {
            files = {};
        }

        var files_names = file_name.split(",");
        for (var file of files_names) {
            file = file.trim();
            if (!file.endsWith('.js')) {
                file += ".js";
            }

            // let's create files.
            if (file in files) {
                console.error(`->force:'${file}' this file is already there.`);
            }
            else {
                this.add_file_label(file.trim(), active_status);
                files[file] = active_status;
            }
        }
        this.storage.set("files", files);
        this.files = files;
        this.add_file_dialog.querySelector("#add-file-name").value = '';

        // her closing the file dialog box.
        this.close_add_file_dialog();
    }

    this.add_file_label = (name, status) => {
        var file_label = document.createElement("div");
        file_label.classList.add('file');
        file_label.setAttribute("name", name);
        file_label.innerHTML = `
        <div class="status ${status ? 'status-active' : ''}">
            <i class="fa-brands fa-square-js"></i>
        </div>
        <div class="name">${name}</div>
        <div class="remove" name="${name}">
            <i class="fa-solid fa-minus"></i>
        </div>
        `;

        // here event handler.
        file_label.addEventListener("click", this.on_click_file_explorer_label);
        file_label.querySelector(".remove").addEventListener("click", this.on_click_file_explorer_label_remove);
        this.file_explorer_file.append(file_label);
        this.file_labels[name] = file_label;

        // here adding in active stack.
        if (status) {
            this.add_in_active_stack(name);
        }
    };

    this.add_active_stack_label = (file) => {
        var active_satck = this.active_file_stack.querySelector(".activefiles");

        var label = document.createElement("div");
        label.classList.add("file");
        label.innerHTML = `
            <div class="run" name="${file}"><i class="fa-solid fa-play"></i></div>
            <div class="name">${file}</div>
            <div class="close" name="${file}"><i class="fa-solid fa-xmark"></i></div>
        `;

        // connecting buttons.
        label.querySelector(".run").addEventListener("click", (event) => {
            this.runJs(event.currentTarget.getAttribute("name"));
        })

        label.querySelector(".close").addEventListener("click", (event) => {
            this.active_stack_labels[event.currentTarget.getAttribute("name")].remove();
            this.deactive_file(event.currentTarget.getAttribute("name"));
        })

        this.active_stack_labels[file] = label;
        active_satck.append(label);
    };


    this.activate_file = (file) => {
        var files = this.storage.get("files");
        try {
            files[file] = true;
            this.storage.set("files", files);
            this.files = files;
            this.add_in_active_stack(file);
        } catch (error) {
            console.error(`->force:${error}`);
        }
    };

    this.deactive_file = (file) => {
        var files = this.storage.get("files");
        try {
            files[file] = false;
            this.storage.set("files", files);
            this.files = files;
            this.remove_from_active_stack(file);
        } catch (error) {
            console.error(`->force:${error}`);
        }
    }

    this.add_in_active_stack_using_element = (file, async = true) => {
        let scriptEle = document.createElement("script");

        scriptEle.setAttribute("src", `${this.base_path}/${file}`);
        scriptEle.setAttribute("type", "text/javascript");
        scriptEle.setAttribute("async", async);

        document.body.appendChild(scriptEle);

        // here adding in active stack.
        this.active_stack[file] = scriptEle;

        // success event 
        scriptEle.addEventListener("load", () => {
            this.set_file_label_status(file, true);
        });
        // error event
        scriptEle.addEventListener("error", (ev) => {
            this.deactive_file(file);
            console.error(`->force:Unable to load ${file}`);
        });
    };

    this.runJs = (file) => {
        try {
            eval(this.active_stack[file]);
        } catch (error) {
            console.error(`->force:${error}`);
        }
    };

    this.run_all_files = () => {
        try {
            for (let file in this.active_stack) {
                eval(this.active_stack[file]);
            }
        } catch (error) {
            console.error(`->force:${error}`);
        }
    }


    this.add_in_active_stack = async (file) => {
        try {
            const response = await fetch(`${this.base_path}/${file}`);
            if (response.status == 200) {
                this.set_file_label_status(file, true);
                this.add_active_stack_label(file);
                const scriptContent = await response.text();
                this.active_stack[file] = scriptContent;
                eval(scriptContent); // Evaluate the script content
            }
            else {
                this.deactive_file(file);
                console.error(`->force:404: File not found ${file}`);
            }

        } catch (error) {
            console.error(`->force:${error}`);
        }
    };

    this.remove_from_active_stack = (file) => {
        try {
            // this.active_stack[file].remove();
            this.set_file_label_status(file, false);
            delete this.active_stack_labels[file];
            delete this.active_stack[file];
        } catch (error) {
            console.error(`->force:${error}`);
        }
    };

    this.set_file_label_status = (file, _status) => {
        var status = this.file_labels[file].querySelector(".status");
        if (_status) {
            status.classList.add("status-active");
        }
        else {
            status.classList.remove("status-active");
        }
    };

    this.on_click_file_explorer_label = (event) => {
        var file_name = event.currentTarget.getAttribute("name");

        if (this.files[file_name]) {
            this.deactive_file(file_name);
        }
        else {
            this.activate_file(file_name);
        }
    };

    this.on_click_file_explorer_label_remove = (event) => {
        var file_name = event.currentTarget.getAttribute("name");
        if (this.files[file_name]) {
            this.remove_from_active_stack(file_name);
        }

        this.file_labels[file_name].remove();
        delete this.file_labels[file_name];
        var files = this.storage.get("files");
        delete files[file_name];
        this.storage.set("files", files);
        this.files = files;
        event.stopPropagation();
    }

    this.show_file_explorer = () => {
        var menu_width = window.getComputedStyle(document.querySelector(".menu")).width;
        document.querySelector(":root").style.setProperty("--file-manager-right-position", menu_width);
        this.file_explorer.classList.remove('file-manager-hide');
        this.file_explorer.classList.add('file-manager-show');
    };

    this.hide_file_explorer = () => {
        this.file_explorer.classList.remove('file-manager-show');
        this.file_explorer.classList.add('file-manager-hide');
    };

    this.onWindowResize = (event) => {
        this.active_file_stack.style.display = "none";
        var conatiner = document.querySelector(".logs_conatiner");
        this.active_file_stack.style.width = window.getComputedStyle(conatiner).width;
        this.active_file_stack.style.maxWidth = window.getComputedStyle(conatiner).width;
        this.active_file_stack.style.display = null;
    };


    this.__init__ = function () {
        try {
            // fetching css.
            this.css = window.getComputedStyle(document.querySelector(":root"));

            // Fetching elements for the file dialog box.
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

            // fetching element for the file explorer.
            this.file_explorer_show = document.querySelector("#button-show-files");
            this.file_explorer = document.querySelector("#fileExplorer");
            this.file_explorer_file = this.file_explorer.querySelector(".files");
            this.file_explorer_close = document.querySelector("#fileExplorerClose");

            // setting up file explorer variables.
            var menu_width = window.getComputedStyle(document.querySelector(".menu")).width;
            document.querySelector(":root").style.setProperty("--file-manager-right-position", menu_width);

            // connecting file explorer buttons.
            this.file_explorer_close.addEventListener("click", this.hide_file_explorer);
            this.file_explorer_show.addEventListener("click", this.show_file_explorer);

            // here working on active file stack.
            this.active_file_stack = document.querySelector(".activeFileStack");

            // let's setup initial width;
            this.active_file_stack.style.width = window.getComputedStyle(document.querySelector(".logs_conatiner")).width;
            window.addEventListener("resize", this.onWindowResize);

            // set scroll direction.
            this.active_file_stack.querySelector(".activefiles").addEventListener('wheel', (e) => {
                e.preventDefault();
                e.currentTarget.scrollLeft += e.deltaY;
                // if (e.shiftKey) {
                // }
            });

            // here creating a store object to handel data.
            this.storage = new Storage();

            // here files to file explorer which is already stored.
            let files = this.storage.get("files");
            this.files = files;
            if (files != null) {
                for (let file in files) {
                    this.add_file_label(file, files[file]);
                }
            }



        } catch (error) {
            console.error(`->force:${error}`);
        }
    }

    this.__init__();
}

export { FileManager };