package handlers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"server/connection"
	_ "server/connection"
	"server/structs"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
)

func CreateArticle(w http.ResponseWriter, r *http.Request) {
	payloads, _ := ioutil.ReadAll(r.Body)

	var ArticlePost structs.Article
	json.Unmarshal(payloads, &ArticlePost)

	ArticlePost.Created_date = time.Now()

	connection.DB.Create(&ArticlePost)

	res := structs.Result{Code: 200, Data: &ArticlePost, Message: "Success create article"}
	result, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(result)

}

func GetArticles(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	take := params["limit"]
	page := params["offset"]
	limit, err := strconv.Atoi(take)
	offset, err := strconv.Atoi(page)

	offsets := (limit * offset) - limit

	if len(page) == 0 || len(take) == 0 {
		limit = 10
		offsets = 0
		return
	}

	getArticles := []structs.Article{}

	connection.DB.
		Limit(limit).
		Offset(offsets).
		Find(&getArticles)

	res := structs.Result{Code: 200, Data: &getArticles, Message: "Success get articles, page = " + page + " take = " + take}
	results, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(results)
}

func GetArticle(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	articleId := params["id"]

	var articleById structs.Article

	connection.DB.First(&articleById, articleId)

	res := structs.Result{Code: 200, Data: &articleById, Message: "Success get article"}
	results, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(results)
}

func DeleteArticle(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	articleId := params["id"]

	var articleById structs.Article

	connection.DB.Delete(&articleById, articleId)

	res := structs.Result{Code: 200, Message: "Delete Success"}
	results, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(results)
}

func UpdateArticle(w http.ResponseWriter, r *http.Request) {
	payloads, _ := ioutil.ReadAll(r.Body)
	params := mux.Vars(r)
	articleId := params["id"]

	var article structs.Article

	connection.DB.First(&article, articleId)

	json.Unmarshal(payloads, &article)

	article.Updated_date = time.Now()

	connection.DB.Save(&article)

	res := structs.Result{Code: 200, Data: &article, Message: "Success update article"}
	result, err := json.Marshal(res)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(result)

}
