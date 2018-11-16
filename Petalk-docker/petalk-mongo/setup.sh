#!/bin/bash
mongo <<EOF

use petalk;
db.createCollection("answers");
db.createCollection("comments");
db.createCollection("questions");
db.createCollection("users");
db.createCollection("videos");

EOF

mongoimport --db petalk --collection answers --file $WORKSPACE/answers.json
mongoimport --db petalk --collection comments --file $WORKSPACE/comments.json
mongoimport --db petalk --collection questions --file $WORKSPACE/questions.json
mongoimport --db petalk --collection users --file $WORKSPACE/users.json
mongoimport --db petalk --collection videos --file $WORKSPACE/videos.json
