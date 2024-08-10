import { Base } from "./Base";
import { Tweet } from "./Tweet";
import { User } from "./User";

export class Like extends Base {
    private _user: User;
    private _tweet: Tweet;

    constructor(user: User, tweet: Tweet) {
        super();
        this._user = user;
        this._tweet = tweet;
    }
    
    public get getUserLike() : User {
        return this._user;
    }

    public get getTweetLike(): Tweet {
        return this._tweet;
    }
    
}