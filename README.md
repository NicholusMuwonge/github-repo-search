
# Github Search Repo

This simple project aims to return results to the user based on a search phrase passed from the Github Api.

The project is built in `Ruby On Rails` and a `Reactjs` client.


### Considerations:

- Architecture: Monolith.
- Caching: No caching was added because of time constraints but as the app grows to support lots of users and if this is a majorly used feature, we may consider caching previously fetched requests.
- This runs on the main thread because it's data in demand and it's not great UX to defer it, should the load of requests grow, its own service would make sense.
- UI is built in React and React Query. Requery has excellent server data caching strategies to limit calls to the server
- Security: For this demo, I only took care of the origins from which we expect the API to be called, other headers can be added to make this better.
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

Add Project `Master.key` To be able to access the credentials, I use Rails credentials. I will share this whenever you'd like.

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

Install dependencies with your favorite package manager, I used `bun` for this and build tool `Vite`

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

<img width="1508" alt="Screenshot 2023-10-01 at 21 21 26" src="https://github.com/NicholusMuwonge/github-repo-search/assets/43015966/c52f3166-4e83-4bfe-889f-3fe2465f2ebb">
<img width="1510" alt="Screenshot 2023-10-02 at 10 47 45" src="https://github.com/NicholusMuwonge/github-repo-search/assets/43015966/81a7aa0a-af57-4849-b127-bb1118bbbb3a">


## Documentation

Run this in the terminal
```bash
rswag:specs:swaggerize
```

and then Visit

`http://localhost:3000/api-docs/index.html`
