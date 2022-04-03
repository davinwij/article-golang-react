package connection

import (
	"fmt"
	"log"

	"server/structs"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var (
	DB  *gorm.DB
	Err error
)

func Connect() {

	DB, Err = gorm.Open("mysql", "root:@/article-golang?charset=utf8&parseTime=True")

	if Err != nil {
		log.Fatal(Err)
	}

	fmt.Println("Database Connection Success")

	DB.AutoMigrate(structs.Article{})
}
