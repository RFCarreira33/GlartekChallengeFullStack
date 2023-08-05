package types

import "github.com/golang-jwt/jwt"

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type JwtClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

/**
* Function that simulates a database check for user credentials
* @param u User
* @return bool
**/
func (u User) CheckCrendentials() bool {
	var usersDb = map[string]string{
		"glartek": "password123",
		"test":    "test",
	}
	expectedPassword, ok := usersDb[u.Username]
	if !ok || expectedPassword != u.Password {
		return false
	}
	return true
}
