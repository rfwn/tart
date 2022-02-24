
# Tart

Start your discord bot without pain, Everything is managed and you just have to write the commands and events.


## Features

- Auto-register Slash Commands
- Autoreload commands
- Sharding support
- Custom logger
- Statistics API


## Installation

```bash
$ git clone https://github.com/rfwn/tart.git
$ cd tart
$ npm install
```

After Installation you just need a few things to set up. Firstly create a file named `.env` in main folder with the following content:
```env
TOKEN=<Your Bot Token>
CLIENT_ID=<Bot Account Id>
OWNER_ID=<Your Id>
SERVER_ID=<Dev Server Id>
MONGO=<MongoDB URl>
```

Then create a folder named `logs` in the main directory and then, run the bot with this command.
```bash
node .
```

## Support

I'm available on Discord with the id `rfwn#8866` all time. Feel free to ask for any help.

## License

[MIT](https://choosealicense.com/licenses/mit/) - Feel free to edit and publish the code unless you notice the original source.

