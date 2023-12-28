# MERN BLOG

### Details regarding the porject

- This is a MERN stack blog application.
- This application is made using React, Node, Express and MongoDB.

### How JWT Authentication works

- A JWT token consists of 3 parts: Header, Payload and Signature.

- Stateless authentication is often preferred in stateless architectures or when building APIs where each request is expected to contain authentication information. In this case, the server does not need to keep a record of which users are logged in or which JWTs each user possesses. Instead, the server can simply verify the signature of the JWT and extract the user information from the payload.


- JWT can be sent in the following ways:
    - Authorization header
    - Query string
    - Cookies
    - URL parameter

```
