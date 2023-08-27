import { convertNumberToWords } from './tools.js';

let Prompt = function (log_manager) {
    this.log_manager = log_manager;
    this.inputStack = {};

    this.on_active = (event) => {
        if (this.active_input !== null) {
            this.active_input.classList.remove("input-animation");
            this.active_input.querySelector("#info-keyboard").classList.add("info-keyboard");
        }
    }

    this.on_inactive = (event) => {
        this.active_input.querySelector("#info-keyboard").classList.remove("info-keyboard");
    }

    this.on_chnage = (event) => {
        if (event.key == "Enter") {
            var input_field = this.active_input.querySelector(".log-input");
            input_field.setAttribute("name", "finished");
            input_field.blur();
        }
        else {
            this.active_input.querySelector(".log-count").innerText = event.currentTarget.value.length;
        }
    }

    this.get_input = async function (input, inputStackKey = null, index = null, callBack = null) {

        // now lets wait for user response.
        var result = await new Promise(resolve => {
            const input_field = input.querySelector(".log-input");

            const on_active = (event) => {
                input.classList.remove("input-animation");
                input.querySelector("#info-keyboard").classList.add("info-keyboard");
            }

            const on_inactive = (event) => {
                input.querySelector("#info-keyboard").classList.remove("info-keyboard");
            }

            const on_chnage = (event) => {
                if (event.key == "Enter") {
                    input_field.setAttribute("name", "finished");
                    input.setAttribute("name", "input");
                    input.classList.add("inputFinished");
                    input_field.blur();
                    input_field.removeEventListener('keyup', on_chnage);
                    input_field.removeEventListener('focusin', on_active);
                    input_field.removeEventListener('focusout', on_inactive);
                    resolve(input_field.value);

                    if (this.log_manager.get_state('input')) {
                        input.style.display = null;
                    }
                    else {
                        input.style.display = "none";
                    }
                }
                else {
                    input.querySelector(".log-count").innerText = input_field.value.length;
                }
            }

            // let's add event listener on input field.
            input_field.addEventListener('keyup', on_chnage);
            input_field.addEventListener('focusin', on_active);
            input_field.addEventListener('focusout', on_inactive);
        });

        if (inputStackKey == null) {
            callBack(result);
        }
        else {
            try {

                this.inputStack[inputStackKey].count -= 1;
                this.inputStack[inputStackKey].value[index] = result;
                if (this.inputStack[inputStackKey].count == 0) {
                    // we have all the inputs in stack so lets process it and send to function.
                    var inputs = [];
                    for (let i = 0; i < Object.keys(this.inputStack[inputStackKey].value).length; i++) {
                        inputs.push(this.inputStack[inputStackKey].value[i]);
                    }

                    var callBack = this.inputStack[inputStackKey].function;
                    delete this.inputStack[inputStackKey];
                    callBack(...inputs);
                }
                else {
                    for (let i = 0; i < Object.keys(this.inputStack[inputStackKey].inputs).length; i++) {
                        if (!(i in this.inputStack[inputStackKey].value)) {
                            this.inputStack[inputStackKey].inputs[i].querySelector(".log-input").focus();
                            break;
                        }
                    }
                }

            } catch (error) {
                console.error(`-->force:${error}`);
            }
        }

    }

    this.input = (messages, callBack = null) => {
        let index = 0;
        try {
            if (typeof (messages) == 'string' && callBack !== null) {
                var input = this.create_input(messages);
                this.get_input(input, null, null, callBack);
            }
            else {
                if (typeof (messages) == 'function' && callBack == null) {
                    callBack = messages;
                    messages = messages.toString().match(/\((.*?)\)/)[1].split(',').map(arg => arg.trim());
                }
                else if (typeof (messages) == 'number' && callBack !== null && typeof (callBack) == 'function') {
                    if (messages == 1) {
                        var input = this.create_input("Type here");
                        this.get_input(input, null, null, callBack);
                        return;
                    }
                    else {
                        var input_names = [];
                        for (let number = 1; number <= messages; number++) {
                            input_names.push(convertNumberToWords(number));
                        }
                        messages = input_names;
                    }
                }
                else if (typeof (messages) == 'object' && callBack !== null) {

                }
                else if (typeof (callBack) != 'function' || callBack == null) {
                    console.error("->force:You are passing invalid arguments in console.input()");
                    return;
                }

                // getting new index for new input.
                while (index in this.inputStack) {
                    index += 1;
                }

                this.inputStack[index] = {
                    value: {},
                    count: messages.length,
                    function: callBack,
                    inputs: {}
                }

                var serial_index = 0;
                for (var message of messages) {
                    var input = this.create_input(message);
                    this.get_input(input, index, serial_index);
                    this.inputStack[index].inputs[serial_index] = input;
                    serial_index += 1;
                }

            }
        } catch (error) {
            delete this.inputStack[index];
            console.error(`-->force:${error}`);
        }
    }

    this.create_input = (message) => {
        var input = document.createElement("div");
        input.setAttribute('class', 'output input input-animation');
        input.setAttribute("name", "active-input");

        input.innerHTML = `
        <div class="heading">Input</div>
            <div class="text">
                <input
                name="active"
                type="text"
                class="log-input"
                placeholder="${message}"
                />
            <div class="info">
                <div class="" id="info-keyboard">
                    <i class="fa-solid fa-keyboard"></i>
                </div>
                <div class="log-count">0</div>
            </div>
        </div>
        `;
        this.log_manager.add_log(input, true);
        return input;
    }

    this.__init__ = function () {
        // here attaching input function with console.
        console.input = this.input;
    }

    this.__init__();
}

export { Prompt };