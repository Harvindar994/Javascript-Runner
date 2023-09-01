var UiComponent = function () {

    this.init_toggle = () => {
        var toggles = document.querySelectorAll('.toggle');

        for (var toggle of toggles) {
            toggle.addEventListener("click", this.onClickToggle);

            // Here applying scale on element if scale attribute is there.
            if (toggle.getAttribute('scale')) {
                toggle.style.transform = `scale(${toggle.getAttribute('scale')})`;
            }
        }
    }

    this.onClickToggle = (event) => {
        event.currentTarget.setAttribute('value', event.currentTarget.querySelector("input").checked);
    }

    this.init_dropDown = () => {
        var dropDowns = document.querySelectorAll('.dropdown');

        for (var dropdown of dropDowns) {
            dropdown.addEventListener("click", this.onClickDropDown);

            // Here applying width on element if width attribute is there.
            if (dropdown.getAttribute('width')) {
                dropdown.style.width = dropdown.getAttribute('width');
            }

            // Here applying scale on element if scale attribute is there.
            if (dropdown.getAttribute('scale')) {
                dropdown.style.transform = `scale(${dropdown.getAttribute('scale')})`;
            }
        }
    }

    this.onClickDropDown = (event) => {
        var dropDown = event.currentTarget;
        var list = dropDown.querySelector(".list");

        if (event.target != list && list.contains(event.target)) {
            dropDown.querySelector("input").value = event.target.innerText;
            dropDown.setAttribute("value", event.target.innerText);
            dropDown.classList.remove("dropdown-active");

            // here setting up active icon.
            if (dropDown.querySelector(".input").querySelector("[name='active-icon']")) {
                dropDown.querySelector(".input").querySelector("[name='active-icon']").setAttribute(
                    'class',
                    event.target.querySelector("i").getAttribute('class')
                );
            }
        }
        else {
            if (dropDown.classList.contains("dropdown-active")) {
                dropDown.classList.remove("dropdown-active");
            }
            else {
                dropDown.classList.add("dropdown-active");
            }
        }

    }

    this.onValueChnageRangeInput = (event) => {
        event.currentTarget.setAttribute('value', event.currentTarget.querySelector("input").value);
    }


    this.init_rangeInput = () => {
        var rangeInputs = document.querySelectorAll('.rangeInput');

        for (var rangeInput of rangeInputs) {
            rangeInput.addEventListener('input', this.onValueChnageRangeInput);

            // Here applying width on element if width attribute is there.
            if (rangeInput.getAttribute('width')) {
                rangeInput.style.width = rangeInput.getAttribute('width');
            }

            // Here applying height on element if height attribute is there.
            if (rangeInput.getAttribute('height')) {
                rangeInput.style.height = rangeInput.getAttribute('height');
            }

            // Here applying scale on element if scale attribute is there.
            if (rangeInput.getAttribute('scale')) {
                rangeInput.style.transform = `scale(${rangeInput.getAttribute('scale')})`;
            }
        }
    }

    this.init_primaryButton = () => {
        var buttons = document.querySelectorAll('.primary-button');

        for (var button of buttons) {
            // Here applying width on element if width attribute is there.
            if (button.getAttribute('width')) {
                button.style.width = button.getAttribute('width');
            }

            // Here applying height on element if height attribute is there.
            if (button.getAttribute('height')) {
                button.style.height = button.getAttribute('height');
            }

            // Here applying scale on element if scale attribute is there.
            if (button.getAttribute('scale')) {
                button.style.transform = `scale(${button.getAttribute('scale')})`;
            }
        }
    }

    this.onClickSelectDir = async (event) => {
        let directory;

        try {
            directory = await window.showDirectoryPicker({
                "mode": "read"
            });

            let select_file = event.target;
            while (!select_file.classList.contains("select-dir")) {
                select_file = select_file.parentNode;
            }

            if (select_file.getAttribute("files") == "true") {

                var files = [];

                for await (const entry of directory.values()) {
                    if (entry.kind == "file" && entry.name.endsWith(".js")) {
                        files.push(entry.name);
                    }
                }

                select_file.files = files;
            }

            select_file.setAttribute("value", directory.name);
            select_file.querySelector("input").value = directory.name;

        } catch (e) {
            console.error(`->force:${e}`);
        }
    }


    this.init_selectDir = () => {
        var selectDirs = document.querySelectorAll('.select-dir');

        for (var selectDir of selectDirs) {
            selectDir.addEventListener(
                "click",
                this.onClickSelectDir
            )

            // Here applying width on element if width attribute is there.
            if (selectDir.getAttribute('width')) {
                selectDir.style.width = selectDir.getAttribute('width');
            }

            // Here applying height on element if height attribute is there.
            if (selectDir.getAttribute('height')) {
                selectDir.style.height = selectDir.getAttribute('height');
            }

            // Here applying scale on element if scale attribute is there.
            if (selectDir.getAttribute('scale')) {
                selectDir.style.transform = `scale(${selectDir.getAttribute('scale')})`;
            }
        }

    }


    this.__init__ = function () {
        this.init_toggle();
        this.init_dropDown();
        this.init_rangeInput();
        this.init_primaryButton();
        this.init_selectDir();
    }

    this.__init__();
}


export { UiComponent };
