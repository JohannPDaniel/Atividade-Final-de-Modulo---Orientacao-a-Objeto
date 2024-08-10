import { Base } from "./Base";
import { Tweet } from "./Tweet";

export class User extends Base {
    public name: string;
    public username: string;
    public email: string;
    private _password: string;
    private _tweets: Tweet[] = [];
    private _followers: User[] = [];
    private _following: User[] = [];
    private static _usernames: Set<string> = new Set();

    constructor(name: string, username: string, email: string, password: string) {
        super();
        this.name = name;
        if (User._usernames.has(username)) {
            throw new Error("Username já em uso");  
        }
        this.username = username;
        User._usernames.add(username);

        this.email = email;
        this._password = password;
    }

    public sendTweet(tweet: Tweet): void {

    }

    public follow(user: User): void {

    }

    public showFeed(): void {
        
    }

    public showTweets(): void {

    }
}
