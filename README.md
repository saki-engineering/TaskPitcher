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
<img width="800" alt="suggest member" src="https://user-images.githubusercontent.com/44340370/74902715-38e1db80-53ea-11ea-97c9-2948218b7138.png">
cancelボタンを押すと、最初のHome画面に戻ります。<br>
Yesを押すと、選ばれた候補者のLast-dateとremarksが更新されます。
<img width="801" alt="suggest success" src="https://user-images.githubusercontent.com/44340370/74902758-5616aa00-53ea-11ea-9612-ae44cab6d5ab.png">


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
#### filter active field
activeフィールドに関しては、表のヘッダーにあるチェックボックスを操作することで条件検索ができます。
<img width="133" alt="active filter" src="https://user-images.githubusercontent.com/44340370/74903776-51072a00-53ed-11ea-832f-d8d86d7e8094.png">

### edit member data
メンバーの表セルをクリックすることで、データを編集することができます。
<img width="802" alt="edit now" src="https://user-images.githubusercontent.com/44340370/74903521-819a9400-53ec-11ea-80bd-b9ea5463185d.png">
編集後、セルからフォーカスを外すことで、編集されたデータで確定・更新されます。
<img width="800" alt="edit after" src="https://user-images.githubusercontent.com/44340370/74903453-4ef09b80-53ec-11ea-9161-320d40b8f831.png">
Name・Period・Last-date・Remarks・Activeの全てのフィールドに関してデータを編集することができます。

### sort member data
表のヘッダーにある矢印を押すことで、表のデータをそれぞれのフィールドに関して昇順・降順に並び替えることができます。
<img width="649" alt="sort header" src="https://user-images.githubusercontent.com/44340370/74903936-d12d8f80-53ed-11ea-8853-7bab8a07f737.png">

### Output member list
現在アプリ内にあるメンバーのデータをcsvファイルの形で出力することができます。<br>
Output CSVボタンを押すことで、出力されるファイルの名前と保存場所を指定する画面が表示されます。<br>
<img width="373" alt="output csv" src="https://user-images.githubusercontent.com/44340370/74904201-a8f26080-53ee-11ea-9a88-4c925643c09c.png"><br>
指定が終わったら、csvファイルの書き出しが成功した旨の確認ポップアップが表示されます。
<img width="800" alt="csv output success" src="https://user-images.githubusercontent.com/44340370/74904363-0dadbb00-53ef-11ea-84a1-27cb0a92ad0c.png">

### delete_member button
表の中で削除したいデータ列のチェックボックスを選択します。
<img width="800" alt="check" src="https://user-images.githubusercontent.com/44340370/74905992-04bee880-53f3-11ea-9cdc-185d6eb04ebe.png">
表中にある全データをチェックしたい場合は、ヘッダーのチェックボックスを入れることで、全データが選択されます。
<img width="801" alt="all check" src="https://user-images.githubusercontent.com/44340370/74906029-215b2080-53f3-11ea-800d-07fdfa040ad2.png">
削除したいデータが選択された状態で、delete delected datasを押すと、確認ポップアップが表示されます。
<img width="800" alt="delete warning" src="https://user-images.githubusercontent.com/44340370/74906081-494a8400-53f3-11ea-8b49-45bf4976febf.png">
Yesを押すことで、選択したデータが削除されます。
<img width="799" alt="delete success" src="https://user-images.githubusercontent.com/44340370/74906102-5a939080-53f3-11ea-9603-755b109fd1bf.png">

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
ファイル選択ボタンを押して、アップロードするcsvファイルを選択したら、ファイル名がフォームに表示されます。この状態でアップロードしてデータを追加ボタンがactivateされます。
<img width="797" alt="selected csv" src="https://user-images.githubusercontent.com/44340370/74814901-94a15b80-533b-11ea-8533-ea33fd62bead.png">
アップロードしてデータを追加を押し、データ追加が成功したら、確認ポップアップが表示されます。
<img width="797" alt="csv success" src="https://user-images.githubusercontent.com/44340370/74815187-21e4b000-533c-11ea-8cd9-4a27e61d7ed0.png">