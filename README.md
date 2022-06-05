# Hubbity

Hubbity is a volunteer hub for campaigners to gather support and receive funds.

## Inspiration

Our inspiration was the [Amplify](https://github.com/ProgramEquity/amplify) application by ProgramEquity, which is the project we're assigned to work on. The projects share a similar goal – helping campaigners gather funds.

## What it does

It helps campaigners gather funds by sharing information about their campaigns and gathering support in the form of votes by users and other campaigners.

## How we built it

- We build it using Vue 3 for the front-end and Express for the back-end.
- The database we used was PostgreSQL, with Knex as the ORM.
- We also used Vuex, first discovered inside Amplify, a state-management library for Vue 3.
- For authentication, we used JSON Web Tokens.
- Finally, after building the project, we deployed it to Heroku.

## Challenges we ran into

- The libraries and frameworks in Amplify's stack quite new to us and we had to learn them on-spot to develop the application.
- We couldn't use Vuetify as the UI library because Vue 3 didn't support it. We ended up using our own custom CSS along with Bootstrap for the UI.
- We had some TLS certificate errors within the Heroku deployment, which took us a couple of Stack Overflow searches to fix.

## Accomplishments that we're proud of

- We managed to develop a full-stack application using Vue 3 and Express, something we had never done before.
- We followed Amplify's strategy to combine development and production into the same package.json i.e. Adding different scripts for development and deployment.
- We used ESM for all the imports in the back-end application and figured out a way to still run them in Node.js using a hack that uses the 'esm' package.

## What we learned

- Vue 3
- Express (Param already knew it)
- Knex and database migrations
- Vuex for state-management
- Vue Router for front-end routing
- ESM support/polyfill for the back-end

## What's next for Hubbity

- It could be the next Amplify. :P
- We can improve the user interface and user experience.
- It can be deployed on a real cloud provider rather than Heroku.
- User-interaction can be improved on the platform.
- A payment system may be integrated.
- E-mail notifications may be made possible.

# Made with ❤ by [Mariah](https://github.com/mariah622) and [Param](https://www.paramsid.com).
