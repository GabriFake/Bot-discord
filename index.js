

const { Client, Intents, MessageButton, MessageActionRow, DiscordAPIError, MessageEmbed} = require('discord.js');

const intents = new Intents(32767);

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
//
//

// MESSAGGIO BOT ONLINE
client.once('ready', () => {
    console.log('Bot online!');
});


//TICKET

client.on('messageCreate', (message) => {
    if(message.content == '!ticket') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('negozio')
                .setLabel('Ticket Assistenza')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('war')
                .setLabel('Ticket Vendite')
                .setStyle('PRIMARY'),
                new MessageButton()
                .setCustomId('oggetipersi')
                .setLabel('Ticket Partner')
                .setStyle('PRIMARY'),
            )
                message.channel.send({ content: 'Clicca un Bottone qui sotto per aprire un ticket!', components: [row] })

                const collector = message.channel.createMessageComponentCollector()
                let embedErrore = new MessageEmbed()
                .setTitle('Impossibile creare un ticket:')
                .setDescription('Hai già creato un ticket!Pensi sia un errore? Contatta un membro dello staff in privato!')

                collector.on('collect', async i => {
                    if (i.customId === 'negozio') {
                        if(i.member.roles.cache.has("921150183931248701")) {
                            return await i.reply({ embeds: [embedErrore], ephemeral: true});
                        };
                    
                        const channel = await message.guild.channels.create(`Ticket assistenza ${message.author.username}`);
                        channel.setParent("822783272350253056");
                        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                        channel.permissionOverwrites.create(message.member.id, { VIEW_CHANNEL: true });
                        i.reply({ content: 'Il ticket è stato creato', ephemeral: true });
                        const ruoloticket = i.member.guild.roles.cache.find(r => r.name === 'Ticket Attivo');
                        i.member.roles.add(ruoloticket);
                        channel.send("Grazie per aver aperto un ticket! Scrivi pure qui la tua richiesta!");
                        channel.setTopic(`User ID: ${message.author.id}`);
                    }
                }),
                collector.on('collect', async i => {
                    if (i.customId === 'war') {
                        if(i.member.roles.cache.has("921150183931248701")) {
                            return await i.reply({ embeds: [embedErrore], ephemeral: true});
                        };
                    
                        const channel = await message.guild.channels.create(`Ticket vendite ${message.author.username}`);
                        channel.setParent("822783272350253056");
                        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                        channel.permissionOverwrites.create(message.member.id, { VIEW_CHANNEL: true });
                        i.reply({ content: 'Il ticket è stato creato', ephemeral: true });
                        const ruoloticket = i.member.guild.roles.cache.find(r => r.name === 'Ticket Attivo');
                        i.member.roles.add(ruoloticket);
                        channel.send("Grazie per aver aperto un ticket! Scrivi pure qui la tua richiesta!");
                        channel.setTopic(`User ID: ${message.author.id}`);
                    }
                }),
                collector.on('collect', async i => {
                    if (i.customId === 'oggetipersi') {
                        if(i.member.roles.cache.has("921150183931248701")) {
                            return await i.reply({ embeds: [embedErrore], ephemeral: true});
                        };
                    
                        const channel = await message.guild.channels.create(`Ticket Partner ${message.author.username}`);
                        channel.setParent("822783272350253056");
                        channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false });
                        channel.permissionOverwrites.create(message.member.id, { VIEW_CHANNEL: true });
                        i.reply({ content: 'Il ticket è stato creato', ephemeral: true });
                        const ruoloticket = i.member.guild.roles.cache.find(r => r.name === 'Ticket Attivo');
                        i.member.roles.add(ruoloticket);
                        channel.send("Grazie per aver aperto un ticket! Scrivi pure qui la tua richiesta!");
                        channel.setTopic(`User ID: ${message.author.id}`);
                    }
                })

    }
});

client.on("message", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }

    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var user = message.mentions.members.first();
                if (!user) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(user).has("VIEW_CHANNEL", true)

                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }

                message.channel.updateOverwrite(user, {
                    VIEW_CHANNEL: true
                })

                message.channel.send(`${user.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }

        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }

                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)

                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }

                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }

                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })

                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
});

// LINK FIVEM
client.on("ready", () => {
    const channel = client.channels.cache.get("838470257466671104");
    const button1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Clicca qui per entrare in game!")
        .setURL("https://cfx.re/join/vovmr5")
    );
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("SERVER ON! TUTTI DENTRO!")
      .setFooter("Created By !GสbriFสҜe❅#6860")
      .setTimestamp()

    setInterval(() => {
      channel.send({
        content: `Gladius Roleplay ||@everyone||`,
        components: [button1],
        embeds: [embed]
      });
    }, 10800000);
  });
  
  // BUONGIORNO
client.on("ready", () => {
    const channel = client.channels.cache.get("838470257466671104");
  
    setInterval(() => {
      channel.send({
        content: `Buongiorno a tutti!`,
      });
    }, 86400000);
  });

  // BUONAPPETITO
  client.on("ready", () => {
    const channel = client.channels.cache.get("838470257466671104");
  
    setInterval(() => {
      channel.send({
        content: `Buon appetitto Boys!`,
      });
    }, 86400000);
  });
 
 // !SERVER
  client.on("messageCreate", message => {
    if(message.content == "!server"){
      const embed2 = new MessageEmbed()
      .setTitle("Come entrare nel server?")
      .setDescription("Semplice basta cliccare nel bottone qui sotto!")
      .setColor("RED")
      .setFooter("Created By !GสbriFสҜe❅#6860")
      .setTimestamp()

      const button2 = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setLabel("Clicca qui per entrare in game!")
          .setURL("https://cfx.re/join/vovmr5")
      );

      message.channel.send({ components: [button2], embeds: [embed2] })
    }
  });

//TOKEN
client.login("OTIxMTQ2MDMzNjMzOTA2NzI5.YbuqGA.B6qYsPL04gDZ35b8qLCLEkA6EBY");
