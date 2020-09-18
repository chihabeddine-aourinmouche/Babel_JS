class PromptBox{
	static INPUT_CLASS_NAME = "prompt_box";

	constructor(parent=null){
		this.parent = parent;
		this.messageInput;
	}

	show(onSubmitCallback=null){
		this.hide();
		
		this.messageInput = input(PromptBox.INPUT_CLASS_NAME, null, "What would you like to ask?");
		this.parent.appendChild(this.messageInput);
		this.messageInput.focus();
		this.messageInput.value = "";
		
		this.messageInput.addEventListener("keyup", (e) => {
			e.preventDefault();
			if(e.key === "Enter"){
				if(onSubmitCallback) onSubmitCallback(this.messageInput.value);
				this.hide();
			} else if(e.key === "Escape"){
				this.hide();
			}
		});
	}

	hide(){
		if(this.messageInput){
			this.messageInput.remove();
			this.messageInput = null;
		}
	}

	blur(){
		if(this.messageInput) this.messageInput.style.filter = "blur(5px)";
	}

	unBlur(){
		if(this.messageInput) this.messageInput.style.filter = "blur(0px)";
	}
}