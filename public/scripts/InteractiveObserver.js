class InteractiveObserver{
    constructor(){
        this.subscribers = [];
    }

    addSubscriber(subscriber){
        this.subscribers.push(subscriber);
    }

    removeSubscriber(subscriberID){
		this.subscribers = this.subscribers.filter((subscriber) => {
			if(subscriber.getSubscriberID() != subscriberID){
				return subscriber;
			}
		});
	}

    notify(notification){
        this.subscribers.map((subscriber) => {
            subscriber.receiveNotification(notification);
        });
    }
}