import Quill from "quill";

const Embed = Quill.import("blots/embed");

class VariableBlot extends Embed {
  static create(data) {
    const node = super.create();
    node.innerHTML = data.name;
    node.dataset.name = node.dataset.name || data.name;
    node.dataset.valid = node.dataset.valid || data.valid;
    if (!data.valid) node.classList.add("invalid");
    return node;
  }

  static value(domNode) {
    return {
      name: domNode.dataset.name,
      valid: domNode.dataset.valid
    };
  }

  length() {
    return 1;
  }
}

VariableBlot.blotName = "variable";
VariableBlot.tagName = "mark";
VariableBlot.className = "ql-variable";

export default VariableBlot;
