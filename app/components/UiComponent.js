let UiComponent = function () {

    this.init_toggle = () => {
        var toggles = document.querySelectorAll('.toggle');

        for (var toggle of toggles) {
            toggle.addEventListener("click", this.onClickToggle);

            // here let's define getter and setter.
            toggle.set = function (value) {
                value = eval(value);
                this.querySelector("input").checked = value;
                this.setAttribute("value", this.querySelector("input").checked);
                return this.querySelector("input").checked;
            }

            toggle.get = function () {
                return this.querySelector("input").checked;
            }

            toggle.getID = function () {
                return this.getAttribute("id");
            }

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

            // here let's define getter and setter.
            dropdown.set = function (value) {
                var list_items = this.querySelectorAll(".list-item");

                for (var list_item of list_items) {
                    // here creating div to extract text.
                    var div = document.createElement("div");
                    div.innerHTML = list_item.innerHTML;

                    if (div.innerText.trim() == value) {
                        this.querySelector("input").value = value;
                        this.setAttribute("value", value);

                        // here setting up active icon.
                        if (this.querySelector(".input").querySelector("[name='active-icon']")) {
                            this.querySelector(".input").querySelector("[name='active-icon']").setAttribute(
                                'class',
                                list_item.querySelector("i").getAttribute('class')
                            );
                        }

                        return true;
                    }
                }

                return false;
            }

            dropdown.get = function () {
                return this.querySelector("input").value;
            }

            dropdown.getID = function () {
                return this.getAttribute("id");
            }

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

            // here setting up getter and setter.
            rangeInput.set = function (value) {
                this.querySelector('input').value = value;
                this.setAttribute('value', value);
                return this.querySelector('input').value;
            }

            rangeInput.get = function () {
                return this.querySelector('input').value;
            }

            rangeInput.getID = function () {
                return this.getAttribute('id');
            }


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

    this.onSaveSelectDir = (event) => {

        let select_file = event.target;
        while (!select_file.classList.contains("select-dir")) {
            select_file = select_file.parentNode;
        }

        select_file.setAttribute(
            "value",
            select_file.querySelector("input").value
        );
    }

    this.init_selectDir = () => {
        var selectDirs = document.querySelectorAll('.select-dir');

        for (var selectDir of selectDirs) {
            var type = selectDir.getAttribute("type");

            if (type == "input") {
                selectDir.querySelector(".info").addEventListener(
                    "click",
                    this.onSaveSelectDir
                )
            }
            else if (type == "select") {

                selectDir.addEventListener(
                    "click",
                    this.onClickSelectDir
                )

            }

            // let's setup setter and getter.
            selectDir.get = function () {
                return this.querySelector("input").value;
            }

            selectDir.set = function (value) {
                this.querySelector("input").value = value;
                this.setAttribute("value", value);
                return value;
            }

            selectDir.getID = function () {
                return this.getAttribute("id");
            }

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

    this.onClickRadioButton = (event) => {
        for (var radio_button of this.radio_button_state[event.currentTarget.getAttribute("group")]) {
            if (event.currentTarget == radio_button) {
                radio_button.setAttribute("value", true);
                radio_button.querySelector("input").checked = true;
            }
            else {
                radio_button.setAttribute("value", false);
                radio_button.querySelector("input").checked = false;
            }
        }
    }

    this.init_radioButton = () => {
        let radio_buttons = document.querySelectorAll(".radio-button");

        for (let radio_button of radio_buttons) {
            radio_button.addEventListener(
                'click',
                this.onClickRadioButton
            );

            // here setting up setter and getter.
            radio_button.set = function (value) {
                value = eval(value);

                if (value == true) {
                    this.querySelector("input").checked = value;
                    this.setAttribute("value", value);

                    for (var other_radio of this.getGroup(this)) {
                        if (other_radio != this) {
                            other_radio.querySelector("input").checked = !eval(value);
                            other_radio.setAttribute("value", !eval(value));
                        }
                    }

                    return this.querySelector("input").checked;
                }
            }

            radio_button.get = function () {
                return this.querySelector("input").checked;
            }

            radio_button.getID = function () {
                return this.getAttribute('id');
            }

            radio_button.getGroup = (self) => {
                return this.radio_button_state[self.getAttribute("group")];
            }

            radio_button.querySelector("input").setAttribute(
                "name",
                radio_button.getAttribute("group")
            );

            if (this.radio_button_state[radio_button.getAttribute("group")]) {
                this.radio_button_state[radio_button.getAttribute("group")].push(radio_button);
            }
            else {
                this.radio_button_state[radio_button.getAttribute("group")] = [radio_button,];
            }

            if (radio_button.querySelector("input").checked) {
                radio_button.setAttribute("value", true);
            }
            else {
                radio_button.setAttribute("value", false);
            }

            // Here applying scale on element if scale attribute is there.
            if (radio_button.getAttribute('scale')) {
                radio_button.style.transform = `scale(${radio_button.getAttribute('scale')})`;
            }
        }
    }


    this.__init__ = function () {
        this.radio_button_state = {};

        this.init_toggle();
        this.init_dropDown();
        this.init_rangeInput();
        this.init_primaryButton();
        this.init_selectDir();
        this.init_radioButton();

    }

    this.__init__();
}

// UiComponent();

export { UiComponent };
