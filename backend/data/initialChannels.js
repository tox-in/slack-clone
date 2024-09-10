const channels = [
    {
       name: 'random',
       ownerId : req.user,
       isPrivate: false,
    },
    {
        name: 'general',
        ownerId : req.user,
        isPrivate: false,
     },
]