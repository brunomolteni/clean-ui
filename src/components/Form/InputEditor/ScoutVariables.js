import VariableBlot from "./blots/ScoutVariable";
import VariablesModule from "./modules/ScoutVariable";

const config = {
  startPattern: "{{",
  endPattern: "}}",
  regex: {},
  variables: [
    {
      name: "candidate_first_name",
      desc: "Candidate first name"
    },
    {
      name: "candidate_last_name",
      desc: "Candidate first name"
    },
    {
      name: "candidate_current_company_name",
      desc: "Candidate current company name"
    },
    {
      name: "candidate_current_role",
      desc: "Candidate current role at company"
    },
    {
      name: "position_company",
      desc: "Position's company name"
    },
    {
      name: "position_name",
      desc: "Position's name"
    },
    {
      name: "email_sender_name",
      desc: "Email sender name"
    },
    {
      name: "position_creator_name",
      desc: "Email sender name"
    },
    {
      name: "sender_signature",
      desc: "Email sender signature"
    }
  ]
};

// Regex for different variables validations
config.regex.allVariables = new RegExp(
  config.startPattern + "[a-zA-Z_]+" + config.endPattern,
  "g"
);

config.regex.isVariable = new RegExp(
  config.startPattern + "[a-zA-Z_]+" + config.endPattern
);

config.regex.isValid = new RegExp(
  config.startPattern +
    "(" +
    config.variables.map(variable => variable.name).join("|") +
    ")" +
    config.endPattern
);

config.regex.isInvalid = new RegExp(
  config.startPattern +
    "(?:(?!" +
    config.variables.map(variable => variable.name).join("|") +
    ").)+" +
    config.endPattern
);

// options object used to configure the ScoutVariables module
config.options = {
  source: (searchTerm, renderList, mentionChar) => {
    let values = config.variables.map(variable => ({
      name: config.startPattern + variable.name + config.endPattern
    }));

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderList(matches, searchTerm);
    }
  }
};

/**
 * Register the Variable blot and module to implement variables functionality with autocomplete
 **/
const register = QuillInstance => {
  QuillInstance.register(VariableBlot, true);
  QuillInstance.register("modules/variables", VariablesModule, true);
};

/**
 * Initializes the scout variables dropdown list
 **/
const initDropdown = id => {
  //get the dropdown element
  const placeholderPickerItems = Array.prototype.slice.call(
    document.querySelectorAll("#" + id + " .ql-Variables .ql-picker-item")
  );
  //set the dropdown options
  placeholderPickerItems.forEach(
    item => (item.textContent = item.dataset.value)
  );
  //get the dropdown list html
  let dropdownHtml = document.querySelector(
    "#" + id + " .ql-Variables .ql-picker-label"
  ).innerHTML;
  //move the svg arrow to the right so it doesn't overwrite the dropdown name
  dropdownHtml = dropdownHtml.replace(
    "<svg ",
    '<svg style="margin-right: -20px;"'
  );
  //update the html
  document.querySelector(
    "#" + id + " .ql-Variables .ql-picker-label"
  ).innerHTML =
    "<span>Variables</span>" + dropdownHtml;
};

/**
 * When the text changes validate if a variable was added, if there is a variable, highligh it
 **/
const validate = quillRef => {
  let validatedContent = checkDeltaForVariables(quillRef.getContents());
  quillRef.setContents(validatedContent, "silent");
};

/**
 * Returns a function that validates variables and highligh them on clipboard paste event
 **/
const getValidator = () => {
  //When the user past text find variables and validate them
  return function(node, delta) {
    return checkDeltaForVariables(delta);
  };
};

const isClosingVariable = delta => {
  return (
    delta.ops.length === 2 &&
    delta.ops[0].retain &&
    delta.ops[1].insert === config.endPattern[0]
  );
};

/**
 * after a user writes a variables by hand validate it
 **/
const checkHandwrittenVariable = quillRef => {
  let selection = quillRef.getSelection();
  let variableLength = quillRef
    .getText()
    .match(config.regex.isVariable)[0]
    .slice(2, -2).length;
  let magicNumber = 3; // dunno why 3, but seems to work;
  setTimeout(() => {
    validate(quillRef);
    quillRef.setSelection(
      selection.index - variableLength - magicNumber,
      0,
      "silent"
    );
  }, 0);
};

/**
 * check a delta op by op and find variables, setting them as valid or invalid
 **/

function checkDeltaForVariables(delta) {
  let newOps = [];
  delta.ops.forEach((op, i) => {
    let match = false;
    let lastPosition = 0;

    // if the op is not text or is already a variable return
    if (typeof op.insert !== "string") newOps.push(op);
    else {
      //Find text between {{ }} and determine if valid variable
      while ((match = config.regex.allVariables.exec(op.insert)) != null) {
        // push text before variable
        newOps.push({ insert: op.insert.substring(lastPosition, match.index) });
        // push variable
        newOps.push({
          insert: {
            variable: {
              name: match[0],
              valid: !!match[0].match(config.regex.isValid)
            }
          }
        });
        lastPosition = match.index + match[0].length;
      }
      if (lastPosition)
        // if match was found and ended looping then push the text after the variable
        newOps.push({
          insert: op.insert.substring(lastPosition)
        });
      // if no match was found push the text as is
      else newOps.push(op);
    }
  });
  delta.ops = newOps;
  return delta;
}

export default {
  config,
  register,
  validate,
  initDropdown,
  getValidator,
  checkHandwrittenVariable,
  isClosingVariable
};
