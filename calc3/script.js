const calculator = {
    display: null,
    buttonsContainer: null,
    buttons: [
      { value: "+", className: "operator" },
      { value: "-", className: "operator" },
      { value: "*", className: "operator" },
      { value: "/", className: "operator" },
      { value: "1", className: "number" },
      { value: "2", className: "number" },
      { value: "3", className: "number" },
      { value: "4", className: "number" },
      { value: "5", className: "number" },
      { value: "6", className: "number" },
      { value: "7", className: "number" },
      { value: "8", className: "number" },
      { value: "9", className: "number" },
      { value: "0", className: "number" },
      { value: "=", id: "equals" },
      { value: "C", id: "clear" }
    ],
  
    init() {
      this.display = document.getElementById("display");
      this.buttonsContainer = document.getElementById("buttons");
      this.renderButtons();
      this.addEventListeners();
    },
  
    renderButtons() {
      this.buttons.forEach(buttonData => {
        const button = document.createElement("button");
        button.textContent = buttonData.value;
        button.className = buttonData.className;
        if (buttonData.id) {
          button.id = buttonData.id;
        }
        this.buttonsContainer.appendChild(button);
      });
    },
  
    addEventListeners() {
      const buttons = Array.from(this.buttonsContainer.getElementsByTagName("button"));
      buttons.forEach(button => {
        button.addEventListener("click", this.handleButtonClick.bind(this));
      });
  
      document.addEventListener("keydown", this.handleKeyDown.bind(this));
    },
  
    handleButtonClick(event) {
      const buttonValue = event.target.textContent;
      this.handleInput(buttonValue);
    },
  
    handleKeyDown(event) {
      const buttonValue = event.key;
  
      if (/\d|\.|\+|\-|\*|\/|Enter/.test(buttonValue)) {
        event.preventDefault();
        this.handleInput(buttonValue);
      }
    },
  
    handleInput(value) {
      switch (value) {
        case "C":
          this.clearDisplay();
          break;
        case "=":
        case "Enter":
          this.calculate();
          break;
        default:
          this.appendInput(value);
          break;
      }
    },
  
    clearDisplay() {
      this.display.textContent = "0";
    },
  
    appendInput(value) {
      if (this.display.textContent === "0") {
        this.display.textContent = value;
      } else {
        this.display.textContent += value;
      }
    },
  
    calculate() {
      try {
        const result = eval(this.display.textContent);
        this.display.textContent = result;
      } catch (error) {
        this.display.textContent = "Error";
      }
    }
  };
  
  calculator.init();
  