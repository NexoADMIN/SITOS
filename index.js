
//Const 
const Discord = require('discord.js');
const client = new Discord.Client();
//Var
var prefix = "*";
var intervals = []

//Member count joue a :
client.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started on ${client.user.tag}, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	client.user.setActivity(`Aider ${client.guilds.size} servers | *help`);
});


client.on("guildCreate", guild => {
	//  when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`Aider ${client.guilds.size} servers | *help`);
});

client.on("guildDelete", guild => {
	// when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`Aider ${client.guilds.size} servers | *help`);
});

client.on('message', async message => {
		
    var args = message.content.substring(prefix.length).split(" ");
    //help
    
    if (message.content === prefix + "help") {
        var aide_embed = new Discord.RichEmbed()
            .setColor('#850606')
            .setTitle(`Voici les commandes disponible sur le bot `)
            .setThumbnail(message.author.avatarURL)      
            .addField('Modération', "\n*ban {mentionne @User}\n*kick {mentionne @User}\n*mute {mentionne @User}\n*unmute {demute le membre mute}\n*tempmute {temps en minute @User}\n*warn {mentionne @User}\n *clear {Nombre de messages a supprimer}") 
            //.addField('Musique', "\n*play {lien youtube}\n*skip {passer a la musique suivante}\n*stop {stop la musique}\n*pause {mes en pause la musique }\n*resume {reprend la musique") 
            .addField('Bot info', "\n*ping\n*createur\n*discord\n*invite")         
            .setFooter("Menu d'aide - Sitos")       
        message.channel.send(aide_embed);
        console.log('Commande HELP utiliser');
	}
          
	//commande user
    switch (args[0].toLowerCase()) {
		case "userstats":
  
			var userCreateDate = message.author.createdAt.toString().split(" ");
			var messageauthor = message.author.id;
  
			var stats_embed = new Discord.RichEmbed()
				.setColor("#6699FF")
				.setTitle(`Statistiques du joueurs : ${message.author.username}`)
				.addField(`ID du joueurs :id:`, messageauthor, true)
				.addField(`Date d'inscription du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
				.addField(`Tu as rejoins çe serveur le`, message.member.joinedAt)
				.setThumbnail(message.author.avatarURL)
			message.channel.send(stats_embed);
  
			break;
	  };
	  
   //commande moderation 
    if(message.content === prefix + 'exit') {
        var botOwner = message.author.id === '249911304473673728';
        if(botOwner) {
            return client.destroy();  
            console.log("Bot déconnecté")
        };
        if(!botOwner) return message.reply('tu n\'est pas l\'admin du bot ! :x:');
    }


});


//Ping
client.on('message', async message => {
    if (message.content === prefix + 'ping') {
        let msgping1 = new Date();
        let botping = new Date() - message.createdAt;
        let msgping2 = new Date() - msgping1;
        let pingembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField('API Ping : ', Math.floor(client.ping) + 'ms')
            .addField('Bot Ping : ', Math.floor(botping) + 'ms')
            .addField('Message Ping : ', '~' + Math.round(msgping2) + 'ms')
            .setTimestamp(new Date())
            .setFooter(`${message.author.tag}`);          
        return message.channel.send(pingembed)
        console.log('Commande ping utiliser');
    }
});

//*creator
client.on('message', async message => {
    if (message.content === prefix + "createur") {
        message.reply("Le créateur de Sitos est MisterZ;Ascor;Gaspar;Alex")

    }
})

//*discord
client.on('message', async message => {
    if (message.content === prefix + "discord") {
        message.reply("Le discord de support du bot **Sitos** est : https://discord.gg/GKaMhbY")
    
    }
});

//*invite
client.on('message', async message => {
    if (message.content === prefix + "invite") {
        message.reply("Le lien pour faire venir **Sitos** sur ton serveur : https://discordapp.com/oauth2/authorize?client_id=501893837363347466&scope=bot&permissions=805314750")
    
    }
});

//Ban
client.on('message', message => {
    
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.lenght).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === prefix + "ban") {
        let modRole = message.member.hasPermission("BAN_MEMBERS");
        if(!message.member.hasPermission("BAN_MEMBERS")) {
    var banperm_embed = new Discord.RichEmbed()
    .addField("Tu n'as pas la permission de faire cette commande.", "Tu as besoin de la permission BAN_MEMBERS")
    return message.channel.send(banperm_embed);
        }  
        const member = message.mentions.members.first();
        if (!member) {
    var banperm_embed = new Discord.RichEmbed()
    .setColor("E26302")
    .addField("Merci de mentionner l'utilisateur à bannir.", "*ban @user")
    return message.channel.send(banperm_embed);
        }
        member.ban().then(member => {
    var banuser_embed = new Discord.RichEmbed()
    .setColor("E26302")
    .addField(`**${member.user.username}**`, `A été banni du discord par **${message.author.username}**`)
    return message.channel.send(banuser_embed);
           message.channel.send(`**${member.user.username} a été banni du discord par **${message.author.username}`)
        }).catch(console.error)
    }
});

//KICK
client.on('message', message => {


    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.lenght).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === prefix + "kick") {
        let modRole = message.member.hasPermission("KICK_MEMBERS");
        if(!message.member.hasPermission("KICK_MEMBERS")) {
    var kickperm_embed = new Discord.RichEmbed()
    .addField("Tu n'as pas la permission de faire cette commande. :x: ", "Tu as besoin de la permission KICK_MEMBERS")
        return message.channel.send(kickperm_embed);
        }
        if(message.mentions.users.size  === 0) {
    var kickuser_embed = new Discord.RichEmbed()
    .addField("Merci de mentionner l'utiliseur a éjécter", ":hammer_pick:")
        return message.channel.send(kickuser_embed);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
    var kickintrouvable_embed = new Discord.RichEmbed()
    .addField("Cet utilisateur est introuvable ou impossible à expulser. :shrug: ")
        return message.channel.send(kickintrouvable_embed);
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci. :x:").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.channel.send(`***${member.user.username}** a été expulsé du discord par **${message.author.username} !***:white_check_mark: `)
        }).catch(console.error)    
}});

//clear
client.on('message', message => {
	
    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission ! :x:");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Précise le nombre de messages que tu veux supprimer ! :smile:")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Vous avez supprimé **${args[0]}** messages ! :white_check_mark: `);
        })
    };

    //Musique 

    //mute classique
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
    
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
    
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        });
    }
    
    //unmute 
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    
        if(message.mentions.users.size === 0) {
            return message.channel.send('Vous devez mentionner un utilisateur !');
        }
    
        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il l'existe pas !");
        }
    
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission !");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }

});




//TOKEN
client.login("NTAxODkzODM3MzYzMzQ3NDY2.Dsdu0w.l-4l91usEXmQ0aCKdHkXMM6wXj8");

