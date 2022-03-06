B-YEP-500-STG-5-1-yearendproject-alexandre.sauner

# Run the project

`docker-compose up --build`

## Extra steps for the server

To make the webhooks work while respecting the subject and run the server on a local port, we need some additional steps.

Hookdeck is a tool that allows us to retrieve webhooks even when developing locally. It is temporary until we deploy it.

### Install

Go to this page: https://github.com/hookdeck/hookdeck-cli/releases/tag/v0.4.4

Download the package corresponding to your OS.\
(Ubuntu: `hookdeck_0.4.4_linux_amd64.deb`, Windows: `scoop bucket add hookdeck https://github.com/hookdeck/scoop-hookdeck-cli.git`)

Then install the package.\
(Ubuntu: `dpkg -i hookdeck_0.4.4_linux_amd64.deb`, Windows: `scoop install hookdeck`)

Finally install `expect` tool.

### Run

#### First time

Go in `server` directory.

Give the right to the two `hookdeck*.sh` file the right to be executed.\
(ubuntu: `chmod 764 hookdeck*.sh`, Windows: TODO)

Then You have to run this command in the server direcory:
`./hookdeckConfig.sh`

It will create a `.env.tmp` file with the right tunnels endpoint from every services.

Example:
```env
GITHUB_WEBHOOK=https://events.hookdeck.com/e/src_XXXX
TRELLO_WEBHOOK=https://events.hookdeck.com/e/src_XXXX
```

You then just have to copy this in your local .env

Keep the script running until you stop the server.

#### All other times

Just run the `hookdeckConfig.sh` and that all.

Keep the script running until you stop the server.
