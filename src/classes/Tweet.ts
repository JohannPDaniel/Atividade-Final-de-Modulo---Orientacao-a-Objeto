import { likes } from "../dataBase/Likes";
import { tweets } from "../dataBase/Tweets";
import { Base } from "./Base";
import { Like } from "./Like";
import { User } from "./User";

export type TypeTweet = "normal" | "reply";

export class Tweet extends Base {
    protected _content: string;
    private _author: User;  
    private _type: TypeTweet;
    private _replies: Tweet[] = [];

    constructor(content: string, author: User, type: TypeTweet = "normal") {
        super();
        this._content = content;
        this._author = author;
        this._type = type;
    }

    public get content(): string {
        return this._content;
    }

    public get getAuthor(): User {
        return this._author;
    }

    public like(user: User): void {
        if (user.username === this._author.username) {
            console.log(`\n           @${user.username} não pode curtir o próprio tweet!\n`);
            console.log("------------------------------------------");
            return; 
        }
    
        const alreadyLiked = likes.some(like => like.getUser().username === user.username && like.getTweet() === this);
        if (alreadyLiked) {
            console.log(`\n@${user.username} já curtiu este tweet!\n`);
            console.log("------------------------------------------");
            return;
        }
    
        const like = new Like(user, this);
        likes.push(like);
        console.log(`\n         @${user.username} curtiu o tweet!               \n`);
    }
                
    public reply(content: string, user: User): void {
        const replyTweet = new Tweet(content, user, "reply");
        this._replies.push(replyTweet);
        tweets.push(replyTweet)
        console.log(`\n         @${user.username} respondeu ao tweet!\n`);
    }

    public show(): void {
        this.showLike();
        this.showReplies();
    }

    public showLike(): void {
        console.log(`\x1b[44;5;82m@${this._author.username}:\x1b[0m \x1b[38;5;82m${this._content}\x1b[0m`);
        
        const tweetLikes = likes.filter(like => like.getTweet() === this);
        const likeCount = tweetLikes.length;
    
        if (likeCount === 1) {
            const firstLiker = tweetLikes[0].getUser().username; 
            console.log(`[@${firstLiker} liked this]`);
        } else if (likeCount > 1) {
            const firstLiker = tweetLikes[0].getUser().username; 
            console.log(`[@${firstLiker} and other ${likeCount - 1} liked this]`);
        } 
    }        

    public showReplies(): void {
        const relevantReplies = tweets.filter(reply => this._replies.includes(reply));
        
        if (relevantReplies.length > 0) {
            relevantReplies.forEach(reply => 
                console.log(`   > @${reply._author.username}: ${reply._content}`)
            );
        } 
    }
}    