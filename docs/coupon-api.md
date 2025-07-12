---
id: coupon-api
title: Coupon API Reference
sidebar_position: 2
---

# Coupon API Documentation

The ScrapeUncle Coupon API provides a comprehensive system for managing discount coupons for recycling rewards. This API allows users to generate, validate, and redeem coupons while providing administrative tools for coupon management.

## Base URL
```
http://localhost:8080
```

## Authentication
All endpoints require proper authentication. Include your API key in the request headers:
```
Authorization: Bearer YOUR_API_KEY
```

## General Notes
- All endpoints return JSON responses
- All date-times are in RFC3339 format (ISO 8601)
- Coupon codes are case-sensitive
- Replace `USER_ID`, `COUPON_CODE`, and `PICKUP_ID` with real values

---

## User Endpoints

### 1. Generate Onboarding Coupon

Issues an onboarding coupon to a user if they don't already have one.

**Endpoint:** `POST /coupons/onboarding`

**Request:**
- **Content-Type:** `application/x-www-form-urlencoded`
- **Body:** Form data

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | string | Yes | The user's unique ID |

**cURL Example:**
```bash
curl -X POST http://localhost:8080/coupons/onboarding \
  -d "user_id=USER_ID"
```

**Response (200 OK):**
```json
{
  "code": "ONB-12345678",
  "type": "onboarding",
  "userId": "USER_ID",
  "value": 100,
  "discountType": "FLAT",
  "scope": "TOTAL",
  "isUsed": false,
  "expiry": "2025-12-31T23:59:59Z",
  "canStack": false,
  "minOrderValue": 0
}
```

**Error Responses:**
- `400 Bad Request` - Invalid user ID or user already has onboarding coupon
- `500 Internal Server Error` - Server error with error message

---

### 2. List User Coupons

Retrieves all valid coupons for a specific user.

**Endpoint:** `GET /coupons/user`

**Request:**
- **Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | string | Yes | The user's unique ID |

**cURL Example:**
```bash
curl "http://localhost:8080/coupons/user?user_id=USER_ID"
```

**Response (200 OK):**
```json
{
  "user_id": "USER_ID",
  "coupons": [
    {
      "code": "ONB-12345678",
      "type": "onboarding",
      "value": 100,
      "discountType": "FLAT",
      "scope": "TOTAL",
      "isUsed": false,
      "expiry": "2025-12-31T23:59:59Z",
      "canStack": false,
      "minOrderValue": 0
    },
    {
      "code": "CUST-87654321",
      "type": "custom",
      "value": 50,
      "discountType": "PERCENTAGE",
      "scope": "TOTAL",
      "isUsed": false,
      "expiry": "2025-06-30T23:59:59Z",
      "canStack": true,
      "minOrderValue": 100
    }
  ],
  "count": 2
}
```

---

### 3. Validate Coupon

Checks if a coupon code is valid, not expired, and not already used.

**Endpoint:** `GET /coupons/validate/:code`

**Request:**
- **Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to validate |

**cURL Example:**
```bash
curl http://localhost:8080/coupons/validate/COUPON_CODE
```

**Response (200 OK):**
```json
{
  "valid": true,
  "coupon": {
    "code": "COUPON_CODE",
    "type": "onboarding",
    "value": 100,
    "discountType": "FLAT",
    "scope": "TOTAL",
    "isUsed": false,
    "expiry": "2025-12-31T23:59:59Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Coupon is invalid, used, or expired
- `404 Not Found` - Coupon code not found

---

### 4. Preview Coupon

Shows the discount that would be applied without actually redeeming the coupon.

**Endpoint:** `POST /coupons/preview`

**Request:**
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "code": "COUPON_CODE",
  "user_id": "USER_ID",
  "pickup_id": "PICKUP_ID",
  "order_total": 1605
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to preview |
| `user_id` | string | Yes | The user's unique ID |
| `pickup_id` | string | Yes | The pickup ID |
| `order_total` | number | Yes | The total order amount |

**cURL Example:**
```bash
curl -X POST http://localhost:8080/coupons/preview \
  -H "Content-Type: application/json" \
  -d '{
    "code": "COUPON_CODE",
    "user_id": "USER_ID",
    "pickup_id": "PICKUP_ID",
    "order_total": 1605
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "preview": true,
  "original_total": 1605,
  "discount": 100,
  "new_total": 1505,
  "coupon": {
    "code": "COUPON_CODE",
    "type": "onboarding",
    "value": 100,
    "discountType": "FLAT",
    "scope": "TOTAL",
    "isUsed": false,
    "expiry": "2025-12-31T23:59:59Z"
  }
}
```

---

### 5. Redeem Coupon

Redeems a coupon for a user and marks it as used.

**Endpoint:** `POST /coupons/redeem`

**Request:**
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "code": "COUPON_CODE",
  "user_id": "USER_ID",
  "pickup_id": "PICKUP_ID",
  "order_total": 1605
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to redeem |
| `user_id` | string | Yes | The user's unique ID |
| `pickup_id` | string | Yes | The pickup ID |
| `order_total` | number | Yes | The total order amount |

**cURL Example:**
```bash
curl -X POST http://localhost:8080/coupons/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "code": "COUPON_CODE",
    "user_id": "USER_ID",
    "pickup_id": "PICKUP_ID",
    "order_total": 1605
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "discount": 100,
  "new_total": 1505,
  "coupon": {
    "code": "COUPON_CODE",
    "type": "onboarding",
    "value": 100,
    "discountType": "FLAT",
    "scope": "TOTAL",
    "isUsed": true,
    "expiry": "2025-12-31T23:59:59Z",
    "redeemed_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. Cancel Coupon

Cancels (marks as used) a coupon without applying any discount.

**Endpoint:** `POST /coupons/cancel`

**Request:**
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "code": "COUPON_CODE",
  "user_id": "USER_ID"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to cancel |
| `user_id` | string | Yes | The user's unique ID |

**cURL Example:**
```bash
curl -X POST http://localhost:8080/coupons/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "code": "COUPON_CODE",
    "user_id": "USER_ID"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coupon cancelled",
  "coupon": {
    "code": "COUPON_CODE",
    "isUsed": true,
    "cancelled_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. Get Coupon Usage Analytics

Returns usage statistics for a specific coupon.

**Endpoint:** `GET /coupons/usage/:code`

**Request:**
- **Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to analyze |

**cURL Example:**
```bash
curl http://localhost:8080/coupons/usage/COUPON_CODE
```

**Response (200 OK):**
```json
{
  "coupon_code": "COUPON_CODE",
  "user_id": "USER_ID",
  "total_coupons": 5,
  "used_coupons": 2,
  "active_coupons": 2,
  "expired_coupons": 1,
  "total_discount": 200,
  "usage_rate": 40.0,
  "can_stack": false,
  "coupon_details": {
    "code": "COUPON_CODE",
    "type": "onboarding",
    "value": 100,
    "discountType": "FLAT",
    "scope": "TOTAL",
    "expiry": "2025-12-31T23:59:59Z"
  }
}
```

---

## Admin Endpoints

### 8. Create Custom Coupon

Admin creates a custom coupon for a specific user.

**Endpoint:** `POST /admin/coupons/custom`

**Request:**
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "user_id": "USER_ID",
  "discount_type": "FLAT",
  "discount_value": 100,
  "expiry": "2025-12-31T23:59:59Z",
  "scope": "TOTAL"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | string | Yes | The user's unique ID |
| `discount_type` | string | Yes | Type of discount (`FLAT` or `PERCENTAGE`) |
| `discount_value` | number | Yes | Discount amount or percentage |
| `expiry` | string | Yes | Expiry date in RFC3339 format |
| `scope` | string | Yes | Scope of discount (`TOTAL` or `ITEM`) |

**cURL Example:**
```bash
curl -X POST http://localhost:8080/admin/coupons/custom \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "USER_ID",
    "discount_type": "FLAT",
    "discount_value": 100,
    "expiry": "2025-12-31T23:59:59Z",
    "scope": "TOTAL"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "coupon_code": "CUST-12345678",
  "details": {
    "code": "CUST-12345678",
    "type": "custom",
    "userId": "USER_ID",
    "value": 100,
    "discountType": "FLAT",
    "scope": "TOTAL",
    "isUsed": false,
    "expiry": "2025-12-31T23:59:59Z",
    "canStack": false,
    "minOrderValue": 0
  }
}
```

---

### 9. Get Pickup Items for Coupon

Returns all items in a pickup for coupon creation purposes.

**Endpoint:** `GET /admin/coupons/pickup/:pickup_id/items`

**Request:**
- **Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pickup_id` | string | Yes | The pickup ID to get items for |

**cURL Example:**
```bash
curl http://localhost:8080/admin/coupons/pickup/PICKUP_ID/items
```

**Response (200 OK):**
```json
{
  "pickup_id": "PICKUP_ID",
  "items": [
    {
      "item_id": "ITEM_001",
      "type": "paper",
      "weight": 2.5,
      "value": 50,
      "category": "recyclable"
    },
    {
      "item_id": "ITEM_002",
      "type": "plastic",
      "weight": 1.8,
      "value": 45,
      "category": "recyclable"
    },
    {
      "item_id": "ITEM_003",
      "type": "metal",
      "weight": 3.2,
      "value": 80,
      "category": "recyclable"
    }
  ],
  "total_items": 3,
  "total_value": 175
}
```

---

### 10. Update Coupon Expiry

Updates the expiry date of an existing coupon.

**Endpoint:** `PUT /admin/coupons/expiry`

**Request:**
- **Content-Type:** `application/json`
- **Body:**

```json
{
  "code": "COUPON_CODE",
  "expiry": "2025-12-31T23:59:59Z"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The coupon code to update |
| `expiry` | string | Yes | New expiry date in RFC3339 format |

**cURL Example:**
```bash
curl -X PUT http://localhost:8080/admin/coupons/expiry \
  -H "Content-Type: application/json" \
  -d '{
    "code": "COUPON_CODE",
    "expiry": "2025-12-31T23:59:59Z"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coupon expiry updated",
  "old_expiry": "2025-06-30T23:59:59Z",
  "new_expiry": "2025-12-31T23:59:59Z",
  "coupon": {
    "code": "COUPON_CODE",
    "expiry": "2025-12-31T23:59:59Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## Error Handling

All endpoints may return the following error responses:

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Invalid request parameters",
  "message": "Detailed error message",
  "code": "INVALID_PARAMS"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required",
  "message": "Valid API key required",
  "code": "AUTH_REQUIRED"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found",
  "message": "Coupon code not found",
  "code": "NOT_FOUND"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred",
  "code": "INTERNAL_ERROR"
}
```

---

## Coupon Types

### Discount Types
- **FLAT**: Fixed amount discount (e.g., $10 off)
- **PERCENTAGE**: Percentage-based discount (e.g., 15% off)

### Coupon Scopes
- **TOTAL**: Applied to the total order amount
- **ITEM**: Applied to specific items in the order

### Coupon Categories
- **onboarding**: Automatically generated for new users
- **custom**: Manually created by administrators
- **promotional**: Special promotional coupons

---

## Rate Limiting

- **User endpoints**: 100 requests per minute per user
- **Admin endpoints**: 50 requests per minute per admin
- **Validation endpoints**: 200 requests per minute per IP

---

## Best Practices

1. **Always validate coupons** before attempting to redeem them
2. **Use preview endpoints** to show users potential savings
3. **Handle errors gracefully** and provide meaningful error messages
4. **Cache coupon validation results** for better performance
5. **Monitor usage analytics** to track coupon effectiveness
6. **Set appropriate expiry dates** to encourage timely usage
7. **Use stackable coupons** carefully to avoid excessive discounts

---

## Integration Examples

### Frontend Integration
```javascript
// Validate coupon before showing to user
async function validateCoupon(code) {
  const response = await fetch(`/coupons/validate/${code}`);
  const data = await response.json();
  return data.valid;
}

// Preview coupon discount
async function previewCoupon(code, userId, pickupId, total) {
  const response = await fetch('/coupons/preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, user_id: userId, pickup_id: pickupId, order_total: total })
  });
  return await response.json();
}
```

### Mobile App Integration
```swift
// Swift example for iOS
func redeemCoupon(code: String, userId: String, pickupId: String, total: Double) async throws -> CouponResponse {
    let url = URL(string: "http://localhost:8080/coupons/redeem")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body = [
        "code": code,
        "user_id": userId,
        "pickup_id": pickupId,
        "order_total": total
    ]
    request.httpBody = try JSONSerialization.data(withJSONObject: body)
    
    let (data, _) = try await URLSession.shared.data(for: request)
    return try JSONDecoder().decode(CouponResponse.self, from: data)
}
``` 