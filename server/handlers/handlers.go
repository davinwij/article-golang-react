package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func Handlers() {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/article", CreateArticle).Methods("OPTIONS", "POST")
	router.HandleFunc("/articles/{limit}/{offset}", GetArticles).Methods("GET")
	router.HandleFunc("/article/{id}", GetArticle).Methods("GET")
	router.HandleFunc("/article/{id}", UpdateArticle).Methods("PATCH")
	router.HandleFunc("/article/{id}", DeleteArticle).Methods("DELETE")

	handler := cors.AllowAll().Handler(router)

	log.Fatal(http.ListenAndServe(":5000", handler))
}
