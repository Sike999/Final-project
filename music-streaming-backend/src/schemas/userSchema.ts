export const userRegSchema = {
  email: {type: 'string', format:'email'},
  name: {type: 'string', minLength: 2, maxLength: 100},
  password: {type: 'string', maxLength: 160},
  role: {type:'string', 'enum': ['listener','artist','admin']},
  avatarUrl: {type: 'string', maxLength: 550},
  nickname: {type: 'string', minLength: 2, maxLength: 100},
  profileCoverUrl: {type: 'string', maxLength: 550}
}

export const userLogSchema = {
  email: {type: 'string', format:'email'},
  password: {type: 'string', maxLength: 160},
}