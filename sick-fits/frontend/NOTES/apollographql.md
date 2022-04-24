## Special syntax for queryin union types:

- Union type returns where the type of something queried could be of one type or another.
- We use the ... on syntax to say when it's of this particular type, return these fields.

```
query {
  authenticatedItem {
    ... on User {
      id
      email
    }
  }
}
```
