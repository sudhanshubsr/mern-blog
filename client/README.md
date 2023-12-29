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


### How to Set up a S3 Bucket for File Uploads
- Create a new bucket
- Set the permissions to public
- Don't change anything and create bucket
- Now create a new user and give it full access to S3 bucket which we created
- Assign a the user a new policy and select S3 bucket policy
- Now copy the ARN of the bucket and paste it in the bucket policy
- yarn add @aws-sdk/client-s3
