
# Github Search Repo

This simple project aims to return results to the user based on a search phrase passed from the Github Api.

The project is built in `Ruby On Rails` and a `Reactjs` client.


### Considerations:

- Architecture: Monolith.
- Caching: No caching added because of time contraints but as the app grows to support lots of users and if this is a majorly used fearure, we may consider caching previously fetched requests.
- This runs on the main thread because its data in demand and its not great UX to defer it, should the load of requests grow, its own service would make sense.
- UI is build in React and React Query. Requery has excellent server data caching strategies to limit calls to the server
- Security: For this demo, I only took care of origins from which we expect the API to be called, other headers can be added to make this better.
- Database: None was needed in this scenario.
- Tests: Rspec


## Features

- Search
- Sort Data by [stars, forks, help-wanted-issues, updated]
- Pagination
- Simple Swagger Api documentation


## Run Locally

Clone the project

```bash
  git clone https://github.com/NicholusMuwonge/github-repo-search.git
```

Go to the project directory

```bash
  cd github-repo-search
```

Install dependencies

```bash
  bundle install
```

Add Project Master.key To be able to Access the crentials, I use Rails credentials. I will share this on request.

```bash
  bundle install
```

Start the server

```bash
  bundle exec rails s
```

#### Frontend:

Navigate to the Frontend folder in the project
```bash
 cd frontend/github-repo-search
```

Install dependencies with your fav package manager, I used `bun` for this and build tool `Vite`

```bash
  bun install / yarn / npm i
```

Add Environment variables like your backend service url host in a `.env` file, follow the `.env.example`

```bash
  VITE_HOST=
```

Start the server

```bash
bun run dev / yarn dev / npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  bundle exec rspec
```

I didn't get plenty of time to write those for the frontend as well


## Screenshots

![App Screenshot](https://ibb.co/ry7RVyg)


## Documentation

Run this in the terminal
```bash
rswag:specs:swaggerize
```

and then Visit

`http://localhost:3000/api-docs/index.html`
