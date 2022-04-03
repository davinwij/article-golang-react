package structs

import (
	"time"
)

type Article struct {
	Id           int    `json:"id" gorm:"primaryKey;autoIncrement:false"`
	Title        string `json:"title" binding:"required"`
	Content      string `json:"content" binding:"required"`
	Category     string `json:"category" binding:"required"`
	Created_date time.Time
	Updated_date time.Time
	Status       string `json:"status" binding:"required"`
}

type Result struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}
