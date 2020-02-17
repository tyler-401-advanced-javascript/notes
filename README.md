# LAB - Class 06

## Project Name
Notes CLI program. Create, read, update, categorize, and delete notes directly from the command line. Store them in a Mongo Database. 

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
Install mongo. With brew if possible. 

`brew tap mongodb/brew`

`brew install mongodb-community@4.2`

`brew services start mongo-community`


### Using the program

- Create a note: 

`node index.js -a|--add "your note!"`


`node index.js -a|--add "your note!" -c|--category TOAST|NOTE|UNCAT`

- List all notes: 


`node index.js -l|--list
`

- List all notes in a category

`node index.js -l|--list UNCAT|NOTE|TOAST
`
- Delete a specific note

`node index.js -d|--delete {note id}
`
- Update a specific note's category or text

`node index.js -u|--update {note id} -t|--text|-c|-category {the new text or category}`




#### Tests

Currently in pre-alpha super baby break-me mode. Use at your own risk. No tests written for DB operations yet. Most controller tests run. 



#### UML

![UML diagram]()
