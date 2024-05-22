-Register
1.user model(name,email,password)
2.create register controller
3.create post route as /api/v1/users/register
4.update req.body in controller as password =>bcrypt(hash pw)
5.send mail to user about successful signup (option)


--login
1.create login controller
2.create post route as /api/v1/users/login
3.in controller,get req.body(email and password)
4.check if user exists in the system or not
5.if user exist,get hashePw fron database
6.compare user provided pw with hashePw
6.if result false,throw new err("email or password missmatch")
7.else "user logged in successfully"


-Blog features
a
1.add blog(create)
2.get one blog(getById)
3.get all blogs (admin)(list)
4.update a blog(updateById)
5.delete a blog(deleteById)
6.get blog specific to author(get author blogs)
7.show all published blogs only (get published blog only)
8.update the status only(updateStatus)