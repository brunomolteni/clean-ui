import Quill from "quill";

let LinkBlot = Quill.import("formats/link");

LinkBlot.sanitize = function(url) {
  let regex = /^(http|https):\/\//i;
  if (!url.match(regex)) {
    //does not have protocol, add it
    url = "http://" + url;
    // console.log('LINK W/O PROTOCOL FIXED: ',url);
  }
  return url;
};

const register = QuillInstance => {
  QuillInstance.register(LinkBlot, true);
};

export default { register };
