class IllustratedInfoBox extends BasicInfoBox{
    static BOX_CLASS_NAME = "info_box info_bubble";
    static MESSAGE_AREA_CLASS_NAME = "message_area";
    static OKAY_BUTTON_CLASS_NAME = "round_button game_button okay_button";

    constructor(parentBox=null){
        super(parentBox);
        this.illustration;
    }

    getIllustration(){return this.illustration;}
    setIllustration(illustration){this.illustration = illustration;}

    show(text, onConfirmCallback=null, illustration=null){
        super.show(text, onConfirmCallback);

        this.box.className = IllustratedInfoBox.BOX_CLASS_NAME;
        this.messageArea.classname = IllustratedInfoBox.MESSAGE_AREA_CLASS_NAME;
        
        this.setIllustration(illustration);
        if(this.illustration !== null){
            illustration.className = "message_image";
            
            this.box.appendChild(illustration);
        }
    }
}