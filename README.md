# The Periodic Table of Elements in Vue

Link to the live app on Netlify:

https://andys-periodic-table.netlify.app/

Link to the database on Heroku:

https://andys-periodic-table.herokuapp.com/

## Setup:
My initial project idea wasn't a periodic table. In fact, it had nothing to do with science. I wanted to revamp my torrent database app so that it actually pulled from a live list. I've wanted to update my previous app (https://github.com/tuftsanti/project2) since the start as it never functioned the way I wanted it to. If option one wasn't successful, I didn't have an option two. I was dead-set on completing this task with absolutely no backup plan; go big or go home. Suffice it to say, I still couldn't get it working. Forced to start over, I wondered how I could combine my previous career and my eventual new career paths together. Then it hit me like a whiff of Acetone; a periodic table. Not just any static, boring, run of the mill periodic table. A dynamic, searchable, sortable periodic table for the chemist on the go. Or in the lab if you will. That could be easily experienced on a mobile phone. 
  
## Execution:
For the assignment I needed to learn a new technique or technology I'm unfamiliar with, while also being full stack. I'd heard of Vue and thought I could quickly pick it up, so I watched some videos and found some tutorials. Learning a new framework is hard despite how user friendly it may be (Vue is that), but I eventually had a working app. It didn't do anything, but it rendered, so a massive initial weight lifted off my shoulders. I quickly found a few elemental API's online that I could pull from to display my data. I pulled the API in Vue and had a searchable list of elements. But this needs to be full stack, and without a back end, it's just a web app, and I fail the assignment. 

I set up a database with Express and MongoDB, but what/how to store there? I eventually moved the axios get of the API to the back end and set the front end to pull from that. I even put in a fail-safe file that can be read from automatically if the API is non functioning. I still had a searchable app, time to work on sorting. What good is a periodic table if you can't sort it? I spend days coordinating my sort functions to render on button clicks, but in the end it didn't work properly. I could sort in the back end with JS, but couldn't translate to the front. I couldn't get the data pulled to the front to sort either, so I omitted it. It's unfortunate, as I consider it crucial, but I'll get it eventually. I was able to add a randomizer route that will take you to a random element's show page.

With a functioning app that was at least searchable, it was time to style. I'd never used Bulma before, but it looked like it had the features I needed. Just like any style framework, Bulma is great until it doesn't do what you want. Or it does specifically what you told it not to. I tried to use it freely, but some instances called for standard CSS techniques. The main page lists the elements in order by atomic number, and the background is the spectral emission of Hydrogen. I tried to make that specific to each element, but the data wasn't entered properly in the API. Search and scroll are dynamic, and I added a "return to top" button. On mobile, the navbar options enter a hamburger style menu. Clicking on an element renders the square from the periodic table that every chemist is familiar with. Scrolling down reveals the remaining elemental information from the API. Additionally, I was able to change the background color of the square to the CPK color of the element. This color can be verified in the CPK chart at the bottom of each element's page. 
  
## Conclusion
In the end, I took a shine to Vue; I find it easy having the HTML, JS, and CSS all in one file. I was so familiar with it after this project, I made my personal portfolio with it as well. I would absolutely use this in a lab as a quick reference material. While it doesn't do everything I'd like, I'm still happy with the result

## Future Work
  * Sorting, sorting, and more sorting. This should realistically be sortable by every property in the API
  * The home page display may be off-putting for some. I wanted a single column list, but this could easily be adjusted
  * In addition to the list, I could make the standard periodic table we all know, but with clickable boxes. Can you see Hydrogen on the table and want to learn about it? Click it!
  * I toyed with the idea of inline information hidden on load, then displayed when clicked, but ultimately decided to route each click to its own id
