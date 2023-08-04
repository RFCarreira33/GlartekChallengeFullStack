package helpers

import (
	"encoding/json"
	"glartek/api/config"
	"glartek/api/types"
	"net/http"

	"github.com/golang-jwt/jwt"
)

/**
* Helper function that makes a request and decodes json into a target interface
* @param url string
* @param target interface{}
**/
func MakeRequest(url string, target interface{}) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(target)
}

/**
* Helper function to check if token is valid
* @param tokenString string
* @param secret string
**/
func IsTokenValid(tokenString string) bool {
	token, err := jwt.ParseWithClaims(tokenString, &types.JwtClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.SECRET_KEY), nil
	})
	if err != nil {
		return false
	}
	if !token.Valid {
		return false
	}

	return true
}
