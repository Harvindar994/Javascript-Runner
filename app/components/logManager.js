var LogManager = function () {
    this.previous_log = null;

    this.chnage_state = (event) => {
        var target = event.currentTarget;

        var logs = this.system_logs.querySelectorAll(`[name="${target.name}"]`);
        var visibility_status = eval(localStorage.getItem(target.name));

        if (visibility_status) {
            // here deactivating button.
            target.classList.remove("active");
            localStorage.setItem(target.name, false);

            // here changing color.
            target.style.color = null;

            // here let's hide all the logs.
            for (var log of logs) {
                log.style.display = "none";
            }
        }
        else {
            // here activating button.
            target.classList.add("active");
            localStorage.setItem(target.name, true);

            // here chnaging color.
            target.style.color = `rgba(${this.css.getPropertyValue("--" + target.name + "-light")}, 100%)`;

            for (var log of logs) {
                log.style.display = null;
            }
        }
    }

    this.add_log = function (log, is_input = false) {
        if (is_input) {
            this.system_logs.append(log);
            this.scroll_down();
            return;
        }

        var log_text = log.querySelector(".log-text").innerText;

        // check if it is a force message.
        var is_force = false;
        var temp = log_text.split("->force:");
        if (temp.length > 1) {
            log_text = temp[1];
            log.querySelector(".log-text").innerText = log_text;
            is_force = true;
        }

        if (this.previous_log !== null) {
            var previous_log_text = this.previous_log.querySelector(".log-text").innerText;
        }
        else {
            var previous_log_text = null;
        }

        if (this.previous_log !== null && previous_log_text === log_text && this.previous_log.getAttribute('name') == log.getAttribute('name')) {
            var log_count = this.previous_log.querySelector(".log-count");

            log_count.style.display = "block";
            log_count.value = log_count.setAttribute('value', parseInt(log_count.getAttribute("value")) + 1);
            log_count.innerText = log_count.getAttribute("value");
        }
        else {
            if (is_force) {
                log.classList.add("blink");
            }
            this.previous_log = log;
            this.system_logs.append(log);
        }

        this.scroll_down();

    }

    this.get_state = function (log_type) {
        return eval(localStorage.getItem(log_type));
    }

    this.clear = () => {
        this.system_logs.innerHTML = "";
    }

    this.reload_browser = () => {
        window.location.reload(true);
    }

    this.scroll_down = () => {
        var scrollArea = document.querySelector(".logs_conatiner");
        scrollArea.scrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;
    }

    this.__init__ = function () {
        this.css = window.getComputedStyle(document.querySelector(":root"));
        this.system_logs = document.querySelector("#system-logs");
        this.log_buttons = document.querySelector(".active-logs").children;

        this.button_clean = document.querySelector("#button-clear");
        this.button_reload = document.querySelector("#button-reload");

        // here connecting buttons.
        this.button_reload.addEventListener("click", this.reload_browser);
        this.button_clean.addEventListener("click", this.clear);

        // let's check if buttons are already active or not.
        for (let button of this.log_buttons) {
            // here add event listner on button.
            button.addEventListener("click", this.chnage_state);

            //  here checking button state
            var button_status = eval(localStorage.getItem(button.name));
            if (button_status == null) {
                localStorage.setItem(button.name, true);
                button.classList.add("active");
            }
            else {
                if (button_status) {
                    button.classList.add('active');

                    // here chnaging color.
                    button.style.color = `rgba(${this.css.getPropertyValue("--" + button.name + "-light")}, 100%)`;
                    var button_indicator = button.querySelector(".indicator");
                    button_indicator.style.backgroundColor = `rgba(${this.css.getPropertyValue("--" + button.name + "-light")}, 100%)`;
                    button_indicator.style.boxShadow = `3px 1px 13px 1px ` + `rgba(${this.css.getPropertyValue("--" + button.name + "-light")}, 100%)`;
                }
                else {
                    button.classList.remove('active');
                }
            }
        }

    }

    this.__init__();
}


export { LogManager };