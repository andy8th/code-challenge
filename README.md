node-coding-question

Technologies to use for this coding question(Required):

Node.js
Express.js
JWT
Sequelize
AWS EB
AWS S3
What all things you will be evaluated on?

Naming conventions
Readability of the code
Your file structure
Error handling
How to submit?

Reply back to the email with an open github repository.

How you should work on it?

You work in an agile environment where your manager keeps on coming up with new requirements. The requirements are listed below, you have to change your code or your model and create migration files requirement by requirement. Create a branch and README.md(explaingin your approach to solve it) for each requirement listed below. Screenshots of the api call results are appreciated in README.md but not required.

Requirements:

Req1:

Create express.js app and use postgres sql as database.   db.js 
Make routes where user can register itself. Required fields of user are name, email and password. userController.js Routes.js
User can login with its email and password and gets a JWT token.   userController.js generateToken.js authMiddleware.js
Logged in users can create a post. Post has 3 attribues title, description and a photo.    postController.js Post.js
Req 2:

Your manager next week talks to the client and gives you necessary changes to be made this week.

A post will have an attribute when it was created. added creatat attribut in post.js
Post returning api will calculate the time difference like 2s ago, 10d ago, 4w ago, 8m ago and 1yr ago. added function getTimeDifference in postController.js
A post can have multiple photos but atmost 5.   adjust creatpost function in postController.js,  photo.js
A post can be editied.  add updatepost function in postController.js 
Req 3:

A post can have multiple comments. Comments will show the user who commented and the comment. commentController.js comment.js
Need to add pagination in the post and in the comments of the post.  adjust getposts function in postController.js
User have the option to create their username. Update the user model. update user.js  adjust register function in userController.js
