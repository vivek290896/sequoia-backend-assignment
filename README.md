# Backend Assignment

### Build a "headless" simple Trello board application to manage users and their tasks.	

#### This Application has three entities:

  - **Users**: Users of the application. 
    - Each user is uniquely identified by his/her email address.
    - There will be two roles: Admin and User. 
      - Admin will be able to create/archive/unarchive Project Boards
      - Admin will be able to view all users of all project boards
      - Admin will be able to add new user or deactivate existing user from Project Board
      - Non-Admin users will be able to view all the users of Project Boards that they're assigned to.
				
  - **Project Boards**: Represents a Project which will have tasks defined under it. A non-admin user needs to be assigned to a particular Project Board in order to view it. 
		
  - **Tasks**: An atomic entity that defines the objective. 
    - A Task is assignable to/by a user of the system. 
    - A Task belongs to a particular Project Board.
    - A Task should have minimum of the following properties: Title, Description, Assignee, Assigner, Due Date, Status.
    - A Task can be added/removed/edited
    - A Task can be in a particular Status. For ex: "Backlog", "InProgress", "Done".(Optional Task)
    - User can create any number of new statuses or remove existing Status in a Project Board and once defined, A Task can be assigned to one of these statuses.(Optional Task)
	


#### Technology stack with which you have to write with:
  - All the above CRUD operations should be exposed as REST endpoints
  - _Programming language_: 
  	- [X] NodeJS
	- [ ] Golang
	- [ ] Python
  - _Database_: 
  	- [X] MySQL
	- [ ] Postgresql
	- [ ] MariaDB
	- [ ] SQLite
	- [ ] MS SQL
  - _Framework_: We don’t care as long it serves the above three pointers. We would love to see if you can implement in Erlang or Rust. 


##  We are not looking for UI implmentation of the board 

#### Our expectations when you say your code is ready:
  - [X] Write all the APIs visualizing if there is a Trello board UI for this. We are not expecting any UI components
  - [X] Quality code standards. Hope you have done lint check before pushing the code. No one likes to hear, "I didn't have time so..".
  - [X] Apt input validations. Think from the end user perspective(username contains only alphanumerics, email satisfies the standard regex pattern, etc.,). They say "Something went wrong, please try again" shows laziness of a developer, so don't be one. More your code breaks, more we lose trust on your quality.
  - [ ] (Optional Task) Tests. Be it Unit or Integration or API tests. At least one of them because only your tests can assure your code is working. 
  - Update documentation in README.md file for us which should have the following
		○ [X] How to build and run your code
		○ [ ] What are the assumptions you have made during development
		○ [x] Checkmark these expectations when you have finished them
	

#### We'd be really impressed if you include at-least one of the following below along with fulfilling our above expectations:
  - [X] Dockerize your code.
  - [X] Generate Open API documentation using Swagger or related(Postman collection, etc.,)
  - [ ] Covered 99.99% possible cases without errors and introduce new use-cases wherever "necessary" -- True traits of 10x developer :P
  - [ ] Build admin panel UI for it using any frontend framework.
  


#### Interested enough? Steps to go ahead about this assignment:
  - Fork this Github repository. [Help link](https://guides.github.com/activities/forking) if needed
  - Keep committing your changes on this forked repository regularly, we prefer if you are comitting several small changes instead of one large commit. Dont worry, only your final commit will be considered for evaluation.
  - Make sure you keep editing this README file on your forked repository and mark checkboxes above on the things you completed ([Help link](https://www.markdownguide.org/extended-syntax/#task-lists) to mark a checkbox in this README markdown)
  - Once you have finalised, create a Pull Request to this original repository. We'll review it and get back to you with some news.
  

 
_In case of any queries, mail to Karthikeyan NG <karthikeyan.ng@sequoia.com> or Indrajeet Kumar <indrajeet@sequoia.com>. We'll revert to you with the clarifications_
 
 
# Headless-trello Rest APIs withNode.js, Express & MySQL

## Project setup
```
npm install
```

### Run
```
node server.js
```

#### Postman Collection of API's
```
https://www.getpostman.com/collections/632026cfebb8006caca8

```