![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App｜作品集

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App。專案以純前端技術實作，提供新增、管理與篩選待辦事項，以及淺色／深色主題切換。

## 線上展示

GitHub Pages：[https://yukisakura1013.github.io/my-copilot-workshop/](https://yukisakura1013.github.io/my-copilot-workshop/)

## 功能

- 新增待辦事項，空白內容不會送出。
- 標記待辦為已完成或未完成；已完成項目會顯示刪除線與淡化文字。
- 刪除單筆待辦事項。
- 顯示整體未完成項目數量，計數不受目前篩選影響。
- 依「全部」、「未完成」、「已完成」篩選清單，並在篩選結果為空時提供提示。
- 切換淺色與深色模式；首次使用時跟隨作業系統偏好，手動切換只在目前頁面工作階段生效。
- 採用響應式版面，並提供表單標籤與控制項的無障礙名稱。

## 技術

- 使用 HTML、CSS 與原生 JavaScript；不使用框架、套件或外部 CDN。
- CSS 以 `:root` 自訂屬性管理配色，並使用 `prefers-color-scheme` 偵測系統主題偏好。
- 待辦資料保存於瀏覽器 `localStorage`，重新載入後仍會保留。
- 可作為靜態網頁在瀏覽器中執行。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依需求逐步建立並調整待辦 App。
- 透過 `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server，讓 Copilot 可查詢官方文件及 repo issue。
- 將 issue 修正流程整理在 `.github/prompts/fix-issue.prompt.md`：先讀 issue、提出計畫等待確認，再修改、驗證、提交並建立 Pull Request。
- 以 Git 分支和 Pull Request 管理修改；issue #3 的修正經檢視後合併至 `main`。

## 我學到什麼

- 將需求拆成明確條件，能讓 Agent Mode 更準確地規劃與修改。
- MCP 可把官方文件和 GitHub issue 帶入開發流程，補足本機程式碼以外的資訊。
- 讓人先審查修改計畫與程式差異，有助於維持對 AI 產出品質的把關。
- 把重複任務整理成 repo 內的 prompt，能讓流程更容易重用與審查。
