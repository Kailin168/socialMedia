puts "start"
User1 = User.create!(username: "macbeth", password_digest: "123456", name: "William Shakespeare", email: "macbeth@gmail.com", profile_image: "http://kingsenglishrevision.weebly.com/uploads/1/0/2/2/102217226/macbeth_orig.png", bio: "Shakespeare's Macbeth is one of the most iconic characters ever created. But few people realise that Macbeth was also a real man, a king of 11th century Scotland who led a life filled with as much murder, treachery and drama as the tragic hero of Shakespeare's play.", country: "United Kingdom", language: "english")
User2 = User.create!(username: "shibababy", password_digest: "123456", name: "Shiba Inu", email: "shiba@gmail.com", profile_image: "https://cdn.mos.cms.futurecdn.net/7AgAr8Vw59h2fARa2xK2d4.jpg", bio: "The Shiba Inu is a breed of hunting dog from Japan. A small-to-medium breed, it is the smallest of the six original and distinct spitz breeds of dog native to Japan.", country: "Japan", language: "japanese")
User3 = User.create!(username: "greenplanet", password_digest: "123456", name: "Planet Earth", email: "earth@gmail.com", profile_image: "https://www.pngitem.com/pimgs/m/63-633375_planet-earth-cartoon-illustration-free-transparent-cartoon-planets.png", bio: "Shakespeare's Macbeth is one of the most iconic characters ever created. But few people realise that Macbeth was also a real man, a king of 11th century Scotland who led a life filled with as much murder, treachery and drama as the tragic hero of Shakespeare's play.", country: "United States", language: "english")
puts "user done"
Post1 = Post.create!(content: "Today is not a good day for EVIL!", media: "https://i.pinimg.com/originals/6b/00/f4/6b00f4f725b7683d4c927338afcd8527.png", user_id: User1.id)
Post2 = Post.create!(content: "Smile!", media: "https://blockworks.co/wp-content/uploads/2022/08/Shutterstock_2041211669.jpg", user_id: User2.id)
Post3 = Post.create!(content: "Get the party started!", media: "https://www.nicepng.com/png/detail/137-1371813_on-earth-by-nyapo-peas-on-earth-cartoon.png", user_id: User3.id)
puts "post done"
Comment1 = Comment.create!(user_id: User2.id, comment: "Let's do evil tomorrow", post_id: Post1.id, comment_parents_id: nil)
Comment2 = Comment.create!(user_id: User3.id, comment: "Stop talking", post_id: Post1.id, comment_parents_id: nil)
Comment3 = Comment.create!(user_id: User3.id, comment: "I love those furs", post_id: Post2.id, comment_parents_id: nil)
Comment4 = Comment.create!(user_id: User2.id, comment: "Woof Woof Woof", post_id: Post2.id, comment_parents_id: nil)
Comment5 = Comment.create!(user_id: User1.id, comment: "Only three Beans?", post_id: Post3.id, comment_parents_id: nil)
Comment6 = Comment.create!(user_id: User2.id, comment: "Green Beans", post_id: Post3.id, comment_parents_id: nil)
puts "comment done"
Follow1 = Follow.create!(followee_id: User2.id, follower_id: User3.id)
Follow2 = Follow.create!(followee_id: User1.id, follower_id: User3.id)
Follow3 = Follow.create!(followee_id: User1.id, follower_id: User2.id)
Follow4 = Follow.create!(followee_id: User3.id, follower_id: User1.id)
Follow5 = Follow.create!(followee_id: User3.id, follower_id: User2.id)
puts "follow done"
Like1 = Like.create!(user_id: User1.id, post_id: Post3.id)
Like2 = Like.create!(user_id: User2.id, post_id: Post3.id)
puts "like done"
puts "FINISH!"