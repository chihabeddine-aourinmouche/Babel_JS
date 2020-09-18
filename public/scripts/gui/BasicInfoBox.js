class BasicInfoBox{
    static BOX_CLASS_NAME = "info_box basic_info_box";
    static MESSAGE_AREA_CLASS_NAME = "message_area";
    static OKAY_BUTTON_CLASS_NAME = "round_button game_button okay_button";
    static NATURAL_DURATION = 5000;

    constructor(parentBox=null){
        this.parentBox = parentBox;
        this.text;
        this.box;
        this.messageArea;
        this.okayButton;
        this.isDisplayed = false;
    }

    getParentBox(){return this.parentBox;}
    setParentBox(parentBox){this.parentBox = parentBox;}

    getText(){return this.text;}
    setText(text){this.text = text;}

    getBox(){return this.box;}
    setBox(box){this.box = box;}
    
    getMessageArea(){return this.messageArea;}
    setMessageArea(messageArea){this.messageArea = messageArea;}
    
    getOkayButton(){return this.okayButton;}
    setOkayButton(okayButton){this.okayButton = okayButton;}
    
    show(text, onConfirmCallback=null){
        this.setText(text);
        this.box = div();
        this.box.className = BasicInfoBox.BOX_CLASS_NAME;
        
        this.messageArea = div();
        this.messageArea.classname = BasicInfoBox.MESSAGE_AREA_CLASS_NAME;
        this.messageArea.innerHTML = this.text;
        
        this.okayButton = div();
        this.okayButton.className = BasicInfoBox.OKAY_BUTTON_CLASS_NAME;
        this.okayButton.addEventListener("click", () => {
            if(onConfirmCallback) onConfirmCallback();
            this.hideBox();
        });

        this.box.appendChild(this.messageArea);
        this.box.appendChild(this.okayButton);
        this.parentBox.appendChild(this.box);

        this.isDisplayed = true;
    }

    hideBox(){
        this.box.style.display = "none";
        this.box.remove();
        this.isDisplayed = false;
    }
}