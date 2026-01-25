| Entity                         | Relation Type            | Notes                                 |
| ------------------------------ | ------------------------ | ------------------------------------- |
| User → Role                    | Many-to-One              | Each user has one role                |
| User → Outlet                  | One-to-Many              | Only sellers own outlets              |
| Outlet → Product               | One-to-Many              | Each outlet can have many products    |
| Product → Inventory            | One-to-One               | Tracks stock per outlet               |
| Category → Product             | One-to-Many              | Hierarchical categories possible      |
| Order → OrderItem              | One-to-Many              | Each order can have multiple products |
| OrderItem → Product            | Many-to-One              | Each item references a product        |
| OrderItem → Outlet             | Many-to-One              | Which outlet fulfilled item           |
| Role → AccessRole → AccessType | Many-to-Many w/ metadata | Permissions per role                  |
