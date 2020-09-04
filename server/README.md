## **REST API**

- **URL**

  /register

- **Method:**

  `POST`

- **URL Params**

  `none`

- **Data Params**

  ```ts
  {
    email: string,
    password: string,
    city: string
  }
  ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```ts
    {
      msg: string,
      id: number,
      email: string,
      city: string
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```ts
    {
      error : Array<string>
    }
    ```

  OR <br>

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```ts
    {
      error: string
    }
    ```

- **URL**

  /login

- **Method:**

  `POST`

- **URL Params**

  `none`

- **Data Params**

  ```ts
  {
    email: string,
    password: string
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```ts
    {
      access_token:string,
      city: string
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```ts
    {
      error : Array<string>
    }
    ```

  OR <br>

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```ts
    {
      error: string
    }
    ```

- **URL**

  /news

- **Method:**

  `GET`

- **URL Params**

  ```ts
  {
    country?: string,
    category?:string
  }

  ```

- **Data Params**

  `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```ts
    {
      status: string,
      totalResults:number,
      articles: Array<{
        source: {
          id: string,
          name: string
        },
        author: string,
        title: string,
        description: string,
        content:string,
        urlToImage: string,
        url: string,
        publishedAt: string
      }>
    }
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```ts
    {
      error: string
    }
    ```

  OR <br>

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```ts
    {
      error: string
    }
    ```

- **URL**

  /football/fixtures

- **Method:**

  `GET`

- **URL Params**

  ```ts
  {
    from?: string,
    to?:string
  }

  ```

- **Headers**

```ts
{
  access_token: string
}
```

- **Data Params**

  `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```ts
    {
      event_home_team: string,
      event_away_team: string,
      home_team_logo: string,
      away_team_logo: string,
      event_date: string,
      league_name: string,
    }
    ```

- **Error Response:**

  - **Code:** 401 Unauthorized <br />
    **Content:**

    ```ts
    {
      error: string
    }
    ```

  OR <br>

  - **Code:** 404 Not Found <br />
    **Content:**

    ```ts
    {
      error: string
    }
    ```

  OR <br>

  - **Code:** 500 Internal Server Error <br />
    **Content:**

    ```ts
    {
      error: string
    }
    ```

- **URL**

  /googlesign

- **Method:**

  `POST`

- **URL Params**

  `none`

- **Data Params**

  `none`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```ts
    {
      access_token:string,
      city: string
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**

    ```ts
    {
      error: string
    }
    ```
