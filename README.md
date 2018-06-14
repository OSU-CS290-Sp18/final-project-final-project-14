# final-project-final-project-14
This project is to design a page where a person can ask a question based on a class and
their instructor and get responses that are sorted by who the instructor is and then students.

Comment from Jacob: the initdb.json file contains a database of people. Example:

{
  "class": "cs290, etc",
  "instructor": "instructor for this class section",
  "post": "title",
  "content": "content of post goes here",
  "author": "name of poster",
  "replies": [{
    "reply": "reply content",
    "author": "name",
    "grade": "student or instructor"
  },
  {
    "reply": "reply content",
    "author": "name",
    "grade": "student or instructor"
  }]
}

possible grades --> "instructor" and "student"
possible class names: --> "cs162, cs261, cs271, cs290"
cs290 has 3 posts, cs162 has two posts, the rest each have one post. Each post has an instructor reply
cs290 and cs162 have multiple sections, didn't know if y'all wanted to divide these or not.

People are separated into first and last names, which are capitalized and have no spaces, and
a personId, which is a shortened, uncapitalized version of their first name.

according to Hess, this should work:

# Using MongoDB
mongoimport --host classmongo.engr.oregonstate.edu
  --username YOUR_MONGODB_USERNAME                 
  --db YOUR_MONGODB_DB_NAME                       
  --password YOUR_MONGODB_PASSWORD                 
  --collection <COLLECTION_NAME_HERE> --jsonArray  mongo-db-init.json
