import Quill from "quill";
import Keys from "./keys";
import "./ScoutVariable.scss";

class ScoutVariables {
  constructor(quill, options) {
    this.isOpen = false;
    this.itemIndex = 0;
    this.mentionCharPos = null;
    this.cursorPos = null;
    this.values = [];
    this.suspendMouseEnter = false;

    this.quill = quill;

    this.options = {
      source: null,
      renderItem: (item, searchTerm) => {
        return item.name;
      },
      mentionDenotationChars: ["{"],
      allowedChars: /^[a-zA-Z0-9_]*$/,
      minChars: 0,
      maxChars: 31,
      offsetTop: 2,
      offsetLeft: 0,
      isolateCharacter: false,
      fixMentionsToQuill: false
    };

    Object.assign(this.options, options);

    this.mentionContainer = document.createElement("div");
    this.mentionContainer.className = "ql-variable-list-container";
    this.mentionContainer.style.cssText = "display: none; position: absolute;";
    this.mentionContainer.onmousemove = this.onContainerMouseMove.bind(this);

    if (this.options.fixMentionsToQuill) {
      this.mentionContainer.style.width = "auto";
    }

    this.mentionList = document.createElement("ul");
    this.mentionList.className = "ql-variable-list";
    this.mentionContainer.appendChild(this.mentionList);

    document.body.appendChild(this.mentionContainer);

    quill.on("text-change", this.onTextChange.bind(this));
    quill.on("selection-change", this.onSelectionChange.bind(this));

    quill.keyboard.addBinding(
      {
        key: Keys.TAB
      },
      this.selectHandler.bind(this)
    );
    quill.keyboard.bindings[9].unshift(quill.keyboard.bindings[9].pop());

    quill.keyboard.addBinding(
      {
        key: Keys.ENTER
      },
      this.selectHandler.bind(this)
    );
    quill.keyboard.bindings[13].unshift(quill.keyboard.bindings[13].pop());

    quill.keyboard.addBinding(
      {
        key: Keys.ESCAPE
      },
      this.escapeHandler.bind(this)
    );

    quill.keyboard.addBinding(
      {
        key: Keys.UP
      },
      this.upHandler.bind(this)
    );

    quill.keyboard.addBinding(
      {
        key: Keys.DOWN
      },
      this.downHandler.bind(this)
    );
  }

  selectHandler() {
    if (this.isOpen) {
      this.selectItem();
      return false;
    }
    return true;
  }

  escapeHandler() {
    if (this.isOpen) {
      this.hideMentionList();
      return false;
    }
    return true;
  }

  upHandler() {
    if (this.isOpen) {
      this.prevItem();
      return false;
    }
    return true;
  }

  downHandler() {
    if (this.isOpen) {
      this.nextItem();
      return false;
    }
    return true;
  }

  showMentionList() {
    this.mentionContainer.style.visibility = "hidden";
    this.mentionContainer.style.display = "";
    this.setMentionContainerPosition();
    this.isOpen = true;
  }

  hideMentionList() {
    this.mentionContainer.style.display = "none";
    this.isOpen = false;
  }

  highlightItem(scrollItemInView = true) {
    for (let i = 0; i < this.mentionList.childNodes.length; i += 1) {
      this.mentionList.childNodes[i].classList.remove("selected");
    }
    this.mentionList.childNodes[this.itemIndex].classList.add("selected");

    if (scrollItemInView) {
      const itemHeight = this.mentionList.childNodes[this.itemIndex]
        .offsetHeight;
      const itemPos = this.itemIndex * itemHeight;
      const containerTop = this.mentionContainer.scrollTop;
      const containerBottom = containerTop + this.mentionContainer.offsetHeight;

      if (itemPos < containerTop) {
        // Scroll up if the item is above the top of the container
        this.mentionContainer.scrollTop = itemPos;
      } else if (itemPos > containerBottom - itemHeight) {
        // scroll down if any part of the element is below the bottom of the container
        this.mentionContainer.scrollTop +=
          itemPos - containerBottom + itemHeight;
      }
    }
  }

  getItemData() {
    return {
      name: this.mentionList.childNodes[this.itemIndex].dataset.name,
      valid: true
    };
  }

  onContainerMouseMove() {
    this.suspendMouseEnter = false;
  }

  selectItem() {
    const data = this.getItemData();
    const charBefore =
      this.quill.getText(this.mentionCharPos - 1, 1, Quill.sources.API) ===
      this.options.mentionDenotationChars[0];
    this.quill.deleteText(
      this.mentionCharPos - !!charBefore,
      this.cursorPos - this.mentionCharPos + !!charBefore,
      Quill.sources.API
    );
    this.quill.insertEmbed(
      this.mentionCharPos - !!charBefore,
      "variable",
      data,
      Quill.sources.API
    );
    this.quill.setSelection(
      this.mentionCharPos + !charBefore,
      Quill.sources.API
    );
    this.hideMentionList();
  }

  onItemMouseEnter(e) {
    if (this.suspendMouseEnter) {
      return;
    }

    const index = Number(e.target.dataset.index);

    if (!Number.isNaN(index) && index !== this.itemIndex) {
      this.itemIndex = index;
      this.highlightItem(false);
    }
  }

  onItemClick(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    this.itemIndex = e.currentTarget.dataset.index;
    this.highlightItem();
    this.selectItem();
  }

  renderList(mentionChar, data, searchTerm) {
    if (data && data.length > 0) {
      this.values = data;
      this.mentionList.innerHTML = "";
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement("li");
        li.className = "ql-variable-list-item";
        li.dataset.index = i;
        li.dataset.name = data[i].name;
        li.innerHTML = this.options.renderItem(data[i], searchTerm);
        li.onmouseenter = this.onItemMouseEnter.bind(this);
        li.onclick = this.onItemClick.bind(this);
        this.mentionList.appendChild(li);
      }
      this.itemIndex = 0;
      this.highlightItem();
      this.showMentionList();
    } else {
      this.hideMentionList();
    }
  }

  nextItem() {
    this.itemIndex = (this.itemIndex + 1) % this.values.length;
    this.suspendMouseEnter = true;
    this.highlightItem();
  }

  prevItem() {
    this.itemIndex =
      (this.itemIndex + this.values.length - 1) % this.values.length;
    this.suspendMouseEnter = true;
    this.highlightItem();
  }

  hasValidChars(s) {
    return this.options.allowedChars.test(s);
  }

  containerBottomIsNotVisible(topPos) {
    return (
      topPos + this.mentionContainer.offsetHeight >
      window.pageYOffset + window.innerHeight
    );
  }

  containerRightIsNotVisible(leftPos) {
    if (this.options.fixMentionsToQuill) {
      return false;
    }

    const rightPos = leftPos + this.mentionContainer.offsetWidth;
    const browserWidth =
      window.pageXOffset + document.documentElement.clientWidth;
    return rightPos > browserWidth;
  }

  setMentionContainerPosition() {
    const containerPos = this.quill.container.getBoundingClientRect();
    const mentionCharPos = this.quill.getBounds(this.mentionCharPos);

    let topPos = window.pageYOffset + this.options.offsetTop;

    let leftPos =
      window.pageXOffset + containerPos.left + this.options.offsetLeft;

    if (this.options.fixMentionsToQuill) {
      topPos += containerPos.bottom;
      const rightPos = window.outerWidth - containerPos.right;
      this.mentionContainer.style.right = `${rightPos}px`;
    } else {
      leftPos += mentionCharPos.left;
      topPos += containerPos.top + mentionCharPos.bottom;
    }

    if (this.containerBottomIsNotVisible(topPos)) {
      const containerHeight =
        this.mentionContainer.offsetHeight + this.options.offsetTop;
      let overMentionCharPos = window.pageYOffset + containerPos.top;

      if (!this.options.fixMentionsToQuill) {
        overMentionCharPos += mentionCharPos.top;
      }

      topPos = overMentionCharPos - containerHeight;
    }

    if (this.containerRightIsNotVisible(leftPos)) {
      const containerWidth =
        this.mentionContainer.offsetWidth + this.options.offsetLeft;
      const browserWidth =
        window.pageXOffset + document.documentElement.clientWidth;
      leftPos = browserWidth - containerWidth;
    }

    this.mentionContainer.style.top = `${topPos}px`;
    this.mentionContainer.style.left = `${leftPos}px`;

    this.mentionContainer.style.visibility = "visible";
  }

  onSomethingChange() {
    const range = this.quill.getSelection();
    if (range == null) return;
    this.cursorPos = range.index;
    const startPos = Math.max(0, this.cursorPos - this.options.maxChars);
    const beforeCursorPos = this.quill.getText(
      startPos,
      this.cursorPos - startPos
    );
    const mentionCharIndex = this.options.mentionDenotationChars.reduce(
      (prev, cur) => {
        const previousIndex = prev;
        const mentionIndex = beforeCursorPos.lastIndexOf(cur);

        return mentionIndex > previousIndex ? mentionIndex : previousIndex;
      },
      -1
    );
    if (mentionCharIndex > -1) {
      if (
        this.options.isolateCharacter &&
        !(
          mentionCharIndex == 0 ||
          !!beforeCursorPos[mentionCharIndex - 1].match(/\s/g)
        )
      ) {
        this.hideMentionList();
        return;
      }
      const mentionCharPos =
        this.cursorPos - (beforeCursorPos.length - mentionCharIndex);
      this.mentionCharPos = mentionCharPos;
      const textAfter = beforeCursorPos.substring(mentionCharIndex + 1);
      if (
        textAfter.length >= this.options.minChars &&
        this.hasValidChars(textAfter)
      ) {
        const mentionChar = beforeCursorPos[mentionCharIndex];
        this.options.source(
          textAfter,
          this.renderList.bind(this, mentionChar),
          mentionChar
        );
      } else {
        this.hideMentionList();
      }
    } else {
      this.hideMentionList();
    }
  }

  onTextChange(delta, oldDelta, source) {
    if (source === "user") {
      this.onSomethingChange();
    }
  }

  onSelectionChange(range) {
    if (range && range.length === 0) {
      this.onSomethingChange();
    } else {
      this.hideMentionList();
    }
  }
}

export default ScoutVariables;
