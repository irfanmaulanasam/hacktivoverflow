# hacktivoverflow

## Questions
 | routes | method | headers | body | description | output |
 | ----- |-|:----:|--------|-----| :---------- |
 | ```/question``` | **GET** | **NONE** | **NONE** | get all question in website | ```[{title:string, description:string},{title:string, description:string},{title:string, description:string}]``` |
 | ```/question/:id``` | **GET** | **NONE** | **NONE** | get question by id in website | ```title:string, description:string, answer:[]``` |
 | ```/question/add``` | **POST** | **TOKEN** | title:string, description:string | add question in website by user | ```title:string, description:string``` |
 | ```/question/update/:id``` | **PUT** | **TOKEN** | title:string, description:string | update user question in website | ```title:string, description:string``` |
 | ```/question/archive``` | **PUT** | **TOKEN** | question_id:string | archiving user question in website | ```message:string``` |
 | ```/question/delete``` | **DELETE** | **TOKEN** | question_id:string | delete user question in website | ```message:string``` |
 | ```/question/upvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote for question in website | ```vote:number``` |
 | ```/question/downvote/:id``` | **PUT** | **TOKEN** | answer_id | update vote  for question in website | ```vote:number``` |

## Answer
| routes | method | headers | body | description | output |
| ----- |--|:----:|--------|-----| :---------- |
| ```/answer``` | **GET** | **NONE** | **NONE** | get all answer question in website | ```[{username:string, answer:string}, {username:string, answer:string}, {username:string, answer:string}]``` |
| ```/answer/add``` | **POST** | **TOKEN** | answer:string | add answer for question in website | ```{ answer_id:string, question_id:string, user_id:string, answer:string}``` |
| ```/answer/update``` | **PUT** | **TOKEN** | answer:string | update by own user_id answer for question in website | ```{answer_id:string, user_id:string, answer:string}``` |
| ```/answer/upvote``` | **PUT** | **TOKEN** | answer_id | update vote for answer  question in website | ```vote:number``` |
| ```/answer/downvote``` | **PUT** | **TOKEN** | answer_id | update vote for answer  question in website | ```vote:number``` |

## Search
| routes | method | headers | body | description | output |
| -----|--|:----:|--------|-----| :---------- |
| /search | **GET** | **NONE** | **NONE** | Search the site for questions meeting certain criteria. | ```[question_title, question_title, question_title]``` |

## User routes
| routes | method | headers | body | description | output |
| ----- |-----|:----:|--------|-----| :---------- |
| ```/users``` | **GET** | **NONE** | **NONE** | get all users member in hacktivoverflow | ```[{name: string, job: string, total_contributions: number},{name: string, job: string, total_contributions: number}, {name: string, job: string, total_contributions: number}]``` |
| ```/users/signup``` | **POST** | **NONE** | email:string, username:string, password: string, job: string | sign in to website | ```token``` |
| ```/users/signin``` | **POST** | **NONE** | username:string, password: string | sign in to website | ```token``` |
| ```/users/:id``` | **GET** | **TOKEN** | **username** | get other users profile | ```{username:String, job:String, contribution:{ question: { upvote: number, downvote: number }, solve question: { upvote: number, downvote: number }}``` |
| ```/users/me``` | **GET** | **TOKEN** | **NONE** | get own users profile | ```{username:String, job:String, contribution:{ question: { upvote: number, downvote: number }, solve question: { upvote: number, downvote: number }, question_status: { total_answer: Array, question_title:String, question_description:string } }``` |
| ```/users/me/update``` | **PUT** | **TOKEN** | username:string, password:string, job:string | update user profile | ```{username:String, job:String, contribution:{ question: { upvote:number, downvote:number }, solve question: { upvote:number, downvote:number }, question_status: { total_answer:Array, question_title:String, question_description:string } }``` |
| ```/users/me/out``` | **PUT** | **TOKEN** | **NONE** | update user profile to unactive | ```{username:String, job:String, status:false }``` |


## Question routes 
for more info here is the references
see [reference](https://api.stackexchange.com/docs).