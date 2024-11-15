
# Utilisation du Bot

Pour utiliser ce bot correctement, il est important de suivre la règle suivante :

Un message doit obligatoirement contenir la mention `@member`, sinon le membre ne pourra pas voir le fil qui lui est dédié.

## Configuration du Bot

- **Token du Bot** : Modifiez le fichier `messages.json` pour configurer le token du bot en remplaçant `'TOKEN'` par votre propre token.
- **Salon de Discussion** : Modifiez le fichier `index.js` pour configurer le salon en remplaçant `'salon'` par l'ID du salon.
- **Messages du Bot** : Modifiez le fichier `messages.json` pour personnaliser les messages à envoyer.

### Utilisation des Tags dans les Messages

Les messages peuvent inclure des tags pour référencer un rôle, un canal ou un emoji personnalisé :

- **Rôle** : `<@&role-id>` pour référencer un rôle.
- **Canal** : `<#channel-id>` pour référencer un canal.
- **Emoji Personnalisé** : `<:custom_emoji_name:emoji-id>` pour référencer un emoji.

#### Comment Obtenir l'ID de Chaque Élément

Pour obtenir les IDs nécessaires, suivez ces étapes sur Discord :

- **Rôle** : Tapez `\@role_name` — et votre message sera affiché sous la forme `<@&role-id>`.
- **Canal** : Tapez `\#channel_name` — et votre message sera affiché sous la forme `<#channel-id>`.
- **Emoji** : Tapez `\:emoji_name:` — et votre message sera affiché sous la forme `<:emoji_name:emoji-id>`.

### Boutons

Les boutons peuvent être ajoutés à un message. Il existe cinq styles de boutons :

- **PRIMARY** : Bouton de style principal.
- **SECONDARY** : Bouton de style secondaire.
- **SUCCESS** : Bouton de style succès.
- **DANGER** : Bouton de style danger.
- **LINK** : Bouton de style lien.

Pour ajouter un bouton, ajoutez les informations suivantes dans le fichier `messages.json` :

```json
 "buttons": [
      {
        "label": "Bouton 1",
        "style": "PRIMARY",
        "customId": "quest"
      },
      {
        "label": "Bouton 2",
        "emoji": "😎",
        "style": "SECONDARY",
        "customId": "roles"
      },
      {
        "label": "Salons vocaux inédits",
        "emoji": "<:visage:1292182745337954345>",
        "style": "SUCCESS",
        "customId": "vocal"
      }
    ]
```
