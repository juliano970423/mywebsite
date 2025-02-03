


# HTML（超文本標記語言）

HTML元素有開始標籤（如 \<h1>）和結束標籤（如 \</h1> ）。元素將顯示的文本位於其開始和結束標籤之間。

## 聲明

所有頁面都應以 \<!DOCTYPE html> 開頭。 這個特殊的字符串被稱爲聲明，確保瀏覽器嘗試滿足行業規範。
\<!DOCTYPE html> 告訴瀏覽器該文檔是一個 HTML5 文檔，是最新版的 HTML。

>[!Important]將此聲明添加爲代碼的第一行。

```html=
<!DOCTYPE html>
```

$$
\frac{1}{2}
$$

## html

>[!Important]請注意，頁面的全部內容都嵌套在 html 元素中。 html 元素是 HTML 頁面的根元素，包含頁面上的所有內容。

你還可以通過給 html 元素添加 lang 屬性來指定頁面的語言。
將值爲 en 的 lang 屬性添加到開始 html 標籤以指定頁面的語言爲英語。

```html=
<html lang="en">

</html>
```

## head

head 元素用於包含文檔的元數據，如標題、樣式錶鏈接和腳本。 元數據是沒有直接顯示在頁面上的頁面信息。
title 元素決定了瀏覽器在頁面的標題欄或選項卡中顯示的內容。

你可以通過在 head 添加 meta 元素來設置瀏覽器行爲。 如下所示：

```html=
<meta attribute="value">
```

在 head 元素中，嵌套一個有 charset 屬性的 meta 元素。 設置屬性值爲 utf-8，這告訴瀏覽器本網頁使用什麼字符編碼。

```html=
  <head>
    <meta charset="utf-8">
    <title>example</title>
  </head>
```

>[!Note]注意 meta 元素是一個空元素。

## 標題
h1 到 h6 標題元素用於表明其下方內容的重要性。 數字越小，重要性越高，所以 h2 元素所具有的重要性要低於 h1 元素。

```html=
<h1>most important heading element</h1>
<h2>second most important heading element</h2>
<h3>third most important heading element</h3>
<h4>fourth most important heading element</h4>
<h5>fifth most important heading element</h5>
<h6>least important heading element</h6>
```

## 內文

p 元素用於在網站上創建一段文本。

```html=
<p>這是內文</p>
```

## 註釋

註釋讓你在不影響瀏覽器顯示內容的情況下留下信息。 它也能讓你的代碼失效。 在 HTML 中，一個註釋以 \<!-- 開始，包含數行文本，並以 --> 結束。

```html=
<!-- 這是註釋 -->
```

## 正文

HTML5 有些元素能夠指明不同的內容區域。 這些元素能讓你的 HTML 易於閱讀，並有助於搜索引擎優化（SEO）和無障礙訪問。

main 元素用於表示 HTML 文檔正文的主要內容。 main 元素裏的內容應該是文檔中唯一的，不應該在文檔的其他部分重複。

```html=
<main>
  <h1>Most important content of the document</h1>
  <p>Some more important content...</p>
</main>
```

## 圖片

可以通過使用 img 元素來爲你的網站添加圖片。 img 元素只有一個開始標籤，沒有結束標籤。 一個沒有結束標籤的元素被稱爲空元素。
HTML 屬性是寫在一個元素的開始標籤中的特殊詞彙，它們用於控制這個元素的行爲。 在 img 元素中的 src 屬性明確了一個圖片的 URL（圖片所在的位置）。

```html=
<img src="https://cdn.freecodecamp.org/platform/universal/fcc_secondary.svg">
```

所有的 img 元素都應該有一個 alt 屬性。 alt 屬性的文本（值）有兩個作用，第一個作用是讓屏幕閱讀器可以知曉圖片的內容，這會對網頁的可訪問性有很大提升；另一個作用是當圖片無法加載時，頁面需要顯示的替代文本。

```html=
<img src="cat.jpg" alt="A cat">
```

## 超連結

使用錨元素（a）鏈接到另一個頁面。鏈接的文本必須放置在錨元素（a）的開始和結束標籤之間。

```html=
<a href="https://www.freecodecamp.org">click here to go to freeCodeCamp.org</a>
```

要在新標籤頁中打開鏈接，你可以在錨元素（a）中使用 target 屬性。

target 屬性指定了在哪裏打開鏈接文檔。 target="_blank" 意思是在新標籤頁或窗口中打開鏈接的文檔。

```html=
<a href="https://www.freecodecamp.org" target="_blank">freeCodeCamp</a>
```

使用了錨元素將文本轉換爲鏈接。 也可以把其他類型的內容放在錨標籤中，將其轉換成一個鏈接。

```html=
<a href="example-link">
  <img src="image-link.jpg" alt="A photo of a cat.">
</a>
```

## section

在添加任何新內容之前，你應該使用 section 元素將貓咪照片內容與未來的內容分開。
section 元素用於在文檔中定義各部分，如章節、標題、頁腳或文檔的任何其他部分。 它是一個對 SEO 和無障礙特性有幫助的語義元素。

```html=
<section>
  <h2>Section Title</h2>
  <p>Section content...</p>
</section>
```

## 無序項目列表

要創建一個無序項目列表，你可以使用 ul 元素。li 元素用於在有序或無序列表中創建一個列表項。

```html=
<ul>
  <li>milk</li>
  <li>cheese</li>
</ul>
```

## figure & 圖像標題（figcaption）
figure 元素代表自包含的內容，允許您將圖像與標題相關聯。圖像標題（figcaption）元素用於添加標題以描述 figure 元素中包含的圖像。

```html=
<figure>
  <img src="image.jpg" alt="A description of the image">
  <figcaption>A cute cat</figcaption>
</figure>
```

## em

要強調一個特定的單詞或短語，你可以使用 em 元素。

```html=
<figure>
  <img src="image.jpg" alt="A description of the image">
    <figcaption>A <em>cute</em> cat</figcaption>
</figure>
```

## 有序列表

有序列表（ol）的代碼類似於無序列表，但有序列表中的列表項在顯示時會被編號。

```html=
<ol>
    <li>flea treatment</li>
    <li>thunder</li>
    <li>other cats</li>
</ol>
```

## strong

strong 元素用於指示某些文本非常重要或緊急。
現在你將添加一個 Web 表單來收集來自用戶的信息。

## form

form 元素用於從用戶獲取信息，如姓名、電子郵件和其他詳細信息。action 屬性指定應該將表單數據發送到哪裏。

```html=
<form action="/submit-url"></form>
<!-- action="/submit-url" 告訴瀏覽器應該將表單數據發送到路徑 /submit-url -->
```

## 輸入

input 元素允許你通過多種方式從 Web 表單中收集數據。 與 img 元素一樣，input 元素是空元素，不需要結束標籤。
你可以使用 type 屬性創建多種輸入。 你可以輕鬆創建密碼字段、重置按鈕或控件，讓用戶從其計算機中選擇文件。
爲了通過 action 屬性中指定的位置訪問表單的數據，你必須給文本字段一個 name 屬性，併爲其賦值來表示提交的數據。

```html=
<input type="text" name="name">
```

佔位符文本用於提示人們在輸入框中輸入什麼樣的信息。

```html=
<input type="text" placeholder="Example">
<!-- 將佔位符文本 cat photo URL 添加到你的 input 元素中 -->
```

爲了防止用戶在缺少所需信息時提交你的表單，你需要將 required 屬性添加到 input 元素。 無需爲 required 屬性設置值。 只需將單詞 required 添加到 input 元素，確保它和其他屬性之間有空格。

```html=
<input type="text" placeholder="Example" required>
```

## button

button 元素用於創建一個可點擊的按鈕。
即使你在文本輸入下方添加了按鈕，它們也會在頁面上彼此相鄰。 這是因爲 input 和 button 元素都是內聯元素，它們不會出現在新的行上。

```html=
<button>example</button>
```

## 單選按鈕
對於需要從多個選項中獲得一個答案的問題，你可以使用單選按鈕。

```html=
<input type="radio"> example
```

<div style="color:red">請記住，input 元素是一個空元素。</div>

## 複選框

input 元素，type 屬性值設置爲 checkbox，就創建一個複選框。

>[!Note] 爲了使複選框或單選按鈕默認被選中，你需要爲其添加 checked 屬性。

## label

label 元素用於幫助將 input 元素的文本與 input 元素本身關聯起來（尤其是對於屏幕閱讀器等輔助技術）。

```html=
<label><input type="radio"> cat</label>
```

## id

id 屬性用於標識特定的 HTML 元素。 每個 id 屬性的值
<strong>必須不同於</strong>整個頁面的所有其他 id 值。

```html=
<input id="email">

```

## fieldset

fieldset 元素用於在 Web 表單中將相關的輸入和標籤組合在一起。 fieldset 元素是塊級元素，這意味着它們出現在新的一行上。

## footer

footer 元素用於定義文檔或章節的頁腳。 頁腳通常包含文檔作者信息、版權數據、使用條款鏈接、聯繫信息等。