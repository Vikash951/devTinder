## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH / profile/edit
- PATCH / profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed - Gets you the profiles of other users on platform 

/feed?page=1&limit=10 => first 10 users 1-10
