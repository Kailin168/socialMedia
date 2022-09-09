puts "start"
User1 = User.create!(username: "Macbeth", password: "123456", name: "William Shakespeare", email: "macbeth@gmail.com", bio: "Yes, Macbeth was loosely based on a real person, but Shakespeare took inspiration from a number of other sources to pen Macbeth.", country: "United Kingdom", language: "English")
User2 = User.create!(username: "Shiba", password: "123456", name: "Shiba Inu", email: "shiba@gmail.com", bio: "The Shiba Inu is one of the oldest of all dog breeds in the world. In fact, the ancestors of these Japanese dogs can be traced all the way back to the year 7000 BC.", country: "Japan", language: "Woof")
User3 = User.create!(username: "Greenplanet", password: "123456", name: "Planet Earth", email: "earth@gmail.com", bio: "The Oceans Hold $771 Trillion Worth of Gold. Not on the ocean floor—in the water itself, in tiny particles of approximately 13 billionths of a gram per liter.", country: "Earth", language: "Whatever you can imagine")
User4 = User.create!(username: "Abc", password: "123456", name: "abc class", email: "abc@gmail.com", bio: "The English Alphabet consists of 26 letters: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.", country: "United States", language: "English")
User5 = User.create!(username: "Jerry", password: "123456", name: "Tom and Jerry", email: "Jerry@gmail.com", bio: "In their first appearance in 1940, Tom was called Jasper and while Jerry was nameless in the cartoon itself, he was referred as Jinx by the animators.", country: "United States", language: "English")

puts "user done"
Post1 = Post.create!(content: "Today is not a good day for EVIL!", user_id: User1.id)
Post2 = Post.create!(content: "Smile!", user_id: User2.id)
Post3 = Post.create!(content: "Get the party started!", user_id: User3.id)

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