# Api

## Users

- Response 422

    ```json
    { 
        "error": "Please provide a valid uid"
    }
    ```

### User Profile [GET]

> /api/users/:id/profile

- Response 200

  ```json
  {
   "data": {
        "uid": string,
        "name": string,
        "avatar_url": string,
        "restricted": boolean,
        "is_private": boolean,
        // If account is public
        "created_at": string,
        "last_seen": string,
        "is_followed": boolean,
        "is_follower": boolean,
        "is_pending": boolean,
        "is_self": boolean,
    }
  }
  ```

- Response 404

  ```json
  {
   "error": "User not found"
  }
  ```

- Response 500
    `Internal Server Error`

### Avatar [GET]

> /api/users/:id/avatar

- Response 200

    ```json
    {
        "data": string
    }
    ```

- Response 204
    `User doesn't have an avatar`

- Response 500
    `Internal Server Error`

### Follow [GET]

> api/users/:id/follow

- Response 200

     ```json
    {
        "data": {
            "status": "Followed"
        }
    }
    ```

    **OR**

    ```json
    {
        "data": {
            // If user account is private
            "status": "Pending" 
        }
    }
    ```

- Response 401
    `Unauthorized`
    **OR**

    ```json
    {
        "error": "You must be logged in"
    }
    ```

- Response 500
    `Internal Server Error`

### Follow [DELETE]

> api/users/:id/follow

- Response 401

    ```json
    {
        "error": "You must be logged in"
    }
    ```

- Response 204
    `Successfuly deleted follow`

- Response 500
    `Internal Server Error`

### Followed [GET]

> api/users/:id/followed

- Response 200

    ```json
    {
        "data": [uid: string]
    }
    ```

- Response 204
    `No followings`

- Response 500
    `Internal Server Error`

### Followers [GET]

> api/users/:id/followers

- Response 200

    ```json
    {
        "data": [uid: string]
    }
    ```

- Response 204
    `No followers`

- Response 401

    ```json
    {
        "error": "You must be logged in"
    }
    ```

- Response 500
    `Internal Server Error`

### Followers [DELETE]

> api/users/:id/followers

- Response 200

    ```json
    {
        "data": success: boolean
    }
    ```

- Response 401

    ```json
    {
        "error": "You must be logged in"
    }
    ```

- Response 500
    `Internal Server Error`

### Is Following [GET]

> api/users/:id/is-following/:followed_uid

- Response 200

    ```json
    {
        "data": boolean
    }
    ```

- Response 500
    `Internal Server Error`

### Is Online [GET]

> api/users/:id/is-online

- Response 200

    ```json
    {
        "data": boolean
    }
    ```

- Response 500
    `Internal Server Error`

### Pending [GET]

> api/users/:id/pending

- Response 200

    ```json
    {
        "data": [pending_follow: {
            "follower": Profile,
            "followed_uid": string,
            "state": "pending" | "accepted" | "refused"
        }]
    }
    ````

- Response 204
    `No pending requests`

- Response 500
    `Internal Server Error`

### Pending Accept [GET]

> api/users/:id/pending/accept

- Response 200

    ```json
    {
        "data": success: boolean
    }
    ````

- Response 500
    `Internal Server Error`

### Pending Refuse [GET]

> api/users/:id/pending/refuse

- Response 200

    ```json
    {
        "data": success: boolean
    }
    ````

- Response 500
    `Internal Server Error`

### Settings [GET]

> api/users/:id/settings

- Response 200

    ```json
    {
        "data": [Setting: [{
            "name": string,
            "enabled": boolean
        }]]
    }
    ```

- Response 401
    `Unauthorized`

- Response 500
    `Internal Server Error`
