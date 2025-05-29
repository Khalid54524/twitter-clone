# Sign up user 1
POST http://localhost:9000/signup
{
"name": "User 1",
"email": "user1@gmail.com",
"password": "TopSecret1!",
"username": "user1",
"about": "I am a developer",
"employment": "Developer",
"hometown": "Göteborg",
"website": "https://www.developer.com"
}
HTTP 201
[Asserts]
jsonpath "$.userId" != null
[Captures]
user-id-1: jsonpath "$.userId"

# Sign up user 2
POST http://localhost:9000/signup
{
"name": "User 2",
"email": "user2@gmail.com",
"password": "TopSecret2!",
"username": "user2",
"about": "I am a tester",
"employment": "Tester",
"hometown": "Landvetter",
"website": "https://www.tester.com"
}
HTTP 201
[Asserts]
jsonpath "$.userId" != null
[Captures]
user-id-2: jsonpath "$.userId"

# Login user 1
POST http://localhost:9000/login
{
"email": "user1@gmail.com",
"password": "TopSecret1!"
}
HTTP 200

# Get user profile
GET http://localhost:9000/profile
Authorization: Bearer {{user-id-1}}
HTTP 200
[Asserts]
jsonpath "$.name" == "User 1"
jsonpath "$.email" == "user1@gmail.com"
jsonpath "$.username" == "user1"
jsonpath "$.about" == "I am a developer"
jsonpath "$.employment" == "Developer"
jsonpath "$.hometown" == "Göteborg"
jsonpath "$.website" == "https://www.developer.com"
