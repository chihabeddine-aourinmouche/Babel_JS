class InfoBoxFactory{
	static create(illustrated){
		switch(illustrated){
			case true:
				return new IllustratedInfoBox();
			case false:
				return new BasicInfoBox();
		}
	}
}