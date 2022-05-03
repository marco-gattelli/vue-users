## Tools

1) `Vite` as frontend build (and develop) tool.
2) `Vue 3` as the frontend framework.
3) `Vitest` as the unit-test framework.
4) `Cypress` as the e2e test framework.
5) `TypeScript` to add strongly typing to the JS.
6) `Node` in the version 17.3.0
7) `VueUse` that provides a collection of essential Vue Composition Utilities.
8) `Tailwind` as the utility-first CSS framework. 

## How to run the project

First of all you should download the code and be sure to have installed the right version of node in your machine, my recommendation is the v17.3.0 the one I used to develop the project.

Once you have the code you can simply run `npm i` to install all the dependencies and `npm run dev` to start the development server.

If you are interested in running the unit tests, simply run the command `npm run test`.

If you are interested in running the e2e tests, simply run the command that will open cypress, `npm run cypress:open`, and follow the UI.

## Considerations
I read the pdf describing the aim of system and there is something that probably I misunderstand.
What I understand from the following phrase:
``"a query must be performed to show, under the search box, the first 10
results and then as the user scrolls more results are shown"``
is that the first query could return more than 10 results and scrolling the page the app should show another 10 results (**but without making another query**).
In other words some kind of pagination on the client side.

Additionally, as I saw that there isn't any variable regarding pagination in the query you gave me, I also suppose that the pagination should be performed client-side. But also I create a query that takes also the pagination variable, it is located in the `src/api/users/users.ts` file, it is called `paginatedQuery`. 

The problem is that when I made the first query to the server I realized that the result was limited by 10 users, you can make another call to the server requesting the second page, but it is empty. It seems like the API just return only 10.

So, in order to test my app, I developed some e2e tests mocking the server response, returning more than 10 results (30) and the test pass, so the client-side pagination works properly 👍

### watchDebounced
To avoid making a request every input the user insert I used the `watchDebounced` functions that permits easily to debounce the input value. The request will be performed after the debounce time (at the moment set at 300 ms).

### useIntersectionObserver
In the list of users I use this utility from `vueuse` to intercept when the end of the lists has been reached. Once the end is reached we emit an event that informs the father component to load more data, basically to increase the page number.

### useUsers
In order to retrieve the users and manage the possible states (success, error, loading) I developed a composable called `useUsers` that exposes the internal states and also return a reactive array of users.
In this way the code is decoupled from the App component and could be used in another component very easily.

### CommonInput
I developed this input component thinking about reusability, as the app became bigger and bigger could be useful have this kind of *atomic* components.

### UsersSkeleton
Instead of use a spinner or some kind of loading indicator I prefer to use a skeleton so the user has a better UX experience.
