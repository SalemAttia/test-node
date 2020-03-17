## Note !!! 
all added feature you will find it in pull request you can tap between the pull requests to see my changes and note that i will add docker in diffrent pull request and i wont merge it to the master in case you don't use docker and i will add cirecleci to it as well  
## Added Feature
- Adding Eslint
- Fix all eslint issues
- Adding test dir with add requred packages
- Write Search Test
- Adding Index Page with search input and filtration by title and author name
- adding validation on input
- adding filter to the endpoint
- useing vuejs and axios for working on the front-end part

## To Be Done
- Adding Docker
- Circleci
- Front-end Part sort

## Jumia One - Book Service

Hello, I'm is a micro service in NodeJS.
I'm able to look into Goodreads and fetch books. 
But I feel a bit limited.
Can you help me to improve my skills?

I would like to be able to filter and sort my results.
Can you add me this features, I need to make sure that all data passed to me is correctly validated.

Also I feel a bit naked. Can you add a nice HTML template with a search bar and a list of cards with the results aligned?
You can call this endpoint 
~~~
/api/v1/search?q=book-name
~~~
To fetch books in a ajax request.

## How to start me
- Clone my code in a folder of your choice.
- Make sure you have node and npm installed
- run **npm install** in the root of your folder
- copy the /config/config.dist.json to /config/config.json and set your own properties (default may be fine)
- run **npm run dev** to start me

## Objectives

- Add a filter and sorting option to the search API request, those should be optional but should be validated, only valids filters or sorting should be sent
- Add a new index.html page in the root of the project and create a basic layout with a search bar. The search should be asynchronous and the results should appear just bellow the search bar.
- No need of fancy designs neither paging feature but limit to 10 results