package models

import "time"

type Application struct {
	ID         uint      `json:"id" gorm:"primary_key"`
	Owner      string    `json:"owner"`
	AppNumber  string    `json:"app_number"`
	CreatedAt  time.Time `json:"created_at"`
	Statements string    `json:"statements"`
	AppStatus  uint      `json:"app_status"`
}

type AppInput struct {
	AppNumber string `json:"app_number"`
}
