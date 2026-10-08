# Humorphic Lab - Database Schema & Entity Relationships

The production database is PostgreSQL 16. Django models utilize UUID primary keys, explicit foreign key constraints, and performance-tuned database indexes.

---

## Entity Relationship Overview

```
+--------------------------+             +--------------------------+
|       users.User         |             |   models_3d.Category     |
+--------------------------+             +--------------------------+
| id (UUID, PK)            |             | id (UUID, PK)            |
| username (VARCHAR, UNIQUE|             | name (VARCHAR, UNIQUE)   |
| email (VARCHAR, INDEX)   |             | slug (VARCHAR, UNIQUE)   |
| role (VARCHAR, INDEX)    |             | description (TEXT)       |
| organization (VARCHAR)   |             | icon_name (VARCHAR)      |
| avatar (IMAGE)           |             | created_at (TIMESTAMP)   |
+------------+-------------+             +------------+-------------+
             | 1                                      | 1
             |                                        |
             | uploaded_by                            | category
             | N                                      | N
+------------v----------------------------------------v-------------+
|                        models_3d.Model3D                          |
+-------------------------------------------------------------------+
| id (UUID, PK)                                                     |
| name (VARCHAR, INDEX)                                             |
| slug (VARCHAR, UNIQUE, INDEX)                                     |
| description (TEXT)                                                |
| category_id (UUID, FK -> Category, NULLABLE)                      |
| model_file (FILE, .glb / .gltf validator)                         |
| thumbnail (IMAGE, NULLABLE)                                       |
| file_size (BIGINT, bytes)                                         |
| polygon_count (INTEGER)                                           |
| format (VARCHAR, choices: 'glb', 'gltf')                          |
| is_active (BOOLEAN, INDEX)                                        |
| is_featured (BOOLEAN, INDEX)                                      |
| uploaded_by_id (UUID, FK -> User)                                 |
| created_at (TIMESTAMP, INDEX)                                     |
| updated_at (TIMESTAMP)                                            |
+-------------------------------------------------------------------+

+-------------------------------------------------------------------+
|                     products.RoboticsProduct                      |
+-------------------------------------------------------------------+
| id (UUID, PK)                                                     |
| name (VARCHAR, INDEX)                                             |
| slug (VARCHAR, UNIQUE, INDEX)                                     |
| sku (VARCHAR, UNIQUE)                                             |
| description (TEXT)                                                |
| price (DECIMAL 10,2)                                              |
| stock (INTEGER)                                                   |
| category_name (VARCHAR)                                           |
| specs (JSONB)                                                     |
| image (IMAGE, NULLABLE)                                           |
| is_available (BOOLEAN, INDEX)                                     |
| created_at (TIMESTAMP, INDEX)                                     |
| updated_at (TIMESTAMP)                                            |
+-------------------------------------------------------------------+
```

---

## Indexing Strategy

1. **`models_3d.Model3D`**:
   - `[slug]`: Accelerated single-item lookups via URL routing.
   - `[category, is_active]`: Compound index for category browsing with active filter.
   - `[is_featured, is_active]`: Compound index for homepage showcase query.
   - `[-created_at]`: Ordering index for chronological pagination.

2. **`users.User`**:
   - `[email]`: Fast authentication lookup during login.
   - `[role]`: Filtering users by engineering discipline.

3. **`products.RoboticsProduct`**:
   - `[sku]`: Unique lookup index.
   - `[-created_at]`: Chronological sorting.
