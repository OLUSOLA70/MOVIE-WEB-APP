Okay this is what was done;

Movie Web Application
This is a React-based web application that allows users to search for and view details about movies. The application fetches movie data from a public API and displays the information in a user-friendly interface.
Features:
Search Functionality: Users can search for movies by title, and the application will display the search results.
Movie Details: Users can click on a movie from the search results to view detailed information about the movie, such as the plot, cast, and ratings.
No Backend Server: This application is designed to run entirely on the client-side, without the need for a backend server. It makes direct API requests to fetch the movie data.

How it Works
The application uses the The Movie Database (TMDb) API to fetch movie data. It sends HTTP requests to the TMDb API endpoints to retrieve the necessary information, such as movie titles, plots, cast, and ratings.
The client-side application is built using React, a popular JavaScript library for building user interfaces. It utilizes React components, state management, and lifecycle methods to handle the API requests, data processing, and rendering of the user interface.
To avoid the need for a backend server, the application makes the API requests directly from the client-side JavaScript code. This approach is possible because the TMDb API provides public, accessible endpoints that can be called from the browser.
