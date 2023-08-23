// Here binding up the console with a function that will help to store all the logs in list.


// Normal logs
console.defaultLog = console.log.bind(console);
console.logs = [];
console.log = function () {
    // default &  console.log()
    console.defaultLog.apply(console, arguments);
    // new & array data
    console.logs.push(Array.from(arguments));
}

// Erorr logs.
console.defaultError = console.error.bind(console);
console.errors = [];
console.error = function () {
    // default &  console.error()
    console.defaultError.apply(console, arguments);
    // new & array data
    console.errors.push(Array.from(arguments));
}


// Warning logs
console.defaultWarn = console.warn.bind(console);
console.warns = [];
console.warn = function () {
    // default &  console.warn()
    console.defaultWarn.apply(console, arguments);
    // new & array data
    console.warns.push(Array.from(arguments));
}

// Debug Logs.
console.defaultDebug = console.debug.bind(console);
console.debugs = [];
console.debug = function () {
    // default &  console.debug()
    console.defaultDebug.apply(console, arguments);
    // new & array data
    console.debugs.push(Array.from(arguments));
}


var LogManager = function () {
    this.buttons_status = {};

    this.chnage_state = (event) => {
        var target = event.currentTarget;

        var logs = this.system_logs.querySelectorAll(`[name="${target.name}"]`);
        var visibility_status = eval(localStorage.getItem(target.name));

        if (visibility_status) {
            // here deactivating button.
            target.classList.remove("active");
            localStorage.setItem(target.name, false);

            // here let's hide all the logs.
            for (var log of logs) {
                log.style.display = "none";
            }
        }
        else {
            // here activating button.
            target.classList.add("active");
            localStorage.setItem(target.name, true);

            for (var log of logs) {
                log.style.display = null;
            }
        }

        this.buttons_status[button.name] = eval(localStorage.getItem(button.name));
    }

    this.add_log = function (log) {
        this.system_logs.append(log);
    }

    this.get_state = function (log_type) {
        if (log_type in this.buttons_status) {
            return this.buttons_status[log_type];
        }
        return null;
    }

    this.clear = () => {
        this.system_logs.innerHTML = "";
    }

    this.reload_browser = () => {
        window.location.reload(true);
    }

    this.__init__ = function () {
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
            var button_status = localStorage.getItem(button.name);
            if (button_status == null) {
                localStorage.setItem(button.name, true);
                button.classList.add("active");
            }
            else {
                if (button_status) {
                    button.classList.add('active');
                }
                else {
                    button.classList.remove('active');
                }
            }

            this.buttons_status[button.name] = eval(localStorage.getItem(button.name));
        }
    }

    this.__init__();
}

var log_manager = new LogManager();

// here creating function's that will be called on on each push.
function logCall() {
    while (console.logs.length > 0) {
        var log = document.createElement("div")
        log.setAttribute("name", "log");
        log.classList = "output log";
        log.innerHTML = `
            <div class="heading" >Output</div>
            <div class="text">${console.logs.splice(-1, 1)}</div>`;
        log_manager.add_log(log);

        // here setting up visibility.
        if (log_manager.get_state('log')) {
            log.style.display = null;
        }
        else {
            log.style.display = "none";
        }
    }
}

function errorCall() {

    while (console.errors.length > 0) {
        var log = document.createElement("div");
        log.setAttribute("name", "error");
        log.classList = "output error";
        log.innerHTML = `
        <div class="heading" >Error</div>
        <div class="text">${console.errors.splice(0, 1)}</div>`;
        log_manager.add_log(log);

        // here setting up visibility.
        if (log_manager.get_state('error')) {
            log.style.display = null;
        }
        else {
            log.style.display = "none";
        }
    }
}

function warnCall() {

    while (console.warns.length > 0) {
        var log = document.createElement("div");
        log.setAttribute("name", "warn");
        log.classList = "output warn";
        log.innerHTML = `
            <div class="heading" >Warning</div>
            <div class="text">${console.warns.splice(0, 1)}</div>`;
        log_manager.add_log(log);

        // here setting up visibility.
        if (log_manager.get_state('warn')) {
            log.style.display = null;
        }
        else {
            log.style.display = "none";
        }
    }

}

function debugCall() {

    while (console.debugs.length > 0) {
        var log = document.createElement("div");
        log.setAttribute("name", "debug");
        log.classList = "output debug";
        log.innerHTML = `
            <div class="heading" >Debug</div>
            <div class="text">${console.debugs.splice(0, 1)}</div>`;
        log_manager.add_log(log);

        // here setting up visibility.
        if (log_manager.get_state('log')) {
            log.style.display = null;
        }
        else {
            log.style.display = "none";
        }
    }

}

//  here binding a function with all the array's that will be called on each push.
console.logs.push = function () {
    Array.prototype.push.apply(this, arguments);
    logCall();
};

console.errors.push = function () {
    Array.prototype.push.apply(this, arguments);
    errorCall();
};

console.warns.push = function () {
    Array.prototype.push.apply(this, arguments);
    warnCall();
};

console.debugs.push = function () {
    Array.prototype.push.apply(this, arguments);
    debugCall();
};


