import { dataUser } from '../dataBase/DataUser';
import { tweets } from '../dataBase/Tweets';
import { Base } from './Base';
import { Tweet, TypeTweet } from './Tweet';
import { followTweet } from '../dataBase/FollowTweet';

export class User extends Base {
	private _name: string;
	private _username: string;
	private _email: string;
	private _password: string;
	private _tweets: Tweet[] = [];
	private _following: User[] = [];

	constructor(name: string, username: string, email: string, password: string) {
		super();
		this._name = name;
		this._username = username;
		this._email = email;
		this._password = password;
	}

	public get name(): string {
		return this._name;
	}

	public get username(): string {
		return this._username;
	}

	public static createUser(
		name: string,
		username: string,
		email: string,
		password: string
	): User | null {
		const userExists = dataUser.some((user) => user._username === username);
		if (userExists) {
			console.log(
				`\n       Username "${username}" já em uso, escolha outro.       `
			);
			return null;
		}

		const newUser = new User(name, username, email, password);
		dataUser.push(newUser);
		return newUser;
	}

	public sendTweet(content: string, type: TypeTweet = 'normal'): Tweet {
		const tweet = new Tweet(content, this, type);
		this._tweets.push(tweet);
		return tweet;
	}

	public follow(user: User): void {
		if (user.id === this.id) {
			console.log('\n             Você não pode seguir a si mesmo!');
			return;
		}

		const followUser = this._following.find(
			(followingUser) => followingUser.id === user.id
		);
		if (!followUser) {
			this._following.push(user);

			user._tweets.forEach((tweet) => {
				followTweet.push(tweet);
			});
		}
	}

	public show(): void {
		dataUser.forEach((user) => {
			tweets.forEach((tweet) => user.showTweet(tweet));
		});

		if (this._following.length > 0) {
			console.log('\x1b[34;3;1m\n                 Following:\x1b[0m');
			this._following.forEach((user) => {
				console.log(
					`\x1b[29;3;33m- @${this._username} está seguindo @${user.username}\x1b[0m`
				);
			});
		} else {
			console.log(
				'\x1b[3;1;13m\n                 Following:\x1b[30m\n \x1b[38;5;2m        Não está seguindo ninguem ainda !!\x1b[34m'
			);
		}
	}

	public showFeed(): void {
		console.log(`Feed de @${this._username}\n`);

		this._tweets.forEach((tweet) => this.showTweet(tweet));

		this.showTweetFollower();
	}

	public showTweetFollower(): void {
		console.log(`\nTweets dos seguidores de @${this._username}\n`);

		followTweet.forEach((tweet) => {
      if () {
        
      }

      if (this._following.includes(tweet.getAuthor)) {
				this.showTweet(tweet);
				tweet.showLike();
				tweet.showReplies();
			}
		});
	}

	public showTweet(tweet: Tweet): void {
		tweet.show();
	}
}
