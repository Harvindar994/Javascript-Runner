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


// here fetching all the element from page that will help to create a console.
var logs = document.querySelector(".logs");
var css = getComputedStyle(document.querySelector(':root'));

var button_clean = document.querySelector("#button-clear")
var button_reload = document.querySelector("#button-reload")

var indicator_logs = document.querySelector("#button-log")
var indicator_error = document.querySelector("#button-error")
var indicator_warn = document.querySelector("#button-warn")
var indicator_debug = document.querySelector("#button-debug")


var logs_flag = css.getPropertyValue("--logs");
var error_flag = css.getPropertyValue("--errors");
var warn_flag = css.getPropertyValue("--warns");
var debug_flag = css.getPropertyValue("--debugs");

if (logs_flag == "true") {
    indicator_logs.classList.add("active");
}
if (error_flag == "true") {
    indicator_error.classList.add("active");
}
if (warn_flag == "true") {
    indicator_warn.classList.add("active");
}
if (debug_flag == "true") {
    indicator_debug.classList.add("active");
}

button_clean.addEventListener("click", () => {
    logs.innerHTML = "";
})

button_reload.addEventListener("click", () => {
    window.location.reload(true);
})

// here creating function's that will be called on on each push.
function logCall() {
    if (logs_flag == "true") {
        while (console.logs.length > 0) {
            var log = document.createElement("div")
            log.classList = "output log";
            log.innerHTML = `
            <div class="heading" >Output</div>
            <div class="text">${console.logs.splice(-1, 1)}</div>`;
            logs.append(log);
        }
    }
    else {
        console.logs.length = 0;
    }
}

function errorCall() {
    if (error_flag == "true") {
        while (console.errors.length > 0) {
            var log = document.createElement("div")
            log.classList = "output error";
            log.innerHTML = `
        <div class="heading" >Error</div>
        <div class="text">${console.errors.splice(0, 1)}</div>`;
            logs.append(log);
        }
    }
    else {
        console.errors.length = 0;
    }

}

function warnCall() {
    if (warn_flag == "true") {
        while (console.warns.length > 0) {
            var log = document.createElement("div")
            log.classList = "output warn";
            log.innerHTML = `
            <div class="heading" >Warning</div>
            <div class="text">${console.warns.splice(0, 1)}</div>`;
            logs.append(log);
        }
    }
    else {
        console.warns.length = 0;
    }
}

function debugCall() {
    if (debug_flag == "true") {
        while (console.debugs.length > 0) {
            var log = document.createElement("div")
            log.classList = "output debug";
            log.innerHTML = `
            <div class="heading" >Debug</div>
            <div class="text">${console.debugs.splice(0, 1)}</div>`;
            logs.append(log);
        }
    }
    else {
        console.debugs.length = 0;
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


