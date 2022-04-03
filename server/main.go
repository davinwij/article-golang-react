package main

import (
	"server/connection"
	"server/handlers"
)

func main() {
	connection.Connect()

	handlers.Handlers()
}
