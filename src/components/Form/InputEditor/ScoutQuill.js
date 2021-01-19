import ScoutVariables from "./ScoutVariables";

/**
 * Handles scout custom features built on top of Quill
 **/

export default class ScoutQuill {
  constructor(QuillInstance) {
    this.Quill = QuillInstance;
  }

  //Quill modules

  /**
   * Based on the user given props return the toolbar module configuration for Quill
   **/
  buildToolbar(toolbarOptions) {
    //Variables dropdown item list
    let { Quill } = this;
    let scoutVariables = ScoutVariables.config.variables.map(
      variable =>
        ScoutVariables.config.startPattern +
        variable.name +
        ScoutVariables.config.endPattern
    );

    //Toolbar config
    const fontToolbar = [
        { header: ["1", "2", "3", "4", "5", "6"] },
        { font: [] },
        { size: [] }
      ],
      listToolbar = [{ list: "ordered" }, { list: "bullet" }],
      indentToolbar = [{ indent: "-1" }, { indent: "+1" }],
      linkToolbar = ["link"],
      imageToolbar = ["image"],
      basicToolbar = ["bold", "italic", "underline"],
      blockquoteToolbar = ["blockquote"],
      cleanFormatToolbar = ["clean"],
      variablesSelector = [{ Variables: scoutVariables }];
    //User config for the toolbar
    let {
      fontOptions,
      textOptions,
      listOptions,
      indentOptions,
      link,
      image,
      clean,
      blockquote,
      emailEditor
    } = toolbarOptions;

    //Toolbar set up
    let toolbar = [];
    fontOptions && (toolbar = [...toolbar, fontToolbar]);
    textOptions && (toolbar = [...toolbar, basicToolbar]);
    indentOptions && (toolbar = [...toolbar, indentToolbar]);
    listOptions && (toolbar = [...toolbar, listToolbar]);
    link && (toolbar = [...toolbar, linkToolbar]);
    image && (toolbar = [...toolbar, imageToolbar]);
    blockquote && (toolbar = [...toolbar, blockquoteToolbar]);
    clean && (toolbar = [...toolbar, cleanFormatToolbar]);
    emailEditor && (toolbar = [...toolbar, variablesSelector]);

    return {
      container: toolbar,
      handlers: {
        Variables: function(value) {
          if (value) {
            const cursorPosition = this.quill.getSelection().index;
            this.quill.insertEmbed(cursorPosition, "variable", {
              name: value,
              valid: true
            });
            this.quill.setSelection(cursorPosition + 1, "silent");
          }
        }
      }
    };
  }

  /**
   * Based on the user given props return the modules for autocomplete, smartbreaks and other custom features configuration for Quill
   **/
  getModules(toolbarOptions) {
    // Helper function that inserts a break line
    let lineBreakMatcher = (node, delta) => {
      let Delta = this.Quill.import("delta");
      let newDelta = new Delta();
      newDelta.insert({ break: "" });
      return newDelta;
    };

    //Keys support for shit+enter
    let keyboardModule = {
      bindings: {
        linebreak: {
          key: 13,
          shiftKey: true,
          handler: function(range) {
            // insert a line break and move the cursor forward
            this.quill.insertEmbed(range.index, "break", true, "user");
            this.quill.setSelection(range.index + 1, "silent");
          }
        }
      }
    };

    let modules = {
      toolbar: this.buildToolbar(toolbarOptions),
      clipboard: {
        matchers: []
      }
    };

    if (toolbarOptions.emailEditor) {
      //module for variables
      modules.variables = ScoutVariables.config.options;
      //Paste support for variables
      modules.clipboard.matchers.push([
        Node.TEXT_NODE,
        ScoutVariables.getValidator()
      ]);
    }

    return modules;
  }
}
