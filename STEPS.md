Steps: 

1. What tables will I have? What is the relationship between my tables? (ERD)
    1. USERS(**CRUD with Favourites**)
    2. POKEMON (Fav) (API OR TABLE)
    3. User Comments (**CRUD**)

	Users 1—> M Favourite Pokemons

	Pokemon 1—>M Comments

	Users 1 —> M Comments
	
2. Create model for Pokemon 
3. Migrate models
4. Create associations in the models file



Which pages will we have?
What are the routes for the pages?
Forms?Displaying Data? 


As a User, I want to login, and see a list of pokemons to choose from (from api).

GET /pokemon/home ——> home.ejs

As a User, I want to click on a Pokemon, and add/save that Pokemon to my Pokemon list(favourites).

——>(Form) POST /pokemon/new ——> redirect to /pokemon/favorites

 (Anchor tag) GET /pokemon/new/:id

As a User, I want to be able to see a page of only my pokemons(favourites)

GET /pokemon/favorites ——> favourites.ejs

As a User, I want to be able to delete a Pokemon from my Pokemon list

(Form) DELETE /pokemon/:id —> redirect to /pokemon/favorites

As a User, I want to be able to click on one of my favourite/pokemons and see their details (and see comments)

(Link) GET /pokemon/:id ——> details.ejs

As a User, I want to be able to add a comment on my Pokemon on their detail page

(Form) POST /comment/:id/new —> redirect to /pokemon/:id detail page