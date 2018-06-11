# final-project-final-project-14
This project is to design a page where a person can ask a question based on a class and
their instructor and get responses that are sorted by who the instructor is and then students.

~~~Comment from Jacob: the initdb.json file contains a database of people. Example:

{
  "personId": "tom",
  "firstname": "Thomas",
  "lastname": "Holland",
  "classname": "Acting",
  "rank": "instructor"
},

possible ranks --> "instructor" and "student"
possible classnames: --> "Acting", "Computer Science", and "Fast Food Training"

People are separated into first and last names, which are capitalized and have no spaces, and
a personId, which is a shortened, uncapitalized version of their first name.

according to Hess, this should work:

# Using MongoDB
mongoimport --host classmongo.engr.oregonstate.edu
  --username YOUR_MONGODB_USERNAME                 
  --db YOUR_MONGODB_DB_NAME                       
  --password YOUR_MONGODB_PASSWORD                 
  --collection people --jsonArray  mongo-db-init.json~~~
