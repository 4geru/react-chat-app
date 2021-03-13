```
room: {
    id: string,
    name: string,
    tags: tag.name[],
    joins: {
        user.name,
        user.icon
    },
    actives: {
        user.name,
        user.icon
    },
    messages: {
        id: string,
        message: string,
        user.name,
        user.icon
    }
}

tag: {
    id: string,
    name: string,
}

user: {
    id: string,
    name: string,
    icon: string,
    followers: {
        user.name,
        user.icon
    },
    follows: {
        user.name,
        user.icon
    },
    favorites: {
        room.messages
    },
    joined: {
        room.name,
        room.id
    }
}
```
