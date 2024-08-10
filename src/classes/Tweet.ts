import { Base } from "./Base";
import { Like } from "./Like";
import { User } from "./User";

type TweetType = "normal" | "reply"; 

export class Tweet extends Base {
    public content: string;
    public type: TweetType;
    private _fromUser: User;
    private _likes: Like[] = [];  
    private _replies: Tweet[] = [];  

    constructor(content: string, type: TweetType, fromUser: User) {
        super();

        if (!content) {
            throw new Error("Conteúdo não pode ser vazio !");
        }

        if (type !== "normal" && type !== "reply") {
            throw new Error("Tipo de tweet inválido !");
        }

        this.content = content;
        this.type = type;
        this._fromUser = fromUser;
    }

    // Método para responder a um tweet
    public reply(content: string): void {
        const replyTweet = new Tweet(content, "reply", this._fromUser);
        this._replies.push(replyTweet);
    }

    // Método para curtir um tweet
    public like(): void {
        const like = new Like(this._fromUser, this);  // Cria uma nova instância de Like associada ao usuário e ao tweet
        this._likes.push(like);  // Adiciona o like à coleção de likes
    }

    // Método para mostrar o conteúdo do tweet
    public show(): void {
        console.log(`${this._fromUser.username}: ${this.content} (Likes: ${this._likes})`);
    }

    // Método para mostrar todas as respostas ao tweet
    public showReplies(): void {
        console.log("Replies:");
        this._replies.forEach(reply => {
            reply.show();
        });
    }
}
