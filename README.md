# Pokédex

#### Deploy a full stack Pokédex app in minutes.

🛠 Built with React Native, Expo, GraphQL, AWS Amplify, AWS AppSync, AWS Lambda, and the Pokemon API

### Features

- 🦊 Scroll through 100s of Pokemon
- 💅 Animations
- 📄 Pagination
- 🔥 Serverless back end
- 🚀 GraphQL
- 💻 Deploy back end in minutes

![](./example.png)

## Deploy the App

### Deploy the back end and run the app

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/kkemple/pokedex.git
~ cd pokedex
~ npm install
```

2. Initialize the Amplify project

```sh
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y
```

3. Mock the backend to ensure app is working properly

```sh
amplify mock
```

4. Start the app and verify UI is working properly

```sh
~ expo start
```

5. Push to AWS

```sh
~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```

---

## Expo App Instructions

For instructions on using the Expo app, check out the Expo docs [here](https://docs.expo.io/versions/latest/).
