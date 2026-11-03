# Humorphic Lab - REST API Specification (v1.0.0)

All application API endpoints are versioned under the `/api/v1/` prefix.

## Interactive Documentation URLs
- **Swagger UI**: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)
- **ReDoc Interactive Docs**: [http://localhost:8000/api/redoc/](http://localhost:8000/api/redoc/)
- **Raw OpenAPI 3 Schema**: [http://localhost:8000/api/schema/](http://localhost:8000/api/schema/)

---

## Authentication & Headers

Protected endpoints require a JSON Web Token (JWT) sent via standard HTTP Authorization header:

```http
Authorization: Bearer <access_token>
```

Tokens are obtained via the `/api/v1/auth/login/` or `/api/v1/auth/register/` endpoints.

---

## Endpoints

### 1. Health Probe
- `GET /api/v1/health/`
  - **Permissions**: Public (`AllowAny`)
  - **Response 200**:
    ```json
    {
      "status": "ok",
      "database": "connected",
      "service": "humorphic-api-v1"
    }
    ```

---

### 2. Authentication
- `POST /api/v1/auth/register/`
  - **Body**:
    ```json
    {
      "username": "cybernaut",
      "email": "engineer@humorphic.lab",
      "password": "SecurePassword123!",
      "password_confirm": "SecurePassword123!",
      "first_name": "Elena",
      "last_name": "Rostova",
      "role": "engineer",
      "organization": "Kinematics Division"
    }
    ```
  - **Response 201**:
    ```json
    {
      "status": "success",
      "user": { ... },
      "access": "eyJhbGciOi...",
      "refresh": "eyJhbGciOi..."
    }
    ```

- `POST /api/v1/auth/login/`
  - **Body**:
    ```json
    {
      "username": "cybernaut",
      "password": "SecurePassword123!"
    }
    ```
  - **Response 200**: Returns JWT access and refresh tokens.

- `POST /api/v1/auth/refresh/`
  - **Body**: `{ "refresh": "<refresh_token>" }`
  - **Response 200**: `{ "access": "<new_access_token>" }`

- `POST /api/v1/auth/logout/`
  - **Permissions**: Authenticated (`IsAuthenticated`)
  - **Body**: `{ "refresh": "<refresh_token>" }`
  - **Response 200**: Blacklists the refresh token and closes session.

- `GET /api/v1/auth/me/`
  - **Permissions**: Authenticated (`IsAuthenticated`)
  - **Response 200**: Returns authenticated user profile.

---

### 3. 3D Model Asset Repository
- `GET /api/v1/3d-models/`
  - **Permissions**: Public
  - **Query Parameters**:
    - `category`: Filter by category slug (e.g. `humanoid-robotics`)
    - `format`: Filter by file format (`glb` or `gltf`)
    - `featured`: Filter by featured flag (`true` or `false`)
    - `search`: Search name and description
    - `page`: Page number (pagination defaults to 12 items/page)
  - **Response 200**: Paginated list of 3D models.

- `POST /api/v1/3d-models/`
  - **Permissions**: Authenticated (`IsAuthenticated`)
  - **Content-Type**: `multipart/form-data`
  - **Fields**:
    - `name` (string, required)
    - `model_file` (file: .glb or .gltf, max 100MB, required)
    - `category` (UUID, optional)
    - `description` (string, optional)
    - `polygon_count` (integer, optional)
    - `thumbnail` (image, optional)

- `GET /api/v1/3d-models/{id}/`
  - **Permissions**: Public
  - **Response 200**: Detailed 3D model metadata.

- `PATCH /api/v1/3d-models/{id}/`
  - **Permissions**: Authenticated (`IsUploaderOrReadOnly`)

- `DELETE /api/v1/3d-models/{id}/`
  - **Permissions**: Authenticated (`IsUploaderOrReadOnly`)

- `GET /api/v1/3d-models/my_models/`
  - **Permissions**: Authenticated (`IsAuthenticated`)
  - **Response 200**: List of models uploaded by current user.

- `GET /api/v1/3d-models/categories/`
  - **Permissions**: Public
  - **Response 200**: List of 3D model categories with model counts.

---

### 4. Robotics Products Catalog
- `GET /api/v1/products/`
  - **Permissions**: Public
  - **Query Parameters**: `search`, `ordering`
  - **Response 200**: List of robotics actuators, perception pods, and battery systems.

---

## Standard Error Response Format

All error responses from the API conform to the following schema:

```json
{
  "status": "error",
  "error_type": "ValidationError",
  "status_code": 400,
  "message": "Human-readable summary of the error.",
  "details": {
    "field_name": [
      "Specific validation message."
    ]
  }
}
```
