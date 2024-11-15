import { User } from "./classes/User";

const user1 = User.createUser("Johann", "johann123", "johann@exemplo.com", "senha123");
const user2 = User.createUser("Maria", "maria123", "maria@exemplo.com", "senha123"); 
const user3 = User.createUser("José", "jose123", "jose@exemplo.com", "senha123");

if (user1 && user2 && user3) {
    const tweet1 = user1.sendTweet("Bom dia pessoal, prazer em conhecê-los !");
    tweet1.like(user2); 
    tweet1.like(user3);
    tweet1.reply("Prazer em conhecê-lo Johann", user3);

    user1.follow(user2);  
    
    console.log("--------------------------------------------------------");
    user1.showFeed(); 
}

console.log("--------------------------------------------------------");

if (user1 && user2 && user3) {
    const tweet2 = user2.sendTweet("Lindo dia de praia, com meus amigos !!!");
    tweet2.like(user1);
    tweet2.like(user3);
    tweet2.reply("Que paisagem linda Maria !", user3);
    tweet2.reply("Espero que esteja se divertindo !", user1);

    user2.follow(user1);  

    console.log("--------------------------------------------------------");
    user2.showFeed();  
}
