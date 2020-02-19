# About
TaskPitcherは、名簿の中から仕事を振る人をランダム抽出するアプリです。

# Download
|Release Version|Release Date|Operating System||
|:--|:--|:--|:--|
|TaskPitcher version 1.0.0|2020.3.8|Mac OS X|[Coming Soon...]()|
|||Windows|[Coming Soon...]()|

# Documentation
## Home
Homeでは、実際にメンバーの中から仕事を振ることができます。
<img width="801" alt="Home画像" src="https://user-images.githubusercontent.com/44340370/74804041-5d728080-5322-11ea-9304-87f627eaa928.png">
中央のstartボタンを押すと、候補者が表示されます。
cancelボタンを押すと、最初のHome画面に戻ります。<br>
OKを押すと、選ばれた候補者のLast-dateとremarksが更新されます。

## Member List
Member Listでは、登録されているメンバーのリストを確認・編集することができます。
<img width="800" alt="Member List" src="https://user-images.githubusercontent.com/44340370/74805108-8a746280-5325-11ea-872c-0b3c2a0fb0fe.png">

### contents
メンバー情報には、以下のものがあります。
- Name<br>
メンバーの名前。
- Period<br>
メンバーの加入期。
- Last-date<br>
最後にそのメンバーに仕事を振った日付。
- Remarks<br>
備考欄。
- Active<br>
メンバーの活動状態。<br>
trueの場合仕事を振る候補者としてカウントされますが、falseの場合候補者としてのランダム抽選対象から外されます。<br>
活動休止中のメンバーがいる場合、その人のActive値をfalseにすることが推奨されます。

### filter
メンバーリストの中から、条件にあるメンバーを検索・表示させることができます。
<img width="799" alt="use filter" src="https://user-images.githubusercontent.com/44340370/74805846-bee91e00-5327-11ea-9b87-89ccdc98c6ac.png">

#### filter field
条件フィールドとして、Name・Period・Last-dateを設定することができます。
#### filter comparison types
検索の種類には以下のものがあります。
- = : value値に一致するものを検索
- &lt; : value値未満のものを検索
- &lt;= : value値以下のものを検索
- &gt; : value値より大きいものを検索
- &gt;= : value値以上のものを検索
- != : value値に一致しないものを検索
- like : value値に部分一致するものを検索
#### clear filter button
Clear Filterを押すと、フィルターの値を初期値(入力なし状態)に戻すことができます。

### edit member data
メンバーの表セルをクリックすることで、データを編集することができます。
セルからフォーカスを外すことで、編集されたデータで確定・更新されます。

### sort member data

### Output member list

### delete_member button

## Add Member
Add Memberでは、メンバーを新しく登録することができます。
<img width="801" alt="Add Member" src="https://user-images.githubusercontent.com/44340370/74804196-db368c00-5322-11ea-92aa-d8c9a95ed919.png">

### add_member form
メンバーを一人ずつ追加したい場合は、フォームに名前・期・備考事項を記入して、追加ボタンを押します。
<img width="799" alt="add member form" src="https://user-images.githubusercontent.com/44340370/74812452-e1cefe80-5336-11ea-8829-7e43b7f600c2.png">
すると、データの追加に成功した確認ポップアップが表示されます。
<img width="798" alt="success to add member" src="https://user-images.githubusercontent.com/44340370/74812593-1cd13200-5337-11ea-9eb5-b7144ea75b74.png">

### csv file upload
メンバーをまとめて追加したい場合は、所定の形式のcsvファイルを以下のフォームからアップロードします。
<img width="800" alt="select csv" src="https://user-images.githubusercontent.com/44340370/74814771-5c018200-533b-11ea-9227-a9ff21bf8c6c.png">
ファイル選択ボタンを押して、アップロードするcsvファイルを選択したら、ファイル名がフォームに表示され、アップロードしてデータを追加ボタンがactivateされます。
<img width="797" alt="selected csv" src="https://user-images.githubusercontent.com/44340370/74814901-94a15b80-533b-11ea-8533-ea33fd62bead.png">
アップロードしてデータを追加を押し、データ追加が成功したら、確認ポップアップが表示されます。
<img width="797" alt="csv success" src="https://user-images.githubusercontent.com/44340370/74815187-21e4b000-533c-11ea-8cd9-4a27e61d7ed0.png">