// Modernized ES6+ version of docpad-plugin-ignoreincludes
module.exports = function (BasePlugin) {
    class IgnoreIncludes extends BasePlugin {
        get name() {
            return "ignoreincludes";
        }

        // Default config
        get initialConfig() {
            return {
                ignoredExtensions: ["inc"]
            };
        }

        render(opts, next) {
            try {
                const { inExtension, outExtension, file } = opts;
                const config = this.getConfig();
                const ignored = config.ignoredExtensions || [];

                // If this file's OUT extension is ignored, we stop DocPad from writing it.
                if (ignored.includes(outExtension)) {
                    if (file?.attributes) {
                        file.attributes.write = false;
                    }

                    // Avoid DocPad warnings by supplying empty content
                    opts.content = "";
                }
            } catch (err) {
                this.docpad.log("error", `ignoreincludes render error: ${err}`);
            }

            // Continue the DocPad pipeline
            return next();
        }
    }

    return IgnoreIncludes;
};
