import { User } from "./User";
import { Tweet } from "./Tweet";
import { Base } from "./Base";

export class Like extends Base {
    private _user: User;
    private _tweet: Tweet;

    constructor(user: User, tweet: Tweet) {
        super();
        this._user = user;
        this._tweet = tweet;
    }

    public getUser(): User {
        return this._user;
    }

    public getTweet(): Tweet {
        return this._tweet;
    }
}
