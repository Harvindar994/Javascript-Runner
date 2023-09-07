import { Storage } from "./Storage.js";

let SystemSettings = function () {
    this.settings = {};

    this.showSystemSettings = (event) => {
        this.systemSettings.classList.add("settings-show");
    }

    this.hideSystemSettings = (event) => {
        this.systemSettings.classList.remove("settings-show");
    }


    this.onSettingChnage = (event) => {
        var target = event.currentTarget;

        // her first let's save the setting.
        if (this.settings[target.getID()] != target.get()) {
            this.settings[target.getID()] = target.get();
            this.storage.set("setting", this.settings);

            if (target.getID() in this.setting_appliers) {
                this.setting_appliers[target.getID()](this.settings, target);
            }
        }
    }

    this.__init__ = function () {
        // here defining default setting.
        this.default_setting = {
            "Setting_SystemTheme": "Light",
            "Setting_BackgroundAnimation": false,
            "Setting_BackgroundAnimationType": "Bubbles",
            "Setting_BackgroundAnimationOpacity": "100%",
            "Setting_TestingButtons": false,
            "Setting_RunFiles": true,
            "Setting_UseFileExplorer": false,
            "Setting_FileExplorerToAddFile": true,
            "Setting_OpenFileExplorerToCreateFile": false,
            "Setting_DefaultDir": "Learning"
        }

        this.systemSettings = document.querySelector('.systemSettings');
        this.button_close = document.querySelector('#systemSettingsClose');

        // here connecting buttons.
        this.button_close.addEventListener('click', this.hideSystemSettings);

        // Let's create our new observer to observe when the attribute of element changes.
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes") {
                    mutation.target.dispatchEvent(new Event("settingChange"));
                    // mutation.target.textContent = "Attribute of the element changed";
                }

            });
        });

        // Let's createa system to apply setting on application.
        this.setting_appliers = {
            "Setting_SystemTheme": function (settings, target) {

            },

            "Setting_BackgroundAnimation": function (settings, target) {
                var animation_types = {
                    "Bubbles": 'bubbles-animation-active',
                    "Big Things": 'big-things-animation-active',
                    "Volcanic Ash": 'volcanic-ash-animation-active',
                    "Rymd": 'rymd-animation-active'
                }

                if (settings["Setting_BackgroundAnimation"]) {
                    // Here disabling the sub setting of animation
                    let setting = target;
                    while (!setting.classList.contains("setting")) {
                        setting = setting.parentNode;
                    }

                    setting.classList.remove("inactive");

                    for (var animation_type in animation_types) {
                        if (settings["Setting_BackgroundAnimationType"] == animation_type) {
                            document.querySelector("body").classList.add(animation_types[animation_type]);
                        }
                        else {
                            document.querySelector("body").classList.remove(animation_types[animation_type]);
                        }
                    }

                    document.documentElement.style.setProperty('--bg-animation-opacity', `${settings["Setting_BackgroundAnimationOpacity"]}%`);
                }
                else {
                    // Here disabling the sub setting of animation
                    let setting = target;
                    while (!setting.classList.contains("setting")) {
                        setting = setting.parentNode;
                    }

                    setting.classList.add("inactive");

                    for (var animation_type in animation_types) {
                        document.querySelector("body").classList.remove(animation_types[animation_type]);
                    }
                }
            },

            "Setting_BackgroundAnimationType": function (settings, target) {
                var animation_types = {
                    "Bubbles": 'bubbles-animation-active',
                    "Big Things": 'big-things-animation-active',
                    "Volcanic Ash": 'volcanic-ash-animation-active',
                    "Rymd": 'rymd-animation-active'
                }

                if (settings["Setting_BackgroundAnimation"]) {
                    for (var animation_type in animation_types) {
                        if (settings["Setting_BackgroundAnimationType"] == animation_type) {
                            document.querySelector("body").classList.add(animation_types[animation_type]);
                        }
                        else {
                            document.querySelector("body").classList.remove(animation_types[animation_type]);
                        }
                    }
                }
                else {
                    for (var animation_type in animation_types) {
                        document.querySelector("body").classList.remove(animation_types[animation_type]);
                    }
                }
            },

            "Setting_BackgroundAnimationOpacity": function (settings, target) {
                document.documentElement.style.setProperty('--bg-animation-opacity', `${settings["Setting_BackgroundAnimationOpacity"]}%`);
            },

            "Setting_TestingButtons": function (settings, target) {

            },

            "Setting_RunFiles": function (settings, target) {

            },

            "Setting_UseFileExplorer": function (settings, target) {

            },

            "Setting_FileExplorerToAddFile": function (settings, target) {

            },

            "Setting_OpenFileExplorerToCreateFile": function (settings, target) {

            },

            "Setting_DefaultDir": function (settings, target) {

            }
        }

        // here creating a store object to handel data.
        this.storage = new Storage();

        // here let's init the setting.
        var settings = this.storage.get("setting");

        if (settings == null) {

            var setting_data = {}

            settings = document.querySelectorAll("[used_as='app_setting']");
            for (var setting of settings) {
                setting_data[setting.getID()] = setting.get();

                // here adding event listner on all the setting component.
                setting.addEventListener("settingChange", this.onSettingChnage);

                // here attaching the element with observer that will observe the changes in attributes value.
                this.observer.observe(setting, {
                    attributes: true //configure it to listen to attribute changes
                });

            }
            this.storage.set("setting", setting_data);
            this.settings = setting_data;

            // here applying settings.
            for (var setting of settings) {

                if (setting.getID() in this.setting_appliers) {
                    this.setting_appliers[setting.getID()](this.settings, setting);
                }
            }
        }
        else {
            this.settings = settings;

            for (var setting in settings) {
                var setting_element = document.querySelector(`#${setting}`);

                setting_element.set(settings[setting]);
                setting_element.addEventListener("settingChange", this.onSettingChnage);

                // here attaching the element with observer that will observe the changes in attributes value.
                this.observer.observe(setting_element, { attributes: true });

                // here applying setting.
                if (setting_element.getID() in this.setting_appliers) {
                    this.setting_appliers[setting_element.getID()](this.settings, setting_element);
                }
            }
        }

    }

    this.__init__();
}


export { SystemSettings }