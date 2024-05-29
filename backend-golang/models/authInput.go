package models

type SignupInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	User     string `json:"user" binding:"required"`
	Password string `json:"password" binding:"required"`
}
