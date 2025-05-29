# Sign up user 1
POST http://localhost:9000/signup
{
  "name": "Alice Svensson",
  "email": "alice.svensson@example.com",
  "password": "SecurePass123!",
  "username": "alice_s",
  "about": "Passionate about coding and design",
  "employment": "Frontend Engineer",
  "hometown": "Stockholm",
  "website": "https://www.alicesportfolio.com"
}
HTTP 201
[Asserts]
jsonpath "$.userId" != null
[Captures]
user-id-1: jsonpath "$.userId"

# Sign up user 2
POST http://localhost:9000/signup
{
  "name": "Björn Karlsson",
  "email": "bjorn.karlsson@example.com",
  "password": "AnotherPass456!",
  "username": "bjornk",
  "about": "QA tester and automation enthusiast",
  "employment": "QA Specialist",
  "hometown": "Malmö",
  "website": "https://www.bjornk-testing.com"
}
HTTP 201
[Asserts]
jsonpath "$.userId" != null
[Captures]
user-id-2: jsonpath "$.userId"

# Login user 1
POST http://localhost:9000/login
{
  "email": "alice.svensson@example.com",
  "password": "SecurePass123!"
}
HTTP 200
[Captures]
token-1: jsonpath "$.token"

# Get user profile
GET http://localhost:9000/profile
Authorization: Bearer {{token-1}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Alice Svensson"
jsonpath "$.email" == "alice.svensson@example.com"
jsonpath "$.username" == "alice_s"
jsonpath "$.about" == "Passionate about coding and design"
jsonpath "$.employment" == "Frontend Engineer"
jsonpath "$.hometown" == "Stockholm"
jsonpath "$.website" == "https://www.alicesportfolio.com"

# Get user profile by ID
GET http://localhost:9000/users/{{user-id-2}}
Authorization: Bearer {{token-1}}
HTTP 200
[Asserts]
jsonpath "$.name" == "Björn Karlsson"
jsonpath "$.email" == "bjorn.karlsson@example.com"
jsonpath "$.username" == "bjornk"
jsonpath "$.about" == "QA tester and automation enthusiast"
jsonpath "$.employment" == "QA Specialist"
jsonpath "$.hometown" == "Malmö"
jsonpath "$.website" == "https://www.bjornk-testing.com"

# Post a new tweet user 1
POST http://localhost:9000/tweets
Authorization: Bearer {{token-1}}
{
  "text": "Excited to start this new project! #helloWorld"
}
HTTP 201
[Asserts]
jsonpath "$.text" == "Excited to start this new project! #helloWorld"

# Post a second tweet user 1
POST http://localhost:9000/tweets
Authorization: Bearer {{token-1}}
{
  "text": "Automation makes life easier #testing"
}
HTTP 201
[Asserts]
jsonpath "$.text" == "Automation makes life easier #testing"

# Post a third tweet user 1
POST http://localhost:9000/tweets
Authorization: Bearer {{token-1}}
{
  "text": "JavaScript is amazing! #coding #javascript"
}
HTTP 201
[Asserts]
jsonpath "$.text" == "JavaScript is amazing! #coding #javascript"

# Login user 2
POST http://localhost:9000/login
{
  "email": "bjorn.karlsson@example.com",
  "password": "AnotherPass456!"
}
HTTP 200
[Captures]
token-2: jsonpath "$.token"

# Follow user 1
POST http://localhost:9000/users/{{user-id-1}}/follow
Authorization: Bearer {{token-2}}
HTTP 200

# Get recent tweets from followed users (user 2 following user 1)
GET http://localhost:9000/tweets
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$[0].text" == "JavaScript is amazing! #coding #javascript"
jsonpath "$[0].name" == "Alice Svensson"
jsonpath "$[0].username" == "alice_s"

# Unfollow user 1
POST http://localhost:9000/users/{{user-id-1}}/unfollow
Authorization: Bearer {{token-2}}
HTTP 200

# Get recent tweets from followed users (should be none)
GET http://localhost:9000/tweets
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$" count == 0

# Get recent tweets from a specific user (user 1 tweets)
GET http://localhost:9000/tweets/users/{{user-id-1}}
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$[0].text" == "JavaScript is amazing! #coding #javascript"
jsonpath "$[0].name" == "Alice Svensson"
jsonpath "$[0].username" == "alice_s"

# Follow user 1 again
POST http://localhost:9000/users/{{user-id-1}}/follow
Authorization: Bearer {{token-2}}
HTTP 200

# Get trending hashtags
GET http://localhost:9000/tweets/trending
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$" contains "#javascript"
jsonpath "$" contains "#coding"
jsonpath "$" contains "#helloWorld"
jsonpath "$" contains "#testing"

# Search for users
GET http://localhost:9000/search?find=Alice
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$.tweets" count == 0
jsonpath "$.users" count >= 1

# Search for tweets
GET http://localhost:9000/search?find=Excited
Authorization: Bearer {{token-2}}
HTTP 200
[Asserts]
jsonpath "$.tweets" count == 1
