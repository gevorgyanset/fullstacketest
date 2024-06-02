# Transforming Single Consumer Web-Based Platform into a SaaS

## Overview
A web-based gaming platform (`gPlatform`) currently provides its services to a single gaming site (`gSite`). The services include hosting web games and back office functionalities for managing players who sign up and play on `gSite`. The goal is to transform `gPlatform` into a SaaS model, allowing multiple gaming sites to use the platform under different domains.

## Key Questions and Solutions

### 1. How can we design the system so that every company can serve games on their gaming site from their domain?

**Solution:**
- **Multi-Tenancy Architecture:** Implement logical isolation of data using a `tenant_id` column in a shared database. Consider physical isolation with separate databases for each company if needed for stronger isolation and security.
- **Custom Domain Support:** Implement a routing layer that directs requests to the appropriate tenant's instance based on the domain name. Configure DNS settings to point each custom domain to the platform's IP address or load balancer.

### 2. What modifications should be done to the users table at `gPlatform` to support this change?

**Solution:**
- **Add `tenant_id` Column:**
  ```sql
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tenant_id INT NOT NULL,
    UNIQUE (email, tenant_id)
  );
In this structure:

email is unique within the context of a tenant.
tenant_id links the user to their respective company.

### 3. Considering we have one backend cluster that serves all companies, how can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain?
**Solution:**

JWT Tokens: Use JSON Web Tokens (JWT) that include the tenant_id as part of the payload. When a user logs in, the generated JWT token should contain their tenant_id.
Validation Middleware: Implement middleware to validate JWT tokens on each request. The middleware should ensure the tenant_id in the token matches the tenant_id of the requested domain.
Domain Validation: Cross-check the tenant_id from the JWT token with the domain to ensure they match. If there is a mismatch, deny access.
Example middleware for validating user access:

```
const jwt = require('jsonwebtoken');
const { getTenantByDomain } = require('./tenantService');

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const tenantIdFromToken = user.tenant_id;
        const tenantIdFromDomain = getTenantByDomain(req.hostname);

        if (tenantIdFromToken !== tenantIdFromDomain) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}
```
