Parker Bond's Web Scraping Take Home for Podium

To run this project do the following steps

1. unzip/download project and cd into podiumScraper root
2. run `yarn`/`npm install`
3. scrape website for results by running: `node scraper.js`
  (note: you should have a results.json after running this that is used in the next step)
4. Return the top 3 results by running `node server.js`
  (note: you can also run this with nodemon `nodemon server.js`)
  (FYI: If this step fails it is very likely that you skipped step 3.)
5. View results on localhost:3000 or in the terminal.

Relevant libraries:
 `x-ray`: is used to scrape the website in question
 `sentiment`: is used to perform a sentiment analysis on the words in the review
 `react-engine` and `node-jsx`: allow me to use React to serve the results without
    needing me to set up a separate front end or do other hacks

Why I did what I did:

1. I considered several scraping solutions when deciding on how to do this project including scraperjs, artoo.js and others. I ended up going with x-ray since there
was an egghead.io video on it that made it quicker for me to get up to speed on it.
2. When examining the website in question: `http://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/?filter=ALL_REVIEWS#link`, it was obvious that filtering by just 5 star reviews would not be sufficient to limit the results. I've been dabbling in data science and thought that doing sentiment analysis on the words in the review would help better stratify the results. Luckily, a quick google search yielded a good solutions for this in the `sentiment` library and was fairly easy to set up. Other options could have been to sort all perfect reviews by date and just return the 3 most recent perfect 5 star reviews but I thought this would be better.
3. Even though the instructions were to output the top results to the console I decided to add a basic react page since I don't imagine my day to day job duties would involve running scripts to scrape websites and would instead involve building things in react. I didn't spend any time making it pretty but could if desired. I also output the top 3 into the terminal's console as well.

Challenges/Next Steps:

1. Writing old JavaScript was since I decided not to set up a full webpack/babel project.
2. Integrating a number of systems that I was new to into one project. In the future I may
   prefer to set up a separate frontend with Create-React-App and just add a proxy to a separate backend in order to ditch the react-engine and node-jsx libraries. This would also make it much easier to add in flex box and other styling solutions.
3. Deciding on the scope. Since so much of my code was 3rd party libraries that would
   be difficult to test for instance, I decided to not add Jest or other tests in favor
   of adding a more robust sorting system for the results.

How to run the tests in this project:
1. Google Jest documentation
2. Add Jest tests/linting to this project
3. Submit a PR and I'll accept it!
3. Run `yarn test`, `yarn test lint`, etc. depending on how you set things up.

Things I'd add in if I was to increase the scope and make this into a much bigger project: 1. styling with Flex-box and Glamour/styled-components/inline-styles/etc., 2. tests with Jest, 3. linting/prettier, 4. prop-types/flow for some type safety, and 5. a better user interface that allows scraping a dynamic number of pages and allow the user to determine the number of results to return all from the browser.
