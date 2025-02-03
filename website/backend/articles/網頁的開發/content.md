# 網頁的開發
我負責的部分原本只有前端的部分，但是由於團隊中開發後端的人在拖慢進度，我只好使用Golang開發一個後端。
## 前端
前端顧名思義就是和用戶直接互動的部分，例如你今天打開了Google的網頁，你看到的一切畫面都是前端所負責的部分，而當你按下搜尋後，瀏覽器會把你的請求往後端丟，然後處理完再回傳搜尋結果讓你看到。
### HTML 超文本標記語言
HTML是一個十分有趣的程式語言，它和常見的Python、C++、javascript完全不一樣，它是一個以文字為主的程式語言，它使用標籤來表示元素：
```html=
	<p>這是Html文本</p>
```
例如上面的程式碼，我們要在上面顯示內文的時候就會使用`html= <p>`標籤
它是網頁的骨架，如果只有Html，那麼整個網頁就會看上去很醜，這時候就需要CSS了。
### CSS 層疊樣式表
CSS是類似於網頁的衣服，我們可以用它來實現動畫、顏色、排版等，以下做為例子
```css=
.body{
    background-color: lightblue
}
```
這樣可以把body這個元素的背景顏色改成淺藍色。
### javascript
這個東西是動態網頁的核心，我們需要它來實現和用戶和網站的互動。

### 框架
我們使用Vue.js做為我們前端使用的框架，原因在於相較於其他框架，其學習曲線較為平緩。使用框架有許多好處，我們不需要那麼在意底層的細節，我們只需要專注於做好和使用者互動的部分。
#### Axios
Axios是一個框架，它可以很方便的幫助我們和後端通訊，以文章功能為例：
```javascript
const fetchUserData = async (dataSource, id) => {
    try {
        const postData = { id: id };
        const response = await axios.post('http://localhost:8080/api/getArticleContent', postData);

        dataSource.value = response.data;
        console.log(response.data);

    } catch (error) {
        console.error('出錯:', error);
    }
};
```
不需要再寫AJAX這麼複雜的程式碼。
## 後端
我使用Golang來開發後端。
### Golang
Golang是一個由Google公司開發的程式語言，它跨平臺、容易學習的特性讓我選擇了它。我認為這個程式語言和其他的程式語言最大的不同在於錯誤處理，以下是我的範例程式：
```go=
articleContent, err := readMarkdownFile("./articles/" + requestBody.Id + "/content.md")

if err != nil {
	log.Printf("Error reading articles from file: %v", err)
	http.Error(w, err.Error(), http.StatusInternalServerError)
	return
}
```
它不像其他程式語言使用try-catch語法，它把錯誤當成一個變數來處理，我覺得這種不需要使用過多的縮進，使得程式的可讀性增加了。
### CORS
我的那一位負責開發後端的同學，他一直在處理這個問題，原因在於我們前後端分離了，所以需要處理跨域請求，但他不會做，然後用AI改程式改到他自己都看不懂，什麼都沒有弄出來。
以下是我開發後端處理CORS的程式碼：
```Go
func handleCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")		
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	}
}
```
```go
http.HandleFunc("/api/getArticles", handleCORS(getArticles))
```
瀏覽器在執行跨域請求時會先發送一個預檢請求，也就是OPTION，傳送完這個之後後端通過了才會執行真正要發送的請求。
## 心得
在這個項目中我學習到了許多不同方面的知識，例如