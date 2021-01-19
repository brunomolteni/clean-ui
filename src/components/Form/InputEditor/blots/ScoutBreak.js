import Quill from "quill";

let Break = Quill.import("blots/break");
let Embed = Quill.import("blots/embed");

//SmartBreak blot, generates breaks
class ScoutBreak extends Break {
  length() {
    return 1;
  }
  value() {
    return "\n";
  }
  insertInto(parent, ref) {
    Embed.prototype.insertInto.call(this, parent, ref);
  }
}
//Config the blot
ScoutBreak.blotName = "break";
ScoutBreak.tagName = "BR";

const register = QuillInstance => {
  QuillInstance.register(ScoutBreak, true);
};

export default { register };
