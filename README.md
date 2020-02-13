# LAB - Class 03

## Project Name
Notes CLI program!

### Author:
Tyler Sayvetz
Mongo connection setup help from Adrian, Thanks Adrian!!!!

### Links and Resources

- [submission PR] https://github.com/tyler-401-advanced-javascript/notes/pull/3  
- [ci/cd] None.

- this is a CLI, no deployment.

### Setup
Clone the repo.

- `npm i`


- Install and start Mongo DB
`brew install mongo` (?)

`brew services start mongo-community`


### Using the program

- Create a note: 

`node index.js -a|--add "your note!"`

`node index.js -a|--add "your note!" -c|--category TOAST|NOTE|UNCAT`

- List all notes: 

`node index.js -l|--list`


- List all notes in a category

`node index.js -l|--list UNCAT|NOTE|TOAST`

- Delete a specific note

`node index.js -d|--delete {note id}`



#### Tests

Currently in pre-alpha super baby break-me mode. Use at your own risk. No tests written yet.



#### UML

![UML diagram]()
