import { FileManager } from './components/fileManager.js';
import { Prompt } from './components/prompt.js';
import { LogManager } from './components/logManager.js';
import { Menu } from './components/menu.js';
import { SystemSettings } from "./components/settings.js"
import { UiComponent } from "./components/UiComponent.js"

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

var log_manager = new LogManager();

// here creating function's that will be called on on each push.
function logCall() {
    while (console.logs.length > 0) {
        var log = document.createElement("div")
        log.setAttribute("name", "log");
        log.classList = "output log";
        log.innerHTML = `
            <div class="heading" >Output</div>
            <div class="text">
                <div class="log-text">${console.logs.splice(0, 1)}</div>
                <div class="info">
                    <div class="force">
                    <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div class="log-type log-type-log">
                        <i class="fa-solid fa-file-lines"></i>
                    </div>
                    <div class="log-type log-type-error">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-warn">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-debug">
                        <i class="fa-solid fa-bug"></i>
                    </div>
                    <div class="log-count" value="1">0</div>
                    </div>
                </div>
            </div>`;
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
        <div class="text">
            <div class="log-text">${console.errors.splice(0, 1)}</div>
            <div class="info">
                <div class="force">
                  <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="log-type log-type-log">
                  <i class="fa-solid fa-file-lines"></i>
                </div>
                <div class="log-type log-type-error">
                  <i class="fa-solid fa-circle-exclamation"></i>
                </div>
                <div class="log-type log-type-warn">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="log-type log-type-debug">
                  <i class="fa-solid fa-bug"></i>
                </div>
                <div class="log-count" value="1">0</div>
            </div>
        </div>`;
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
            <div class="text">
                <div class="log-text">${console.warns.splice(0, 1)}</div>
                <div class="info">
                    <div class="force">
                    <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div class="log-type log-type-log">
                        <i class="fa-solid fa-file-lines"></i>
                    </div>
                    <div class="log-type log-type-error">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-warn">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-debug">
                        <i class="fa-solid fa-bug"></i>
                    </div>
                    <div class="log-count" value="1">0</div>
                </div>
            </div>`;
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
            <div class="text">
                <div class="log-text">${console.debugs.splice(0, 1)}</div>
                <div class="info">
                    <div class="force">
                    <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div class="log-type log-type-log">
                        <i class="fa-solid fa-file-lines"></i>
                    </div>
                    <div class="log-type log-type-error">
                        <i class="fa-solid fa-circle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-warn">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div class="log-type log-type-debug">
                        <i class="fa-solid fa-bug"></i>
                    </div>
                    <div class="log-count" value="1">0</div>
                    </div>
                </div>
            </div>`;
        log_manager.add_log(log);

        // here setting up visibility.
        if (log_manager.get_state('debug')) {
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



//  here setting up components.
let ui_component = new UiComponent();
let prompt = new Prompt(log_manager);
var file_manager = new FileManager(log_manager);
let system_setting = new SystemSettings()
let menu = new Menu(file_manager, system_setting);