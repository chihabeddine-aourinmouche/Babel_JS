class Subscriber{
    constructor(subscriberID){
        this.subscriberID = subscriberID;
    }

    getSubscriberID(){
        return this.subscriberID;
    }

    receiveNotification(notification, callback){
        callback();
    }

	subscribeToObserver(observer){
		observer.addSubscriber(this);
	}
}