{
  ## 获取世界动态
  url: /mood/talk/list
  return: [{...}]
  
  ## 提交世界状态
  url: /mood/talk/add
  params: id(user_id), text, nickname, avatar
  returnCode: 200

  ## 删除世界动态
  url: /mood/talk/del
  params: id(动态id)
  returnCode: 200
}

